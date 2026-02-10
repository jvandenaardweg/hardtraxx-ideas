import { createReadStream, createWriteStream, mkdirSync, existsSync } from "fs";
import { parse } from "csv-parse";
import { stringify } from "csv-stringify";
import { basename, join } from "path";
import type { SplitConfig } from "./types.js";

/**
 * Split a large CSV file into smaller chunks
 */
export async function splitCsv(config: SplitConfig): Promise<string[]> {
  const { inputFile, outputDir, chunkSize } = config;

  // Create output directory if it doesn't exist
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const baseName = basename(inputFile, ".csv");
  const outputFiles: string[] = [];

  let headers: string[] | null = null;
  let currentChunk: string[][] = [];
  let chunkIndex = 0;
  let rowCount = 0;
  let totalRows = 0;

  const parser = createReadStream(inputFile).pipe(
    parse({
      relax_column_count: true,
      skip_empty_lines: true,
    })
  );

  const writeChunk = async (chunk: string[][], index: number): Promise<string> => {
    const outputPath = join(outputDir, `${baseName}_chunk_${index.toString().padStart(4, "0")}.csv`);
    
    return new Promise((resolve, reject) => {
      const output = createWriteStream(outputPath);
      const stringifier = stringify();

      stringifier.pipe(output);

      // Write headers first
      if (headers) {
        stringifier.write(headers);
      }

      // Write all rows
      for (const row of chunk) {
        stringifier.write(row);
      }

      stringifier.end();

      output.on("finish", () => resolve(outputPath));
      output.on("error", reject);
    });
  };

  console.log(`\n📂 Splitting CSV: ${inputFile}`);
  console.log(`📦 Chunk size: ${chunkSize.toLocaleString()} rows`);
  console.log(`📁 Output directory: ${outputDir}\n`);

  for await (const record of parser) {
    // First row is headers
    if (headers === null) {
      headers = record as string[];
      console.log(`📋 Headers: ${headers.join(", ")}`);
      continue;
    }

    currentChunk.push(record as string[]);
    rowCount++;
    totalRows++;

    // When chunk is full, write it
    if (rowCount >= chunkSize) {
      const outputPath = await writeChunk(currentChunk, chunkIndex);
      outputFiles.push(outputPath);
      console.log(`✅ Wrote chunk ${chunkIndex + 1}: ${outputPath} (${rowCount.toLocaleString()} rows)`);
      
      currentChunk = [];
      rowCount = 0;
      chunkIndex++;
    }
  }

  // Write remaining rows
  if (currentChunk.length > 0) {
    const outputPath = await writeChunk(currentChunk, chunkIndex);
    outputFiles.push(outputPath);
    console.log(`✅ Wrote chunk ${chunkIndex + 1}: ${outputPath} (${currentChunk.length.toLocaleString()} rows)`);
  }

  console.log(`\n🎉 Split complete!`);
  console.log(`📊 Total rows: ${totalRows.toLocaleString()}`);
  console.log(`📁 Total chunks: ${outputFiles.length}`);

  return outputFiles;
}

// CLI interface
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log(`
Usage: npm run split -- <input-csv> [chunk-size] [output-dir]

Arguments:
  input-csv   Path to the input CSV file
  chunk-size  Number of rows per chunk (default: 100000)
  output-dir  Output directory for chunks (default: ./chunks)

Example:
  npm run split -- data/posts.csv 100000 ./chunks
`);
    process.exit(1);
  }

  const inputFile = args[0];
  const chunkSize = parseInt(args[1] || "100000", 10);
  const outputDir = args[2] || "./chunks";

  if (!existsSync(inputFile)) {
    console.error(`❌ Input file not found: ${inputFile}`);
    process.exit(1);
  }

  await splitCsv({ inputFile, outputDir, chunkSize });
}

main().catch(console.error);
