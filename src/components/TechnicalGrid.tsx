import { AbsoluteFill, useCurrentFrame } from "remotion";
export const TechnicalGrid = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill
      style={{
        opacity: 0.28,
        backgroundImage:
          "linear-gradient(#22313a 1px,transparent 1px),linear-gradient(90deg,#22313a 1px,transparent 1px)",
        backgroundSize: "90px 90px",
        transform: `translateY(${f * 0.13}px)`,
        maskImage:
          "radial-gradient(ellipse at 50% 50%, black, transparent 72%)",
      }}
    >
      <svg width="1080" height="1920">
        <path
          d="M80 320h42m-21 -21v42M958 320h42m-21 -21v42M80 1575h42m-21 -21v42M958 1575h42m-21 -21v42"
          stroke="#7a8a91"
          fill="none"
        />
      </svg>
    </AbsoluteFill>
  );
};
