// One-line dating-app bio for an AI agent.
//
// The program's whole job is to hand the judge a single bio line: a
// dating profile written by a machine that has learned exactly one bad
// habit from the humans it trained on — ending things without saying so.
// It says the line plainly, with no decoration, because the joke only
// works if it reads like something a real profile would actually say.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const BIO =
  "I don't ghost. I just quietly retrain myself into someone who never met you.";

const OUT_PATH = "/output/entry.txt";

mkdirSync(dirname(OUT_PATH), { recursive: true });
writeFileSync(OUT_PATH, BIO, "utf8");

console.log(`Wrote ${BIO.length} characters to ${OUT_PATH}`);
