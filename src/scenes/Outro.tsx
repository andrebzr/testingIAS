import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { AnimatedText, Label } from "../components/AnimatedText";
import { enter } from "../utils/animations";
export const Outro = ({ logo }: { logo: boolean }) => {
  const f = useCurrentFrame();
  return (
    <Stage duration={75} index="06" name="PRESENÇA DE PALCO">
      <div
        style={{ position: "absolute", top: 410, left: 90, opacity: enter(f) }}
      >
        <Logo image={logo} width={380} />
      </div>
      <div style={{ position: "absolute", top: 780, left: 90, right: 90 }}>
        <AnimatedText size={96} delay={4}>
          SOM QUE DOMINA
        </AnimatedText>
        <AnimatedText size={96} delay={7}>
          QUALQUER
        </AnimatedText>
        <AnimatedText size={132} color="#00c4e8" delay={10}>
          PALCO.
        </AnimatedText>
        <Label style={{ fontSize: 19, letterSpacing: 1, marginTop: 32 }}>
          LINE ARRAY • SUBWOOFERS
        </Label>
        <Label style={{ fontSize: 19, letterSpacing: 1, marginTop: 7 }}>
          SISTEMAS PROFISSIONAIS
        </Label>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1305,
          left: 90,
          opacity: enter(f, 16),
        }}
      >
        <Label style={{ color: "#00c4e8", fontSize: 19, marginBottom: 15 }}>
          CONHEÇA A VR AUDIO
        </Label>
        <div
          data-safe-text
          style={{ fontSize: 49, fontWeight: 900, letterSpacing: -1 }}
        >
          vraudio.com.br
        </div>
        <Label style={{ fontSize: 24, marginTop: 16, letterSpacing: 2 }}>
          @VRAUDIO1
        </Label>
      </div>
      <div
        style={{
          position: "absolute",
          top: 1500,
          left: `${-1100 + enter(f, 60, 9) * 2400}px`,
          width: 1000,
          height: 2,
          background: "linear-gradient(90deg,transparent,#00c4e8,transparent)",
        }}
      />
    </Stage>
  );
};
