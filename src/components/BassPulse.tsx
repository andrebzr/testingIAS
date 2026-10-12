import { AbsoluteFill, useCurrentFrame } from "remotion";
export const BassPulse = ({ offset = 0 }: { offset?: number }) => {
  const f = useCurrentFrame() - offset;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      {[0, 13, 26].map((d) => {
        const p = ((((f - d) % 65) + 65) % 65) / 65;
        return (
          <div
            key={d}
            style={{
              position: "absolute",
              width: 900,
              height: 900,
              border: "1px solid #00c4e8",
              borderRadius: "50%",
              opacity: (1 - p) * 0.19,
              transform: `scale(${0.35 + p * 1.7})`,
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};
