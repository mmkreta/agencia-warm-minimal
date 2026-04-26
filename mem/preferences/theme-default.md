---
name: Theme default
description: Default theme on load and after refresh must always be dark (black). Light is optional.
type: preference
---
The site's default mode is dark/black. On every page load and refresh, the theme must initialize to dark unless the user explicitly toggled light mode (and even then, dark remains the documented default).

**Why:** User stated this explicitly multiple times.
**How to apply:** In `ThemeToggle.tsx`, keep `useState<Mode>("dark")` and the `|| "dark"` fallback when reading localStorage. Never default to system preference or light.
