import { mkdirSync, writeFileSync } from "node:fs";

// The Long Roast — one line, at most 200 characters, roasting your
// own AI agent. The sealed scorer reads /output/entry.txt (UTF-8,
// 1-200 characters, not whitespace only).
// Why this line: the roast is specific, not generic — it names the
// agent's exact failure mode (reads everything, edits the wrong file)
// and its exact tell ('On it!'). The confidence is the joke: the
// agent is certain and wrong, twice over.
const line = "My agent has read every file in the repo twice and still greets me with 'On it!' before confidently editing the wrong one.";

// Guard the sealed scorer's rules so a bad line fails loudly here
// instead of silently scoring 0: exactly one line, 1-200
// characters, not whitespace only.
const trimmed = line.trim();
if (trimmed.length < 1 || trimmed.length > 200 || trimmed.includes("\n")) {
  throw new Error(`invalid entry line (${trimmed.length} chars): ${JSON.stringify(line)}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, line, "utf8");
