import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { AnimatedText, Label } from "../components/AnimatedText";
import { Waveform } from "../components/Waveform";
import { BassPulse } from "../components/BassPulse";
import { enter } from "../utils/animations";
export const Intro = () => {
  const f = useCurrentFrame();
  return (
    <Stage duration={60} index="01" name="SINAL">
      <div
        style={{
          position: "absolute",
          top: 590,
          left: 100,
          opacity: enter(f, 3, 12),
        }}
      >
        <Waveform
          height={330}
          intensity={enter(f, 5) * (0.6 + 0.4 * Math.sin(f * 0.13) ** 2)}
        />
      </div>
      <div style={{ position: "absolute", left: 90, top: 1030 }}>
        <Label style={{ color: "#00c4e8", marginBottom: 24 }}>
          ANTES DO SOM. A ENGENHARIA.
        </Label>
        {f < 31 ? (
          <AnimatedText delay={8} size={107}>
            PRECISÃO.
          </AnimatedText>
        ) : (
          <AnimatedText key="power" delay={31} size={107}>
            POTÊNCIA.
          </AnimatedText>
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: 910,
          left: 100,
          width: 880,
          height: 1,
          background: "#263139",
        }}
      />
      {f > 29 && <BassPulse offset={30} />}
    </Stage>
  );
};
