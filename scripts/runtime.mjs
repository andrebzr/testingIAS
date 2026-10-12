import { existsSync } from "node:fs";
import { join } from "node:path";
import { execFileSync, spawnSync } from "node:child_process";
import { ensureBrowser } from "@remotion/renderer";

export function runPython(script) {
  const candidates =
    process.platform === "win32"
      ? [
          ["py", ["-3"]],
          ["python", []],
          ["python3", []],
        ]
      : [
          ["python3", []],
          ["python", []],
        ];
  const found = candidates.find(([command, args]) => {
    const result = spawnSync(command, [...args, "--version"], {
      encoding: "utf8",
    });
    return (
      result.status === 0 &&
      /^Python 3\./.test((result.stdout || result.stderr || "").trim())
    );
  });
  if (!found)
    throw new Error(
      "Python 3 is required. On Windows, run Install-Windows.ps1.",
    );
  execFileSync(found[0], [...found[1], script], { stdio: "inherit" });
}

export async function findBrowser() {
  const candidates = [process.env.CHROME_PATH, "/usr/bin/chromium"];
  if (process.platform === "win32") {
    for (const base of [
      process.env.ProgramFiles,
      process.env["ProgramFiles(x86)"],
      process.env.LOCALAPPDATA,
    ].filter(Boolean)) {
      candidates.push(
        join(base, "Google", "Chrome", "Application", "chrome.exe"),
        join(base, "Microsoft", "Edge", "Application", "msedge.exe"),
      );
    }
  }
  if (process.platform === "darwin")
    candidates.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    );
  const local = candidates.find((path) => path && existsSync(path));
  if (local) return local;
  const result = await ensureBrowser();
  if ("path" in result) return result.path;
  throw new Error(
    "No usable browser found. Install Chrome or set CHROME_PATH.",
  );
}
