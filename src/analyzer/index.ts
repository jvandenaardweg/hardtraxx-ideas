import { existsSync } from "fs";
import { config } from "dotenv";
import { splitCsv } from "./csv-splitter.js";
import { analyzeAllChunks, displayAnalysisTable } from "./analyze-chunks.js";
import { combineResults, displayFinalAnalysis, saveFinalAnalysis } from "./combine-results.js";

config();

/**
 * Main entry point - runs the complete pipeline
 */
async function main() {
  const args = process.argv.slice(2);

  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║           Forum Posts Pain Point Analyzer                         ║
║           Using Vercel AI SDK                                     ║
╚═══════════════════════════════════════════════════════════════════╝
`);

  if (args.length < 1) {
    console.log(`
Usage: npm run run-all -- <input-csv> [options]

Arguments:
  input-csv     Path to the input CSV file with forum posts

Options:
  --chunk-size  Number of rows per chunk (default: 100000)
  --output-dir  Base output directory (default: ./output)
  --model       OpenAI model for analysis (default: gpt-4o-mini)
  --skip-split  Skip splitting (use existing chunks)
  --skip-analyze Skip analysis (use existing results)

Examples:
  npm run run-all -- data/posts.csv
  npm run run-all -- data/posts.csv --chunk-size 50000
  npm run run-all -- data/posts.csv --skip-split
`);
    process.exit(1);
  }

  // Parse arguments
  const inputFile = args[0];
  const chunkSize = parseInt(getArg(args, "--chunk-size") || "100000", 10);
  const outputDir = getArg(args, "--output-dir") || "./output";
  const model = getArg(args, "--model") || process.env.GOOGLE_MODEL || "gemini-2.0-flash";
  const skipSplit = args.includes("--skip-split");
  const skipAnalyze = args.includes("--skip-analyze");

  const chunksDir = `${outputDir}/chunks`;
  const resultsDir = `${outputDir}/results`;

  // Validate
  if (!skipSplit && !existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY environment variable is required");
    console.error("   Create a .env file with your API key (see .env.example)");
    process.exit(1);
  }

  console.log("📋 Configuration:");
  console.log(`   Input file: ${inputFile}`);
  console.log(`   Chunk size: ${chunkSize.toLocaleString()}`);
  console.log(`   Output directory: ${outputDir}`);
  console.log(`   Model: ${model}`);
  console.log(`   Skip split: ${skipSplit}`);
  console.log(`   Skip analyze: ${skipAnalyze}`);

  // Step 1: Split CSV
  if (!skipSplit) {
    console.log("\n" + "═".repeat(70));
    console.log("STEP 1: SPLITTING CSV INTO CHUNKS");
    console.log("═".repeat(70));
    await splitCsv({ inputFile, outputDir: chunksDir, chunkSize });
  } else {
    console.log("\n⏭️  Skipping CSV split (--skip-split)");
  }

  // Step 2: Analyze chunks
  if (!skipAnalyze) {
    console.log("\n" + "═".repeat(70));
    console.log("STEP 2: ANALYZING CHUNKS WITH AI");
    console.log("═".repeat(70));
    const analyses = await analyzeAllChunks({ chunksDir, resultsDir, model });
    
    console.log(`\n✅ Analyzed ${analyses.length} chunks`);
  } else {
    console.log("\n⏭️  Skipping chunk analysis (--skip-analyze)");
  }

  // Step 3: Combine results
  console.log("\n" + "═".repeat(70));
  console.log("STEP 3: COMBINING RESULTS INTO FINAL ANALYSIS");
  console.log("═".repeat(70));
  
  // Use the same model for final synthesis (Gemini Flash is capable enough)
  const finalModel = model;
  const finalAnalysis = await combineResults(resultsDir, finalModel);
  
  displayFinalAnalysis(finalAnalysis);
  saveFinalAnalysis(finalAnalysis, resultsDir);

  console.log("\n" + "═".repeat(70));
  console.log("🎉 ANALYSIS COMPLETE!");
  console.log("═".repeat(70));
  console.log(`\n📁 Results saved to: ${resultsDir}`);
  console.log(`   - final_analysis.json (structured data)`);
  console.log(`   - final_analysis.md (readable report)`);
}

function getArg(args: string[], flag: string): string | undefined {
  const index = args.indexOf(flag);
  if (index !== -1 && index + 1 < args.length) {
    return args[index + 1];
  }
  return undefined;
}

main().catch(console.error);
