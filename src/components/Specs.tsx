import { useCurrentFrame } from "remotion";
import { enter } from "../utils/animations";
import { Label } from "./AnimatedText";
export const Specs = ({
  items,
}: {
  items: { value: string; label: string }[];
}) => {
  const frame = useCurrentFrame();
  return (
    <div
      style={{
        position: "absolute",
        top: 1245,
        left: 90,
        right: 90,
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "30px 50px",
      }}
    >
      {items.map((s, i) => (
        <div
          key={s.label}
          style={{
            opacity: enter(frame, 13 + i * 4),
            transform: `translateY(${(1 - enter(frame, 13 + i * 4)) * 15}px)`,
            borderTop: "1px solid #35434b",
            paddingTop: 14,
          }}
        >
          <div
            data-safe-text
            style={{ fontSize: 43, fontWeight: 900, letterSpacing: -1 }}
          >
            {s.value}
          </div>
          <Label style={{ fontSize: 17, marginTop: 8, letterSpacing: 2 }}>
            {s.label}
          </Label>
        </div>
      ))}
    </div>
  );
};
