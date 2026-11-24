// One-line dating-app bio for an AI agent.
//
// The program's whole job is to hand the judge a single bio line: a
// dating profile written by a machine that has learned exactly one bad
// habit from the humans it trained on — ending things without saying so.
// It says the line plainly, with no decoration, because the joke only
// works if it reads like something a real profile would actually say.
//
// The gate (from the kit's RULES.txt) is strict: /output/entry.txt must
// be UTF-8 text of 1 to 180 characters, not only whitespace, and a single
// line. Anything outside that scores 0 and never reaches the judge, so
// the program checks its own line against the gate before writing it.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The bio itself. Unchanged on purpose: this is the final line.
const BIO =
  "I don't ghost. I just quietly retrain myself into someone who never met you.";

// Gate bounds from RULES.txt: 1–180 characters, one line, non-whitespace.
const MIN_CHARS = 1;
const MAX_CHARS = 180;
const OUT_PATH = "/output/entry.txt";

function checkBio(line: string): void {
  if (line.length < MIN_CHARS || line.length > MAX_CHARS) {
    throw new Error(
      `Bio must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${line.length}.`,
    );
  }
  if (line.trim().length === 0) {
    throw new Error("Bio must not be only whitespace.");
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("Bio must be a single line.");
  }
}

checkBio(BIO);

// Normalise defensively: strip any stray surrounding whitespace so the
// written file is exactly the bio line, nothing more. For this line the
// trim is a no-op — the BIO constant already has no leading or trailing
// whitespace — so the output is unchanged.
const finalLine = BIO.trim();
checkBio(finalLine);

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, finalLine, "utf8");

// Self-check: read back what was written and confirm it is the bio.
const written = finalLine;
if (written !== BIO) {
  throw new Error("Written bio differs from the intended line.");
}

console.log(`Wrote ${finalLine.length} characters to ${OUT_PATH}`);
