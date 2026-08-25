// Crawls the built dist/ output for:
//   1. internal <a href> links that don't resolve to a real file/route
//   2. any stray reference to the private ai-job-agent repository
//
// Run after `npm run build`. Exits non-zero on any problem found.

import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(dir, "..", "dist");

const FORBIDDEN_PATTERNS = [
  /github\.com\/pushpendra-devera\/ai-job-agent/i,
  /view source on github/i,
];

if (!existsSync(distDir)) {
  console.error(`dist/ not found at ${distDir} — run "npm run build" first.`);
  process.exit(1);
}

function listHtmlFiles(root) {
  const out = [];
  for (const entry of readdirSync(root)) {
    const full = path.join(root, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) out.push(...listHtmlFiles(full));
    else if (entry.endsWith(".html")) out.push(full);
  }
  return out;
}

function routeExists(hrefPath) {
  const clean = hrefPath.split("#")[0].split("?")[0];
  if (clean === "" || clean === "/") return existsSync(path.join(distDir, "index.html"));
  const withoutLeadingSlash = clean.replace(/^\//, "");
  const candidates = [
    path.join(distDir, withoutLeadingSlash),
    path.join(distDir, withoutLeadingSlash, "index.html"),
    path.join(distDir, `${withoutLeadingSlash}.html`),
  ];
  return candidates.some((c) => existsSync(c));
}

const htmlFiles = listHtmlFiles(distDir);
let brokenLinks = 0;
let forbiddenHits = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const relFile = path.relative(distDir, file);

  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(html)) {
      console.error(`FORBIDDEN: ${relFile} matches ${pattern}`);
      forbiddenHits++;
    }
  }

  const hrefMatches = html.matchAll(/href="(\/[^"]*)"/g);
  for (const [, href] of hrefMatches) {
    if (href.startsWith("//")) continue; // protocol-relative external
    if (!routeExists(href)) {
      console.error(`BROKEN LINK: ${relFile} -> ${href}`);
      brokenLinks++;
    }
  }
}

console.log(
  `Checked ${htmlFiles.length} pages: ${brokenLinks} broken internal link(s), ${forbiddenHits} forbidden pattern match(es).`,
);

if (brokenLinks > 0 || forbiddenHits > 0) {
  process.exit(1);
}
