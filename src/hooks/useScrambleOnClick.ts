import { useEffect } from "react";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*<>/=+-?";

const scrambleNode = (node: HTMLElement, duration = 600) => {
  // Collect text nodes (so we don't break icons/children elements)
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);
  const items: { node: Text; text: string }[] = [];
  let n: Node | null;
  while ((n = walker.nextNode())) {
    const t = n as Text;
    const txt = t.nodeValue ?? "";
    if (txt.trim().length > 0) items.push({ node: t, text: txt });
  }
  if (!items.length) return;

  const start = performance.now();
  const tick = () => {
    const elapsed = performance.now() - start;
    const progress = Math.min(1, elapsed / duration);
    items.forEach(({ node, text }) => {
      const revealCount = Math.floor(progress * text.length);
      let out = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < revealCount || ch === " " || ch === "\n") {
          out += ch;
        } else {
          out += CHARS[Math.floor(Math.random() * CHARS.length)];
        }
      }
      node.nodeValue = out;
    });
    if (progress < 1) requestAnimationFrame(tick);
    else items.forEach(({ node, text }) => (node.nodeValue = text));
  };
  requestAnimationFrame(tick);
};

export const useScrambleOnClick = () => {
  useEffect(() => {
    // 1) Initial scramble of all interactive elements on mount
    const initial = document.querySelectorAll<HTMLElement>(
      'a, button, [data-scramble]'
    );
    initial.forEach((el, i) => {
      setTimeout(() => scrambleNode(el, 500), i * 25);
    });

    // 2) Click listener — scramble the clicked interactive target
    const onClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest(
        'a, button, [data-scramble]'
      ) as HTMLElement | null;
      if (target) scrambleNode(target, 500);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
};

export default useScrambleOnClick;
