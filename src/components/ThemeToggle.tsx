import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const STORAGE_KEY = "theme-mode";
type Mode = "light" | "dark";

const applyTheme = (mode: Mode) => {
  const root = document.documentElement;
  root.dataset.theme = mode;
  if (mode === "light") {
    root.style.filter = "invert(1) hue-rotate(180deg)";
    root.style.background = "#fff";
  } else {
    root.style.filter = "";
    root.style.background = "";
  }
};

export const ThemeToggle = () => {
  const [mode, setMode] = useState<Mode>("dark");

  useEffect(() => {
    localStorage.removeItem(STORAGE_KEY);
    setMode("dark");
    applyTheme("dark");
  }, []);

  const toggle = () => {
    const next: Mode = mode === "dark" ? "light" : "dark";
    setMode(next);
    applyTheme(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label="Prepnúť tému"
      className="inline-flex items-center justify-center w-7 h-7 transition-opacity hover:opacity-70"
    >
      {mode === "dark" ? (
        <Sun className="w-4 h-4" strokeWidth={1.5} />
      ) : (
        <Moon className="w-4 h-4" strokeWidth={1.5} />
      )}
    </button>
  );
};

export default ThemeToggle;
