import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { exit } from "../utils/animations";
import { Label } from "./AnimatedText";
export const Stage: React.FC<{
  children: React.ReactNode;
  duration: number;
  index: string;
  name: string;
}> = ({ children, duration, index, name }) => (
  <AbsoluteFill style={{ opacity: exit(useCurrentFrame(), duration) }}>
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 246,
        right: 90,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Label style={{ fontSize: 17, letterSpacing: 2 }}>
        VR AUDIO / {name}
      </Label>
      <Label style={{ fontSize: 17, color: "#00c4e8" }}>{index} / 06</Label>
    </div>
    {children}
    <div
      style={{
        position: "absolute",
        left: 90,
        top: 1548,
        right: 90,
        display: "flex",
        justifyContent: "space-between",
        borderTop: "1px solid #263139",
        paddingTop: 16,
      }}
    >
      <Label style={{ fontSize: 15, letterSpacing: 2 }}>
        ENGENHARIA EM CADA FREQUÊNCIA
      </Label>
      <Label style={{ fontSize: 15, color: "#00c4e8" }}>BRASIL</Label>
    </div>
  </AbsoluteFill>
);
