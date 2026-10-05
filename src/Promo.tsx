import { AbsoluteFill, Sequence, interpolate, useCurrentFrame } from "remotion";
import { FPS, theme } from "./theme";

// Scene timing matches the storyboard (seconds -> frames).
const scenes = [
  { seconds: 4, text: "Irregular periods. Acne. Weight gain. Stress." },
  { seconds: 5, text: "Five specialists. Five appointments. No plan." },
  { seconds: 6, text: "One coordinated PCOS care programme." },
  { seconds: 9, text: "Gynaecology · Nutrition · Therapy · Yoga · At-home testing" },
  { seconds: 6, text: "One team. One path forward. tvarvi.com" },
].map((s) => ({ ...s, frames: s.seconds * FPS }));

export const TOTAL_FRAMES = scenes.reduce((sum, s) => sum + s.frames, 0);

const Scene = ({ text, frames }: { text: string; frames: number }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 10, frames - 10, frames], [0, 1, 1, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  return (
    <AbsoluteFill
      style={{
        backgroundColor: theme.bg,
        color: theme.fg,
        fontFamily: theme.font,
        fontSize: 80,
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        padding: 160,
        opacity,
      }}
    >
      {text}
    </AbsoluteFill>
  );
};

export const Promo = () => {
  let from = 0;
  return (
    <>
      {scenes.map((s, i) => {
        const start = from;
        from += s.frames;
        return (
          <Sequence key={i} from={start} durationInFrames={s.frames}>
            <Scene text={s.text} frames={s.frames} />
          </Sequence>
        );
      })}
    </>
  );
};
