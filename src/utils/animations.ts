import { Easing, interpolate, spring } from "remotion";
export const ease = Easing.bezier(0.16, 1, 0.3, 1);
export const enter = (frame: number, delay = 0, duration = 20) =>
  interpolate(frame, [delay, delay + duration], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
export const exit = (frame: number, duration: number) =>
  interpolate(frame, [duration - 8, duration], [1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
export const settle = (frame: number, delay = 0) =>
  spring({
    frame: frame - delay,
    fps: 30,
    config: { damping: 24, stiffness: 110, mass: 1.1 },
  });
