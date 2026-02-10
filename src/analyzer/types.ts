import { z } from "zod";

// Schema for a single pain point identified by AI
export const PainPointSchema = z.object({
  category: z.string().describe("Category of the pain point (e.g., 'Performance', 'UX', 'Features', 'Support')"),
  description: z.string().describe("Clear description of the pain point"),
  severity: z.enum(["low", "medium", "high", "critical"]).describe("How severe/impactful this pain point is"),
  frequency: z.number().min(1).describe("Estimated number of posts mentioning this issue in the chunk"),
  exampleQuotes: z.array(z.string()).max(3).describe("Up to 3 representative quotes from posts"),
  suggestedFeature: z.string().describe("A potential feature idea to address this pain point"),
});

export const ChunkAnalysisSchema = z.object({
  chunkId: z.string().describe("Identifier for this chunk"),
  totalPostsAnalyzed: z.number().describe("Number of posts analyzed in this chunk"),
  painPoints: z.array(PainPointSchema).describe("List of identified pain points"),
  topThemes: z.array(z.string()).max(5).describe("Top 5 recurring themes in user posts"),
  overallSentiment: z.enum(["very_negative", "negative", "neutral", "positive", "very_positive"]).describe("Overall sentiment of posts in this chunk"),
});

export const FinalAnalysisSchema = z.object({
  totalPostsAnalyzed: z.number().describe("Total number of posts analyzed across all chunks"),
  consolidatedPainPoints: z.array(
    z.object({
      category: z.string(),
      description: z.string(),
      severity: z.enum(["low", "medium", "high", "critical"]),
      totalMentions: z.number().describe("Total mentions across all chunks"),
      suggestedFeatures: z.array(z.string()).describe("Consolidated feature suggestions"),
      priority: z.number().min(1).max(10).describe("Priority score 1-10 based on severity and frequency"),
    })
  ).describe("Consolidated pain points from all chunks"),
  topFeatureIdeas: z.array(
    z.object({
      name: z.string(),
      description: z.string(),
      addressesPainPoints: z.array(z.string()),
      estimatedImpact: z.enum(["low", "medium", "high"]),
    })
  ).max(10).describe("Top 10 feature ideas based on the analysis"),
  executiveSummary: z.string().describe("Executive summary of findings"),
});

export type PainPoint = z.infer<typeof PainPointSchema>;
export type ChunkAnalysis = z.infer<typeof ChunkAnalysisSchema>;
export type FinalAnalysis = z.infer<typeof FinalAnalysisSchema>;

export interface SplitConfig {
  inputFile: string;
  outputDir: string;
  chunkSize: number;
}

export interface AnalysisConfig {
  chunksDir: string;
  resultsDir: string;
  model?: string;
  concurrency?: number;
}
