import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { AnimatedText, Label } from "../components/AnimatedText";
import { ProductReveal } from "../components/ProductReveal";
import { BassPulse } from "../components/BassPulse";
import { Specs } from "../components/Specs";
export const SW218Scene = ({ image }: { image: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Stage duration={90} index="04" name="BAIXA FREQUÊNCIA">
      <BassPulse />
      <div style={{ position: "absolute", top: 360, left: 90 }}>
        <Label style={{ color: "#00c4e8", marginBottom: 18 }}>SUBWOOFER</Label>
        <AnimatedText size={128}>SW218</AnimatedText>
      </div>
      <div
        style={{
          position: "absolute",
          top: 530,
          left: 20,
          transform: `translateY(${Math.sin(f * 1.7) * Math.exp(-f / 5) * 7}px)`,
        }}
      >
        <ProductReveal product="sw218" hasImage={image} />
      </div>
      <Specs
        items={[
          { value: "2 × 18″", label: "TRANSDUTORES" },
          { value: "130 dB", label: "SPL / PRESSÃO SONORA" },
          { value: "28 — 120 Hz", label: "BAIXA FREQUÊNCIA" },
          { value: "SINTA.", label: "POTÊNCIA QUE ATRAVESSA" },
        ]}
      />
    </Stage>
  );
};
