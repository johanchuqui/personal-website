"use client";

import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "./icons";
import { NavLinks } from "./NavLinks";

// Hamburger menu shown on small screens only (md:hidden).
export function MobileMenu() {
  const [open, setOpen] = useState(false);

  // Close the menu with the Escape key.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="mobile-nav"
        aria-label={open ? "Close menu" : "Open menu"}
        className="text-muted hover:bg-border/60 hover:text-fg rounded-md p-2"
      >
        {open ? <CloseIcon /> : <MenuIcon />}
      </button>
      {open && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-border bg-bg absolute inset-x-0 top-full border-b px-4 py-3 shadow-sm"
        >
          <NavLinks vertical onNavigate={() => setOpen(false)} />
        </nav>
      )}
    </div>
  );
}
