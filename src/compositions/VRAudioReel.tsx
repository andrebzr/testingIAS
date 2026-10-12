import { useEffect, useState } from "react";
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  delayRender,
  continueRender,
} from "remotion";
import { Intro } from "../scenes/Intro";
import { BrandReveal } from "../scenes/BrandReveal";
import { VR210Scene } from "../scenes/VR210Scene";
import { SW218Scene } from "../scenes/SW218Scene";
import { EngineeringScene } from "../scenes/EngineeringScene";
import { Outro } from "../scenes/Outro";
import { TechnicalGrid } from "../components/TechnicalGrid";
import { NoiseOverlay } from "../components/NoiseOverlay";

export const VRAudioReel = ({
  useImages = false,
  assets = [],
}: {
  useImages?: boolean;
  assets?: string[];
}) => {
  const frame = useCurrentFrame();
  const [handle] = useState(() => delayRender("Load bundled Archivo fonts"));
  useEffect(() => {
    Promise.all([
      document.fonts.load("900 96px Archivo"),
      document.fonts.load("500 24px Archivo"),
    ]).then(() => continueRender(handle));
  }, [handle]);
  const image = (name: string) => useImages && assets.includes(name);
  return (
    <AbsoluteFill style={{ background: "#050708" }}>
      <style>{`@font-face{font-family:Archivo;src:url('${staticFile("fonts/archivo-latin-900-normal.woff2")}');font-weight:900;font-display:block}@font-face{font-family:Archivo;src:url('${staticFile("fonts/archivo-latin-500-normal.woff2")}');font-weight:500;font-display:block}`}</style>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at 75% 40%,#12212c 0%,#0a1016 34%,#050708 74%)",
          opacity: frame < 60 ? 0.45 : 1,
        }}
      />
      <TechnicalGrid />
      {Array.from({ length: 24 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: 60 + ((i * 137) % 960),
            top: (i * 173 + frame * (0.12 + (i % 3) * 0.04)) % 1920,
            width: i % 4 === 0 ? 2 : 1,
            height: 2,
            background: "#b1c4ce",
            opacity: 0.08 + (i % 3) * 0.03,
          }}
        />
      ))}
      <Sequence from={0} durationInFrames={60}>
        <Intro />
      </Sequence>
      <Sequence from={60} durationInFrames={60}>
        <BrandReveal logo={image("logo")} />
      </Sequence>
      <Sequence from={120} durationInFrames={90}>
        <VR210Scene image={image("vr210")} />
      </Sequence>
      <Sequence from={210} durationInFrames={90}>
        <SW218Scene image={image("sw218")} />
      </Sequence>
      <Sequence from={300} durationInFrames={75}>
        <EngineeringScene />
      </Sequence>
      <Sequence from={375} durationInFrames={75}>
        <Outro logo={image("logo")} />
      </Sequence>
      <NoiseOverlay />
      {[60, 120, 210, 300, 375].some((t) => frame >= t && frame < t + 3) && (
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(90deg,transparent,rgba(0,196,232,.08),transparent)",
            transform: `translateX(${(frame % 3) * 3}px)`,
          }}
        />
      )}
      <Audio src={staticFile("audio/industrial.wav")} />
    </AbsoluteFill>
  );
};
