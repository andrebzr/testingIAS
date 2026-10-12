import { bundle } from "@remotion/bundler";
import { chromium } from "playwright-core";
import { createServer } from "node:http";
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { resolve, extname } from "node:path";
const dir = await bundle({ entryPoint: "src/index.ts" });
const mime = {
  ".js": "text/javascript",
  ".html": "text/html",
  ".css": "text/css",
  ".png": "image/png",
  ".wav": "audio/wav",
  ".woff2": "font/woff2",
};
const server = createServer((req, res) => {
  const path = resolve(
    dir,
    "." +
      decodeURIComponent(
        (req.url || "/").split("?")[0] === "/"
          ? "/index.html"
          : req.url.split("?")[0],
      ),
  );
  if (!path.startsWith(dir + "/") || !existsSync(path)) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader(
    "Content-Type",
    mime[extname(path)] || "application/octet-stream",
  );
  res.end(readFileSync(path));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const browser = await chromium.launch({
  executablePath: process.env.CHROME_PATH || "/usr/bin/chromium",
  headless: true,
  args: ["--no-sandbox", "--disable-dev-shm-usage"],
});
try {
  const page = await browser.newPage({
    viewport: { width: 1080, height: 1920 },
  });
  const assets = JSON.parse(
    readFileSync("public/products/assets.json", "utf8"),
  );
  await page.addInitScript(
    (props) => {
      window.remotion_inputProps = JSON.stringify(props);
      window.remotion_initialFrame = 0;
      window.remotion_audioEnabled = false;
      window.remotion_videoEnabled = true;
      window.remotion_isMainTab = true;
      window.remotion_puppeteerTimeout = 30000;
    },
    { useImages: true, assets },
  );
  await page.goto(`http://127.0.0.1:${server.address().port}`);
  await page.waitForFunction(
    () => typeof window.remotion_setBundleMode === "function",
  );
  await page.evaluate(
    (props) =>
      window.remotion_setBundleMode({
        type: "composition",
        compositionName: "VRAudioReel",
        serializedResolvedPropsWithSchema: JSON.stringify(props),
        compositionDurationInFrames: 450,
        compositionFps: 30,
        compositionHeight: 1920,
        compositionWidth: 1080,
        compositionDefaultSampleRate: 48000,
      }),
    { useImages: true, assets },
  );
  await page.waitForFunction(() => window.remotion_renderReady === true);
  await page.evaluate(() => document.fonts.ready);
  const violations = [];
  for (let frame = 0; frame < 450; frame++) {
    await page.evaluate(
      (f) => window.remotion_setFrame(f, "VRAudioReel", 1),
      frame,
    );
    await page.evaluate(
      () =>
        new Promise((r) =>
          requestAnimationFrame(() => requestAnimationFrame(r)),
        ),
    );
    const bad = await page.evaluate(() => {
      const violations = [];
      for (const element of document.querySelectorAll("[data-safe-text]")) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node;
        while ((node = walker.nextNode())) {
          if (!node.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          const r = range.getBoundingClientRect();
          let left = r.left,
            right = r.right,
            top = r.top,
            bottom = r.bottom,
            opacity = 1;
          for (let p = node.parentElement; p; p = p.parentElement) {
            const css = getComputedStyle(p);
            opacity *= Number(css.opacity);
            if (css.overflow === "hidden") {
              const b = p.getBoundingClientRect();
              left = Math.max(left, b.left);
              right = Math.min(right, b.right);
              top = Math.max(top, b.top);
              bottom = Math.min(bottom, b.bottom);
            }
          }
          if (opacity < 0.03 || right <= left || bottom <= top) continue;
          if (left < 79.5 || right > 1000.5 || top < 219.5 || bottom > 1600.5)
            violations.push({
              text: node.textContent,
              bounds: { left, right, top, bottom },
            });
        }
      }
      return violations;
    });
    if (bad.length) violations.push({ frame, bad });
  }
  mkdirSync("output/review", { recursive: true });
  writeFileSync(
    "output/review/safe-area.json",
    JSON.stringify(
      {
        frames: 450,
        safe: { left: 80, right: 1000, top: 220, bottom: 1600 },
        violations,
      },
      null,
      2,
    ),
  );
  console.log(
    `Safe area: 450 frames checked; ${violations.length} frames with violations.`,
  );
  if (violations.length) {
    console.log(JSON.stringify(violations.slice(0, 3), null, 2));
    process.exitCode = 1;
  }
} finally {
  await browser.close();
  await new Promise((r) => server.close(r));
}
