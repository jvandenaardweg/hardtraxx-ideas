import { readFileSync, writeFileSync, existsSync } from "fs";
import { join } from "path";
import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import Table from "cli-table3";
import { config } from "dotenv";
import { FinalAnalysisSchema, type ChunkAnalysis, type FinalAnalysis } from "./types.js";

config();

/**
 * Combine all chunk analyses into a final comprehensive analysis
 */
export async function combineResults(
  resultsDir: string,
  model: string = "gemini-2.0-flash"
): Promise<FinalAnalysis> {
  const allResultsPath = join(resultsDir, "all_chunk_analyses.json");

  if (!existsSync(allResultsPath)) {
    console.error(`❌ Results file not found: ${allResultsPath}`);
    console.error("   Run 'npm run analyze' first to generate chunk analyses");
    process.exit(1);
  }

  const chunkAnalyses: ChunkAnalysis[] = JSON.parse(readFileSync(allResultsPath, "utf-8"));

  console.log(`\n🔄 Combining ${chunkAnalyses.length} chunk analyses...`);

  // Calculate totals
  const totalPosts = chunkAnalyses.reduce((sum, c) => sum + c.totalPostsAnalyzed, 0);
  console.log(`   📊 Total posts across all chunks: ${totalPosts.toLocaleString()}`);

  // Aggregate all pain points for the prompt
  const allPainPoints = chunkAnalyses.flatMap((c) =>
    c.painPoints.map((p) => ({
      ...p,
      chunk: c.chunkId,
    }))
  );

  const allThemes = chunkAnalyses.flatMap((c) => c.topThemes);
  const sentiments = chunkAnalyses.map((c) => c.overallSentiment);

  // Prepare summary for AI
  const painPointsSummary = allPainPoints
    .map(
      (p) =>
        `[${p.category}] ${p.description} (severity: ${p.severity}, freq: ${p.frequency}, chunk: ${p.chunk})`
    )
    .join("\n");

  console.log(`   🔍 Total pain points found: ${allPainPoints.length}`);
  console.log(`   📝 Generating final consolidated analysis...`);

  // Generate final analysis with AI
  const { object: finalAnalysis } = await generateObject({
    model: google(model),
    schema: FinalAnalysisSchema,
    prompt: `You are creating a final consolidated analysis of user pain points from a music/DJ community forum platform.

You have analyzed ${chunkAnalyses.length} chunks of data containing ${totalPosts.toLocaleString()} total forum posts.

PAIN POINTS FOUND ACROSS ALL CHUNKS:
${painPointsSummary}

THEMES FOUND:
${[...new Set(allThemes)].join(", ")}

SENTIMENT DISTRIBUTION:
${sentiments.join(", ")}

Your task:
1. Consolidate similar pain points across chunks into unified categories
2. Calculate total mentions for each consolidated pain point
3. Prioritize based on severity and frequency (priority score 1-10)
4. Generate the top 10 feature ideas that would address the most impactful pain points
5. Write an executive summary for stakeholders

Remember: totalPostsAnalyzed should be ${totalPosts}.
Focus on actionable insights that could drive product improvements.`,
  });

  return finalAnalysis;
}

/**
 * Display final analysis in formatted tables
 */
export function displayFinalAnalysis(analysis: FinalAnalysis): void {
  console.log("\n" + "=".repeat(100));
  console.log("📊 FINAL ANALYSIS REPORT");
  console.log("=".repeat(100));

  console.log(`\n📈 Total Posts Analyzed: ${analysis.totalPostsAnalyzed.toLocaleString()}`);

  // Executive Summary
  console.log("\n📋 EXECUTIVE SUMMARY");
  console.log("-".repeat(100));
  console.log(analysis.executiveSummary);

  // Pain Points Table
  console.log("\n🔴 CONSOLIDATED PAIN POINTS (by priority)");
  console.log("-".repeat(100));

  const painPointsTable = new Table({
    head: ["Priority", "Category", "Description", "Severity", "Mentions", "Suggested Features"],
    colWidths: [10, 15, 30, 10, 10, 35],
    wordWrap: true,
  });

  const sortedPainPoints = [...analysis.consolidatedPainPoints].sort(
    (a, b) => b.priority - a.priority
  );

  for (const pp of sortedPainPoints) {
    painPointsTable.push([
      pp.priority.toString(),
      pp.category,
      pp.description,
      pp.severity,
      pp.totalMentions.toString(),
      pp.suggestedFeatures.slice(0, 2).join("; "),
    ]);
  }

  console.log(painPointsTable.toString());

  // Feature Ideas Table
  console.log("\n💡 TOP FEATURE IDEAS");
  console.log("-".repeat(100));

  const featuresTable = new Table({
    head: ["#", "Feature", "Description", "Impact", "Addresses"],
    colWidths: [5, 20, 40, 10, 30],
    wordWrap: true,
  });

  analysis.topFeatureIdeas.forEach((feature, i) => {
    featuresTable.push([
      (i + 1).toString(),
      feature.name,
      feature.description,
      feature.estimatedImpact,
      feature.addressesPainPoints.slice(0, 3).join(", "),
    ]);
  });

  console.log(featuresTable.toString());

  console.log("\n" + "=".repeat(100));
}

/**
 * Save final analysis to files
 */
export function saveFinalAnalysis(analysis: FinalAnalysis, resultsDir: string): void {
  // Save JSON
  const jsonPath = join(resultsDir, "final_analysis.json");
  writeFileSync(jsonPath, JSON.stringify(analysis, null, 2));
  console.log(`\n💾 JSON saved: ${jsonPath}`);

  // Save Markdown report
  const mdPath = join(resultsDir, "final_analysis.md");
  const markdown = generateMarkdownReport(analysis);
  writeFileSync(mdPath, markdown);
  console.log(`📄 Markdown report saved: ${mdPath}`);
}

/**
 * Generate a markdown report from the analysis
 */
function generateMarkdownReport(analysis: FinalAnalysis): string {
  let md = `# Pain Points Analysis Report

## Overview
- **Total Posts Analyzed:** ${analysis.totalPostsAnalyzed.toLocaleString()}
- **Pain Points Identified:** ${analysis.consolidatedPainPoints.length}
- **Feature Ideas Generated:** ${analysis.topFeatureIdeas.length}

## Executive Summary

${analysis.executiveSummary}

## Consolidated Pain Points

| Priority | Category | Description | Severity | Mentions |
|----------|----------|-------------|----------|----------|
`;

  const sortedPainPoints = [...analysis.consolidatedPainPoints].sort(
    (a, b) => b.priority - a.priority
  );

  for (const pp of sortedPainPoints) {
    md += `| ${pp.priority} | ${pp.category} | ${pp.description} | ${pp.severity} | ${pp.totalMentions} |\n`;
  }

  md += `\n### Detailed Pain Points\n\n`;

  for (const pp of sortedPainPoints) {
    md += `#### ${pp.category}: ${pp.description}\n`;
    md += `- **Severity:** ${pp.severity}\n`;
    md += `- **Total Mentions:** ${pp.totalMentions}\n`;
    md += `- **Priority Score:** ${pp.priority}/10\n`;
    md += `- **Suggested Features:**\n`;
    for (const feature of pp.suggestedFeatures) {
      md += `  - ${feature}\n`;
    }
    md += `\n`;
  }

  md += `## Top Feature Ideas\n\n`;

  analysis.topFeatureIdeas.forEach((feature, i) => {
    md += `### ${i + 1}. ${feature.name}\n`;
    md += `- **Description:** ${feature.description}\n`;
    md += `- **Estimated Impact:** ${feature.estimatedImpact}\n`;
    md += `- **Addresses Pain Points:** ${feature.addressesPainPoints.join(", ")}\n\n`;
  });

  md += `---\n*Report generated on ${new Date().toISOString()}*\n`;

  return md;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
Usage: npm run combine -- <results-dir> [model]

Arguments:
  results-dir  Directory containing chunk analysis results
  model        OpenAI model to use (default: gpt-4o)

Example:
  npm run combine -- ./results gpt-4o
`);
    process.exit(1);
  }

  if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
    console.error("❌ GOOGLE_GENERATIVE_AI_API_KEY environment variable is required");
    console.error("   Create a .env file with your API key (see .env.example)");
    process.exit(1);
  }

  const resultsDir = args[0];
  const model = args[1] || "gemini-2.0-flash";

  const analysis = await combineResults(resultsDir, model);
  displayFinalAnalysis(analysis);
  saveFinalAnalysis(analysis, resultsDir);
}

main().catch(console.error);
