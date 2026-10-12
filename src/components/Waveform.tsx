import { useCurrentFrame } from "remotion";
export const Waveform = ({
  width = 880,
  height = 220,
  intensity = 1,
}: {
  width?: number;
  height?: number;
  intensity?: number;
}) => {
  const f = useCurrentFrame();
  const points = Array.from({ length: 221 }, (_, i) => {
    const x = (i / 220) * width;
    const envelope = Math.exp(-Math.pow((i - 110) / 48, 2));
    const y =
      height / 2 +
      Math.sin(i * 0.24 - f * 0.33) *
        Math.sin(i * 0.073 + f * 0.09) *
        envelope *
        height *
        0.36 *
        intensity;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg width={width} height={height}>
      <line
        x1="0"
        y1={height / 2}
        x2={width}
        y2={height / 2}
        stroke="#00c4e8"
        opacity=".17"
      />
      <polyline
        points={points}
        stroke="#00c4e8"
        strokeWidth="2.2"
        fill="none"
      />
    </svg>
  );
};
