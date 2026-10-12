import { Stage } from "../components/Stage";
import { AnimatedText, Label } from "../components/AnimatedText";
import { ProductReveal } from "../components/ProductReveal";
import { Specs } from "../components/Specs";
export const VR210Scene = ({ image }: { image: boolean }) => (
  <Stage duration={90} index="03" name="LINE ARRAY">
    <div style={{ position: "absolute", top: 360, left: 90 }}>
      <Label style={{ color: "#00c4e8", marginBottom: 18 }}>LINE ARRAY</Label>
      <AnimatedText size={107}>VR210 FULL</AnimatedText>
    </div>
    <div style={{ position: "absolute", top: 565, left: 40 }}>
      <ProductReveal product="vr210" hasImage={image} />
    </div>
    <svg
      width="1080"
      height="1920"
      style={{ position: "absolute", opacity: 0.6 }}
    >
      <path
        d="M100 645h160l75 70M976 1100H870l-46-65"
        stroke="#00c4e8"
        strokeWidth="1"
        fill="none"
      />
      <circle cx="335" cy="715" r="4" fill="#00c4e8" />
      <path d="M90 1150v42h895v-42" fill="none" stroke="#35434b" />
    </svg>
    <Specs
      items={[
        { value: "133 dB", label: "SPL / PRESSÃO SONORA" },
        { value: "2 × 10″", label: "LOW FREQUENCY" },
        { value: "120° H", label: "DISPERSÃO HORIZONTAL" },
        { value: "70 Hz — 18 kHz", label: "RESPOSTA DE FREQUÊNCIA" },
      ]}
    />
  </Stage>
);
