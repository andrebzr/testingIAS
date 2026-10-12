import { runPython } from "./runtime.mjs";
if (!process.argv[2]) throw new Error("Specify a Python script");
runPython(process.argv[2]);
