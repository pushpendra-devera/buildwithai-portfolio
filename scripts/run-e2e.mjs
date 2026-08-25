// Astro 7's `dev`/`preview` commands always daemonize (they spawn a
// detached background server and the launching process exits almost
// immediately), which is incompatible with Playwright's `webServer`
// auto-start/stop feature. This script manages that lifecycle by hand:
// start the dev daemon, poll until it responds, run Playwright, then
// always stop the daemon afterward.

import { execSync, spawnSync } from "node:child_process";

const URL = "http://localhost:4321/";
const READY_TIMEOUT_MS = 30000;
const POLL_INTERVAL_MS = 300;

function run(cmd) {
  return execSync(cmd, { stdio: "pipe", encoding: "utf8" });
}

async function waitUntilReady() {
  const deadline = Date.now() + READY_TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(URL);
      if (res.status < 500) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
  }
  throw new Error(`Dev server never became ready at ${URL}`);
}

console.log("Starting Astro dev server...");
// --background is explicit and portable: astro also auto-backgrounds
// itself in some environments (e.g. detected AI-agent shells) and refuses
// --ignore-lock there, but a plain CI shell would otherwise block forever
// in the foreground with no --background flag.
run("npx astro dev --background");

let exitCode = 0;
try {
  await waitUntilReady();
  console.log("Dev server ready. Running Playwright...");
  const result = spawnSync("npx", ["playwright", "test"], {
    stdio: "inherit",
    shell: true,
  });
  exitCode = result.status ?? 1;
} finally {
  console.log("Stopping Astro dev server...");
  try {
    run("npx astro dev stop");
  } catch {
    // best-effort cleanup
  }
}

process.exit(exitCode);
