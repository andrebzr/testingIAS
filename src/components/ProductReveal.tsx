import { Img, staticFile, useCurrentFrame } from "remotion";
import { enter, settle } from "../utils/animations";
import { LightSweep } from "./LightSweep";

// Procedural engineering studies, deliberately not presented as product photographs.
const Cabinet = ({ sub }: { sub: boolean }) => (
  <svg viewBox="0 0 900 700" width="100%" height="100%">
    <defs>
      <linearGradient id="front" x2="0.8" y2="1">
        <stop stopColor="#293139" />
        <stop offset=".4" stopColor="#10171c" />
        <stop offset="1" stopColor="#05090d" />
      </linearGradient>
      <linearGradient id="side">
        <stop stopColor="#1d272e" />
        <stop offset="1" stopColor="#060a0e" />
      </linearGradient>
      <radialGradient id="cone">
        <stop stopColor="#070a0d" />
        <stop offset=".28" stopColor="#0b1015" />
        <stop offset=".73" stopColor="#202a30" />
        <stop offset=".9" stopColor="#090d12" />
        <stop offset="1" stopColor="#303b42" />
      </radialGradient>
      <pattern id="grille" width="10" height="10" patternUnits="userSpaceOnUse">
        <circle cx="5" cy="5" r="3.4" fill="#030607" />
        <circle
          cx="5"
          cy="5"
          r="3.4"
          fill="none"
          stroke="#52616a"
          strokeOpacity=".24"
          strokeWidth=".65"
        />
      </pattern>
      <linearGradient id="sheen">
        <stop stopColor="#adc7d7" stopOpacity=".16" />
        <stop offset=".5" stopColor="#adc7d7" stopOpacity="0" />
        <stop offset="1" stopColor="#adc7d7" stopOpacity=".06" />
      </linearGradient>
    </defs>
    <ellipse cx="452" cy="623" rx="347" ry="29" fill="#000" opacity=".6" />
    <g transform={sub ? "translate(30 0)" : "translate(0 20)"}>
      <path
        d={
          sub
            ? "M115 173L671 140L785 210L785 541L671 602L115 562Z"
            : "M88 228L658 177L800 257L766 481L665 553L100 493Z"
        }
        fill="url(#side)"
        stroke="#42505a"
        strokeWidth="2"
      />
      <path
        d={
          sub
            ? "M115 173L671 140L671 602L115 562Z"
            : "M88 228L658 177L665 553L100 493Z"
        }
        fill="url(#front)"
        stroke="#4b5d67"
        strokeWidth="2"
      />
      <g
        transform={
          sub
            ? "matrix(1,-.06,0,1,135,195)"
            : "matrix(1,-.075,.025,.70,107,252)"
        }
      >
        <rect width="514" height="345" rx="6" fill="#090d11" />
        {[139, 380].map((cx) => (
          <g key={cx}>
            <circle
              cx={cx}
              cy="172"
              r={sub ? 119 : 112}
              fill="url(#cone)"
              stroke="#3b4750"
              strokeWidth="3"
            />
            {[0.88, 0.78, 0.68, 0.58].map((s) => (
              <circle
                key={s}
                cx={cx}
                cy="172"
                r={(sub ? 119 : 112) * s}
                fill="none"
                stroke="#020407"
                strokeWidth="2"
                opacity=".6"
              />
            ))}
            <circle cx={cx} cy="172" r="43" fill="#060a0e" stroke="#283038" />
          </g>
        ))}
        {!sub && (
          <path
            d="M241 58h36l13 75v100l-13 65h-36l-13-65V133Z"
            fill="#020507"
            stroke="#303d45"
          />
        )}
        <rect
          width="514"
          height="345"
          rx="6"
          fill="url(#grille)"
          opacity=".80"
        />
        <rect width="514" height="345" rx="6" fill="url(#sheen)" />
      </g>
      <path
        d={
          sub
            ? "M690 192L755 225L755 516L693 551Z"
            : "M681 237L773 277L750 461L686 507Z"
        }
        fill="#121a20"
        stroke="#33434d"
      />
      <path
        d={sub ? "M711 296l24 6v109l-24 7Z" : "M702 321l35 10-8 72-27 11Z"}
        fill="#020508"
        stroke="#00c4e8"
        strokeOpacity=".65"
        strokeWidth="2"
      />
      <path
        d={sub ? "M115 173L671 140L785 210" : "M88 228L658 177L800 257"}
        stroke="#7a8d97"
        strokeOpacity=".56"
        fill="none"
        strokeWidth="2"
      />
      <path
        d={sub ? "M121 557L665 596" : "M105 490L660 548"}
        stroke="#00c4e8"
        strokeWidth="2"
        strokeOpacity=".75"
      />
      {[0, 1, 2, 3].map((i) => (
        <circle
          key={i}
          cx={sub ? (i % 2 ? 655 : 129) : i % 2 ? 647 : 105}
          cy={sub ? (i < 2 ? 190 : 546) : i < 2 ? 244 : 478}
          r="4"
          fill="#a1aab0"
        />
      ))}
      <path
        d={sub ? "M360 548h67" : "M355 467h67"}
        stroke="#00c4e8"
        strokeWidth="4"
      />
    </g>
  </svg>
);
export const ProductReveal = ({
  product,
  hasImage = false,
}: {
  product: "vr210" | "sw218";
  hasImage?: boolean;
}) => {
  const f = useCurrentFrame(),
    t = settle(f),
    reveal = enter(f, 0, 22);
  return (
    <div
      style={{
        width: 1000,
        height: 660,
        position: "relative",
        transform: `translate(${Math.sin(f * 0.028) * 5}px,${(1 - t) * 65}px) scale(${0.91 + t * 0.09 + f * 0.00022})`,
        opacity: reveal,
        clipPath: `inset(0 ${(1 - reveal) * 100}% 0 0)`,
        filter: `drop-shadow(0 32px 28px #000) blur(${(1 - reveal) * 8}px)`,
      }}
    >
      {hasImage ? (
        <Img
          src={staticFile(`products/${product}.png`)}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            maskImage:
              "radial-gradient(ellipse at 50% 48%,black 42%,transparent 76%)",
          }}
        />
      ) : (
        <Cabinet sub={product === "sw218"} />
      )}
      <LightSweep />
    </div>
  );
};
