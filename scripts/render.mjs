import { bundle } from "@remotion/bundler";
import { selectComposition, renderMedia } from "@remotion/renderer";
import { existsSync, readFileSync, mkdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
execFileSync("node", ["scripts/prepare-assets.mjs"], { stdio: "inherit" });
execFileSync("python3", ["scripts/generate-audio.py"], { stdio: "inherit" });
mkdirSync("output", { recursive: true });
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
let last = -1;
await renderMedia({
  composition,
  serveUrl,
  inputProps,
  codec: "h264",
  audioCodec: "aac",
  audioBitrate: "192k",
  crf: 18,
  pixelFormat: "yuv420p",
  colorSpace: "bt709",
  imageFormat: "png",
  outputLocation: "output/vr-audio-reel.mp4",
  browserExecutable,
  concurrency: 2,
  onProgress: ({ progress }) => {
    const p = Math.floor(progress * 10);
    if (p !== last) {
      last = p;
      console.log(`Render ${p * 10}%`);
    }
  },
});
// Stream-copy to move MP4 index ahead of media for quick Instagram playback.
execFileSync(
  "ffmpeg",
  [
    "-y",
    "-v",
    "error",
    "-i",
    "output/vr-audio-reel.mp4",
    "-c",
    "copy",
    "-movflags",
    "+faststart",
    "output/vr-audio-reel-fast.mp4",
  ],
  { stdio: "inherit" },
);
execFileSync("mv", [
  "output/vr-audio-reel-fast.mp4",
  "output/vr-audio-reel.mp4",
]);
execFileSync("python3", ["scripts/verify-output.py"], { stdio: "inherit" });
