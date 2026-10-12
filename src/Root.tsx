import { Composition, getStaticFiles } from "remotion";
import { VRAudioReel } from "./compositions/VRAudioReel";
import "./style.css";
export const Root = () => (
  <Composition
    id="VRAudioReel"
    component={VRAudioReel}
    width={1080}
    height={1920}
    fps={30}
    durationInFrames={450}
    defaultProps={{
      useImages: true,
      assets: getStaticFiles()
        .filter((f) => /^products\/.*\.png$/.test(f.name))
        .map((f) => f.name.replace("products/", "").replace(".png", "")),
    }}
  />
);
