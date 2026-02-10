# Hardtraxx Ideas - Forum Posts Pain Point Analyzer

Analyze forum posts to identify user pain points and generate feature ideas using AI (Vercel AI SDK).

## Features

- **CSV Splitting**: Split large CSV files (2M+ rows) into configurable chunks
- **AI Analysis**: Analyze each chunk for pain points using GPT models
- **Pain Point Detection**: Identify user frustrations, bugs, and missing features
- **Table Output**: View results in formatted tables in your terminal
- **Final Synthesis**: Combine all chunk analyses into a comprehensive report
- **Markdown Report**: Generate a stakeholder-ready markdown report

## Setup

1. **Install dependencies:**

```bash
npm install
```

2. **Configure environment:**

```bash
cp .env.example .env
```

Edit `.env` and add your OpenAI API key:

```
OPENAI_API_KEY=sk-your-key-here
```

## Usage

### Option 1: Run Complete Pipeline

Run all steps (split → analyze → combine) in one command:

```bash
npm run run-all -- path/to/your/posts.csv
```

With options:

```bash
npm run run-all -- data/posts.csv --chunk-size 50000 --output-dir ./output --model gpt-4o-mini
```

### Option 2: Run Steps Individually

**Step 1: Split CSV into chunks**

```bash
npm run split -- path/to/posts.csv 100000 ./chunks
```

Arguments:
- `input-csv`: Path to your CSV file
- `chunk-size`: Rows per chunk (default: 100,000)
- `output-dir`: Where to save chunks (default: ./chunks)

**Step 2: Analyze chunks with AI**

```bash
npm run analyze -- ./chunks ./results gpt-4o-mini
```

Arguments:
- `chunks-dir`: Directory containing CSV chunks
- `results-dir`: Where to save results (default: ./results)
- `model`: OpenAI model (default: gpt-4o-mini)

**Step 3: Combine into final analysis**

```bash
npm run combine -- ./results gpt-4o
```

Arguments:
- `results-dir`: Directory with chunk analyses
- `model`: OpenAI model for synthesis (default: gpt-4o)

## CSV Format

Your CSV should contain forum posts with columns like:
- `content`, `body`, `text`, `message`, or `post` (the script auto-detects)
- Additional columns are fine and will be ignored

Example:

```csv
id,user_id,content,created_at
1,123,"I love this platform but wish it had dark mode",2024-01-15
2,456,"The upload feature keeps crashing on large files",2024-01-16
```

## Output

### Terminal Tables

Pain points are displayed in formatted tables:

```
┌──────────────┬─────────────────────────┬──────────┬───────────┬─────────────────────────┐
│ Category     │ Description             │ Severity │ Frequency │ Suggested Feature       │
├──────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────────┤
│ Performance  │ Uploads fail on large   │ high     │ 45        │ Chunked upload with     │
│              │ files                   │          │           │ resume capability       │
├──────────────┼─────────────────────────┼──────────┼───────────┼─────────────────────────┤
│ UX           │ No dark mode available  │ medium   │ 32        │ Add dark mode toggle    │
│              │                         │          │           │ in settings             │
└──────────────┴─────────────────────────┴──────────┴───────────┴─────────────────────────┘
```

### Generated Files

- `output/results/all_chunk_analyses.json` - Individual chunk analyses
- `output/results/final_analysis.json` - Consolidated analysis data
- `output/results/final_analysis.md` - Markdown report for stakeholders

## Cost Estimation

Using `gpt-4o-mini` for chunk analysis is recommended to minimize costs:
- ~500 posts per chunk are sampled for analysis
- Each chunk analysis costs approximately $0.01-0.05
- Final synthesis uses `gpt-4o` for better quality (~$0.10-0.50)

For 2M rows split into 20 chunks of 100k each:
- Estimated total cost: $1-3

## Tips

1. **Resume interrupted analysis**: The analyzer skips already-processed chunks
2. **Large files**: Use smaller chunk sizes (50k) for faster iteration
3. **Quality vs Cost**: Use `gpt-4o` instead of `gpt-4o-mini` for better analysis (5-10x cost)
4. **Skip steps**: Use `--skip-split` or `--skip-analyze` to rerun specific steps

## Project Structure

```
hardtraxx-ideas/
├── src/
│   ├── types.ts           # Zod schemas and types
│   ├── csv-splitter.ts    # CSV chunking utility
│   ├── analyze-chunks.ts  # AI analysis of chunks
│   ├── combine-results.ts # Final analysis synthesis
│   └── index.ts           # Main pipeline runner
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

## License

MIT
