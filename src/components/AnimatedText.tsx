import React from "react";
import { useCurrentFrame } from "remotion";
import { enter } from "../utils/animations";
import { colors } from "../theme/colors";
import { typography } from "../theme/typography";
export const AnimatedText: React.FC<{
  children: React.ReactNode;
  delay?: number;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({ children, delay = 0, size = 88, color = colors.white, style }) => {
  const t = enter(useCurrentFrame(), delay);
  return (
    <div data-safe-text style={{ overflow: "hidden", ...style }}>
      <div
        style={{
          fontSize: size,
          fontFamily: typography.display,
          lineHeight: 1.03,
          fontWeight: 900,
          color,
          letterSpacing: -size * 0.045,
          transform: `translateY(${(1 - t) * 110}%)`,
          filter: `blur(${(1 - t) * 5}px)`,
          opacity: t,
        }}
      >
        {children}
      </div>
    </div>
  );
};
export const Label: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    data-safe-text
    style={{
      fontFamily: typography.technical,
      fontSize: 21,
      letterSpacing: 3,
      color: colors.muted,
      lineHeight: 1.4,
      ...style,
    }}
  >
    {children}
  </div>
);
