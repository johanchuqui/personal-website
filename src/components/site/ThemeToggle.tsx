"use client";

import { MoonIcon, SunIcon } from "./icons";

// Flips the "dark" class on <html> and remembers the choice.
// Both icons are always rendered; CSS shows the right one, so the server and
// browser HTML always match (no hydration mismatch, no flash).
export function ThemeToggle() {
  function toggle() {
    const isDark = document.documentElement.classList.toggle("dark");
    try {
      localStorage.setItem("theme", isDark ? "dark" : "light");
    } catch {
      // Storage can be blocked (e.g. private mode); the toggle still works.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle dark mode"
      className="text-muted hover:bg-border/60 hover:text-fg rounded-md p-2 transition-colors"
    >
      <SunIcon className="hidden dark:block" />
      <MoonIcon className="block dark:hidden" />
    </button>
  );
}
