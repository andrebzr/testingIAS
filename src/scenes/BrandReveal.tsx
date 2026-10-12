import { useCurrentFrame } from "remotion";
import { Stage } from "../components/Stage";
import { Logo } from "../components/Logo";
import { AnimatedText, Label } from "../components/AnimatedText";
import { enter } from "../utils/animations";
export const BrandReveal = ({ logo }: { logo: boolean }) => {
  const f = useCurrentFrame(),
    t = enter(f, 0, 20);
  return (
    <Stage duration={60} index="02" name="IDENTIDADE">
      <div
        style={{
          position: "absolute",
          top: 470,
          left: 90,
          clipPath: `inset(0 ${(1 - t) * 100}% 0 0)`,
          transform: `translateX(${(1 - t) * -40}px)`,
        }}
      >
        <Logo image={logo} width={440} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 920,
          left: 90,
          right: 90,
          transform: `scale(${1 + f * 0.00025})`,
          transformOrigin: "left center",
        }}
      >
        <AnimatedText size={49} delay={8} style={{ marginBottom: 15 }}>
          SOM QUE
        </AnimatedText>
        <AnimatedText size={132} delay={12}>
          MOVE
        </AnimatedText>
        <AnimatedText size={132} delay={15} color="#00c4e8">
          VOCÊ.
        </AnimatedText>
        <Label style={{ marginTop: 40 }}>POTÊNCIA COM PROPÓSITO.</Label>
      </div>
      <div
        style={{
          position: "absolute",
          left: 710,
          top: 390,
          height: 350,
          width: 1,
          background: "linear-gradient(transparent,#00c4e8,transparent)",
          opacity: t * 0.5,
        }}
      />
    </Stage>
  );
};
