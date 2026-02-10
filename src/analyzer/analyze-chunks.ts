import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { parse } from "csv-parse/sync";
import { basename, join } from "path";
import { glob } from "glob";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import Table from "cli-table3";
import { config } from "dotenv";
import { ChunkAnalysisSchema, type ChunkAnalysis, type AnalysisConfig } from "./types.js";

config();

/**
 * Analyze a single CSV chunk for pain points
 */
export async function analyzeChunk(
  chunkPath: string,
  model: string = "gemini-2.0-flash"
): Promise<ChunkAnalysis> {
  const chunkId = basename(chunkPath, ".csv");
  console.log(`\n🔍 Analyzing: ${chunkId}`);

  // Read and parse CSV
  const content = readFileSync(chunkPath, "utf-8");
  const records = parse(content, {
    columns: true,
    skip_empty_lines: true,
    relax_column_count: true,
  });

  const totalPosts = records.length;
  console.log(`   📊 Posts in chunk: ${totalPosts.toLocaleString()}`);

  // Prepare posts for analysis - sample if too large
  const maxPostsForAnalysis = 500;
  let postsToAnalyze = records;
  
  if (records.length > maxPostsForAnalysis) {
    // Take a stratified sample
    const step = Math.floor(records.length / maxPostsForAnalysis);
    postsToAnalyze = records.filter((_: unknown, i: number) => i % step === 0).slice(0, maxPostsForAnalysis);
    console.log(`   📝 Sampled ${postsToAnalyze.length} posts for analysis`);
  }

  // Format posts for the prompt
  const postsText = postsToAnalyze
    .map((post: Record<string, string>, i: number) => {
      // Try to find content field - common names
      const contentField = Object.keys(post).find(
        (k) =>
          k.toLowerCase().includes("content") ||
          k.toLowerCase().includes("body") ||
          k.toLowerCase().includes("text") ||
          k.toLowerCase().includes("message") ||
          k.toLowerCase().includes("post")
      );
      const content = contentField ? post[contentField] : Object.values(post).join(" ");
      return `[Post ${i + 1}]: ${content?.slice(0, 500) || "(empty)"}`;
    })
    .join("\n\n");

  // Analyze with AI
  const { object: analysis } = await generateObject({
    model: google(model),
    schema: ChunkAnalysisSchema,
    prompt: `You are analyzing forum posts from a music/DJ community platform to identify user pain points and feature ideas.

Analyze the following ${postsToAnalyze.length} forum posts and identify:
1. Pain points users are experiencing (bugs, missing features, frustrations, complaints)
2. Recurring themes in discussions
3. Overall sentiment

Focus on actionable insights that could lead to product improvements.

FORUM POSTS:
${postsText}

Provide a thorough analysis with specific pain points, categorized by type. Include actual quotes from posts as examples.
Remember: chunkId should be "${chunkId}" and totalPostsAnalyzed should be ${totalPosts}.`,
  });

  return analysis;
}

/**
 * Display analysis results in a table
 */
export function displayAnalysisTable(analysis: ChunkAnalysis): void {
  console.log(`\n📊 Analysis Results for: ${analysis.chunkId}`);
  console.log(`   Posts analyzed: ${analysis.totalPostsAnalyzed.toLocaleString()}`);
  console.log(`   Overall sentiment: ${analysis.overallSentiment}`);
  console.log(`   Top themes: ${analysis.topThemes.join(", ")}`);

  const table = new Table({
    head: ["Category", "Description", "Severity", "Frequency", "Suggested Feature"],
    colWidths: [15, 35, 10, 10, 35],
    wordWrap: true,
  });

  for (const painPoint of analysis.painPoints) {
    table.push([
      painPoint.category,
      painPoint.description,
      painPoint.severity,
      painPoint.frequency.toString(),
      painPoint.suggestedFeature,
    ]);
  }

  console.log(table.toString());
}

/**
 * Analyze all chunks in a directory
 */
export async function analyzeAllChunks(config: AnalysisConfig): Promise<ChunkAnalysis[]> {
  const { chunksDir, resultsDir, model = "gemini-2.0-flash", concurrency = 1 } = config;

  // Create results directory
  if (!existsSync(resultsDir)) {
    mkdirSync(resultsDir, { recursive: true });
  }

  // Find all chunk files
  const chunkFiles = await glob(join(chunksDir, "*.csv"));
  chunkFiles.sort();

  if (chunkFiles.length === 0) {
    console.error(`❌ No CSV files found in: ${chunksDir}`);
    process.exit(1);
  }

  console.log(`\n🚀 Starting analysis of ${chunkFiles.length} chunks`);
  console.log(`   Model: ${model}`);
  console.log(`   Concurrency: ${concurrency}`);

  const results: ChunkAnalysis[] = [];

  // Process chunks (sequentially for now to avoid rate limits)
  for (let i = 0; i < chunkFiles.length; i++) {
    const chunkFile = chunkFiles[i];
    console.log(`\n[${i + 1}/${chunkFiles.length}] Processing...`);

    try {
      // Check if already analyzed
      const resultPath = join(resultsDir, `${basename(chunkFile, ".csv")}_analysis.json`);
      
      if (existsSync(resultPath)) {
        console.log(`   ⏭️  Skipping (already analyzed): ${basename(chunkFile)}`);
        const existing = JSON.parse(readFileSync(resultPath, "utf-8"));
        results.push(existing);
        continue;
      }

      const analysis = await analyzeChunk(chunkFile, model);
      results.push(analysis);

      // Save individual result
      writeFileSync(resultPath, JSON.stringify(analysis, null, 2));
      console.log(`   💾 Saved: ${resultPath}`);

      // Display table
      displayAnalysisTable(analysis);

    } catch (error) {
      console.error(`   ❌ Error analyzing ${chunkFile}:`, error);
    }
  }

  // Save all results
  const allResultsPath = join(resultsDir, "all_chunk_analyses.json");
  writeFileSync(allResultsPath, JSON.stringify(results, null, 2));
  console.log(`\n💾 All results saved to: ${allResultsPath}`);

  return results;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
Usage: npm run analyze -- <chunks-dir> [results-dir] [model]

Arguments:
  chunks-dir   Directory containing CSV chunks
  results-dir  Output directory for results (default: ./results)
  model        OpenAI model to use (default: gpt-4o-mini)

Example:
  npm run analyze -- ./chunks ./results gpt-4o-mini
`);
    process.exit(1);
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY environment variable is required");
    console.error("   Create a .env file with your API key (see .env.example)");
    process.exit(1);
  }

  const chunksDir = args[0];
  const resultsDir = args[1] || "./results";
  const model = args[2] || process.env.GOOGLE_MODEL || "gemini-2.0-flash";

  await analyzeAllChunks({ chunksDir, resultsDir, model });
}

main().catch(console.error);
