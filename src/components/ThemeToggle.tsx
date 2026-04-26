import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme-mode";

type Mode = "light" | "dark";

const applyTheme = (mode: Mode) => {
  const root = document.documentElement;
  if (mode === "dark") {
    root.style.setProperty("--background", "0 0% 4%");
    root.style.setProperty("--foreground", "0 0% 96%");
    root.style.setProperty("--card", "0 0% 7%");
    root.style.setProperty("--card-foreground", "0 0% 96%");
    root.style.setProperty("--popover", "0 0% 7%");
    root.style.setProperty("--popover-foreground", "0 0% 96%");
    root.style.setProperty("--primary", "0 0% 96%");
    root.style.setProperty("--primary-foreground", "0 0% 4%");
    root.style.setProperty("--secondary", "0 0% 9%");
    root.style.setProperty("--secondary-foreground", "0 0% 96%");
    root.style.setProperty("--muted", "0 0% 12%");
    root.style.setProperty("--muted-foreground", "0 0% 60%");
    root.style.setProperty("--accent", "0 0% 14%");
    root.style.setProperty("--accent-foreground", "0 0% 96%");
    root.style.setProperty("--border", "0 0% 15%");
    root.style.setProperty("--input", "0 0% 15%");
    root.style.setProperty("--ring", "0 0% 96%");
    root.style.setProperty("--page-bg", "#0a0a0a");
    root.style.setProperty("--page-fg", "hsl(0 0% 96%)");
  } else {
    root.style.setProperty("--background", "40 20% 96%");
    root.style.setProperty("--foreground", "0 0% 8%");
    root.style.setProperty("--card", "0 0% 100%");
    root.style.setProperty("--card-foreground", "0 0% 8%");
    root.style.setProperty("--popover", "0 0% 100%");
    root.style.setProperty("--popover-foreground", "0 0% 8%");
    root.style.setProperty("--primary", "0 0% 8%");
    root.style.setProperty("--primary-foreground", "40 20% 96%");
    root.style.setProperty("--secondary", "40 15% 92%");
    root.style.setProperty("--secondary-foreground", "0 0% 8%");
    root.style.setProperty("--muted", "40 15% 90%");
    root.style.setProperty("--muted-foreground", "0 0% 40%");
    root.style.setProperty("--accent", "40 15% 88%");
    root.style.setProperty("--accent-foreground", "0 0% 8%");
    root.style.setProperty("--border", "40 10% 85%");
    root.style.setProperty("--input", "40 10% 85%");
    root.style.setProperty("--ring", "0 0% 8%");
    root.style.setProperty("--page-bg", "hsl(40 20% 96%)");
    root.style.setProperty("--page-fg", "hsl(0 0% 8%)");
  }
  root.dataset.theme = mode;
};

export const ThemeToggle = () => {
  const [mode, setMode] = useState<Mode>("light");

  useEffect(() => {
    const saved = (localStorage.getItem(STORAGE_KEY) as Mode) || "light";
    setMode(saved);
    applyTheme(saved);
  }, []);

  const toggle = () => {
    const next: Mode = mode === "light" ? "dark" : "light";
    setMode(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Prepnúť tému"
      className="inline-flex items-center justify-center w-7 h-7 rounded-full transition-opacity hover:opacity-70"
      style={{ color: "var(--page-fg, currentColor)" }}
    >
      {mode === "light" ? (
        <Moon className="w-4 h-4" strokeWidth={1.5} />
      ) : (
        <Sun className="w-4 h-4" strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
