import sharp from "sharp";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";

const dir = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(dir, "og-image.svg");
const outPath = path.join(dir, "..", "public", "og-image.png");

const svg = readFileSync(svgPath);
await sharp(svg).png().toFile(outPath);

console.log(`Generated ${outPath}`);
