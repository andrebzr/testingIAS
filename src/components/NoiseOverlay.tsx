import { AbsoluteFill, useCurrentFrame } from "remotion";
export const NoiseOverlay = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <svg
        width="1080"
        height="1920"
        style={{
          opacity: 0.045,
          mixBlendMode: "screen",
          transform: `translate(${(f % 3) - 1}px, ${(Math.floor(f / 3) % 3) - 1}px)`,
        }}
      >
        <filter id="grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".72"
            numOctaves="2"
            seed={7}
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="1080" height="1920" filter="url(#grain)" />
      </svg>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center,transparent 25%,rgba(0,0,0,.64) 100%)",
        }}
      />
    </AbsoluteFill>
  );
};
