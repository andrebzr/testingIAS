import { bundle } from "@remotion/bundler";
import { selectComposition, renderStill } from "@remotion/renderer";
import { mkdirSync, readFileSync, existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
execFileSync("node", ["scripts/prepare-assets.mjs"], { stdio: "inherit" });
execFileSync("python3", ["scripts/generate-audio.py"], { stdio: "inherit" });
mkdirSync("output/review", { recursive: true });
const inputProps = {
  useImages: true,
  assets: JSON.parse(readFileSync("public/products/assets.json", "utf8")),
};
const browserExecutable =
  process.env.CHROME_PATH ||
  (existsSync("/usr/bin/chromium") ? "/usr/bin/chromium" : undefined);
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({
  serveUrl,
  id: "VRAudioReel",
  inputProps,
  browserExecutable,
});
for (const [name, frame] of [
  ["intro", 27],
  ["brand", 103],
  ["vr210", 171],
  ["sw218", 260],
  ["engineering", 350],
  ["outro", 425],
]) {
  await renderStill({
    composition,
    serveUrl,
    inputProps,
    frame,
    output: "output/review/" + name + ".png",
    browserExecutable,
  });
  console.log("Reviewed frame:", name, frame);
}
