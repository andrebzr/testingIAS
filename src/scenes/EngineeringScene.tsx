import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { AnimatedText, Label } from "../components/AnimatedText";
import { enter } from "../utils/animations";
export const EngineeringScene = () => {
  const f = useCurrentFrame();
  return (
    <Stage duration={75} index="05" name="ORIGEM">
      <svg
        width="1080"
        height="1920"
        style={{ position: "absolute", opacity: 0.3 }}
      >
        <g fill="none" stroke="#526b78">
          <path d="M90 575h900M90 1125h900M730 340v1120" />
          <circle cx="765" cy="860" r="185" />
          <circle cx="765" cy="860" r="146" />
          <path d="M550 860h430M765 650v420" />
        </g>
        <path d="M590 980L870 700" stroke="#00c4e8" />
      </svg>
      <div style={{ position: "absolute", top: 420, left: 90 }}>
        <AnimatedText size={225} color="#00c4e8">
          100%
        </AnimatedText>
        <AnimatedText delay={4} size={88} style={{ marginTop: 24 }}>
          FABRICAÇÃO
        </AnimatedText>
        <AnimatedText delay={7} size={112}>
          NACIONAL
        </AnimatedText>
      </div>
      <div
        style={{
          position: "absolute",
          left: 90,
          top: 1130,
          opacity: enter(f, 29),
          transform: `translateY(${(1 - enter(f, 29)) * 24}px)`,
        }}
      >
        <Label style={{ color: "#00c4e8", marginBottom: 15 }}>
          COMPONENTES
        </Label>
        <AnimatedText delay={29} size={66}>
          EIGHTEEN SOUND
        </AnimatedText>
        <Label style={{ fontSize: 24, letterSpacing: 0, marginTop: 30 }}>
          Compensado naval multilaminado
        </Label>
        <Label style={{ fontSize: 15, marginTop: 34 }}>
          ESTUDO TÉCNICO / EIXOS 01 · 02 · 03
        </Label>
      </div>
    </Stage>
  );
};
