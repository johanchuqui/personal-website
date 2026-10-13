"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// The list of nav links. `vertical` is used inside the mobile menu.
export function NavLinks({
  vertical = false,
  onNavigate,
}: {
  vertical?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();

  return (
    <ul
      className={vertical ? "flex flex-col gap-1" : "flex items-center gap-1"}
    >
      {nav.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              onClick={onNavigate}
              aria-current={active ? "page" : undefined}
              className={`block rounded-md px-3 py-2 font-mono text-sm transition-colors ${
                active
                  ? "text-accent"
                  : "text-muted hover:bg-border/60 hover:text-fg"
              }`}
            >
              <span aria-hidden="true" className="text-accent/70">
                ./
              </span>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
