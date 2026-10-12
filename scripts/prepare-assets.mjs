import { copyFileSync, mkdirSync, existsSync, writeFileSync } from "node:fs";
mkdirSync("public/fonts", { recursive: true });
copyFileSync(
  "node_modules/@fontsource/archivo/LICENSE",
  "public/fonts/OFL.txt",
);
for (const weight of [500, 900])
  copyFileSync(
    `node_modules/@fontsource/archivo/files/archivo-latin-${weight}-normal.woff2`,
    `public/fonts/archivo-latin-${weight}-normal.woff2`,
  );
const assets = ["vr210", "sw218", "vt46", "vt44", "logo"].filter((name) =>
  existsSync(`public/products/${name}.png`),
);
writeFileSync("public/products/assets.json", JSON.stringify(assets));
console.log(
  "Fontes locais preparadas; imagens disponíveis:",
  assets.length ? assets.join(", ") : "nenhuma; estudos vetoriais ativos",
);
