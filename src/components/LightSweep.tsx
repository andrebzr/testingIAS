import { AbsoluteFill, useCurrentFrame } from "remotion";
import { enter } from "../utils/animations";
export const LightSweep = () => {
  const t = enter(useCurrentFrame(), 8, 55);
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        overflow: "hidden",
        mixBlendMode: "screen",
      }}
    >
      <div
        style={{
          height: "160%",
          width: 110,
          position: "absolute",
          top: "-30%",
          left: `${-30 + t * 160}%`,
          background:
            "linear-gradient(90deg,transparent,rgba(178,218,237,.12),transparent)",
          transform: "rotate(24deg)",
          filter: "blur(15px)",
        }}
      />
    </AbsoluteFill>
  );
};
