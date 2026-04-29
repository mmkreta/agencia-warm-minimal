import { useEffect, useRef, useState } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>/=+-?";

interface Props {
  children: string;
  className?: string;
  duration?: number;
  trigger?: "mount" | "hover" | "both";
  as?: keyof JSX.IntrinsicElements;
}

export const ScrambleText = ({
  children,
  className,
  duration = 600,
  trigger = "mount",
  as: Tag = "span",
}: Props) => {
  const [text, setText] = useState(children);
  const frame = useRef(0);
  const raf = useRef<number>();

  const scramble = () => {
    if (raf.current) cancelAnimationFrame(raf.current);
    const target = children;
    const start = performance.now();
    const totalFrames = Math.max(1, Math.round(duration / 16));
    frame.current = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const progress = Math.min(1, elapsed / duration);
      const revealCount = Math.floor(progress * target.length);
      let out = "";
      for (let i = 0; i < target.length; i++) {
        const ch = target[i];
        if (i < revealCount || ch === " ") {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      setText(out);
      frame.current++;
      if (progress < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        setText(target);
      }
    };
    raf.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    if (trigger === "mount" || trigger === "both") scramble();
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  const handleEnter = () => {
    if (trigger === "hover" || trigger === "both") scramble();
  };

  return (
    <Tag className={className} onMouseEnter={handleEnter as any} onClick={scramble as any}>
      {text}
    </Tag>
  );
};

export default ScrambleText;
