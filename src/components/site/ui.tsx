import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

// Small shared building blocks so pages look consistent.

// Page title with a terminal-style path above it, e.g. "~/about".
export function PageHeader({
  path,
  title,
  children,
}: {
  path: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <header className="mb-10 space-y-3">
      <p className="text-accent font-mono text-sm">~/{path}</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h1>
      {children && (
        <div className="text-muted max-w-2xl text-lg">{children}</div>
      )}
    </header>
  );
}

// Section heading with a mono "#" prefix.
export function SectionHeading({
  id,
  children,
}: {
  id?: string;
  children: ReactNode;
}) {
  return (
    <h2 id={id} className="mb-4 text-xl font-semibold tracking-tight">
      <span aria-hidden="true" className="text-accent mr-2 font-mono">
        #
      </span>
      {children}
    </h2>
  );
}

const buttonStyles = {
  primary: "bg-accent text-accent-fg hover:opacity-90",
  secondary: "border border-border text-fg hover:bg-border/60",
};

// A link styled as a button. Use for internal pages (Next.js Link).
export function ButtonLink({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<typeof Link> & { variant?: keyof typeof buttonStyles }) {
  return (
    <Link
      {...props}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm font-medium transition ${buttonStyles[variant]} ${className}`}
    />
  );
}

// Same look, for plain <a> links (files like the résumé, external sites).
export function ButtonAnchor({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"a"> & { variant?: keyof typeof buttonStyles }) {
  return (
    <a
      {...props}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 font-mono text-sm font-medium transition ${buttonStyles[variant]} ${className}`}
    />
  );
}

// Placeholder for sections that arrive in later milestones.
export function ComingSoon({ what }: { what: string }) {
  return (
    <div className="border-border text-muted rounded-xl border border-dashed p-8 font-mono text-sm">
      <p>
        <span className="text-accent">$</span> ls ./{what}
      </p>
      <p className="mt-2">Nothing here yet — {what} are coming soon.</p>
    </div>
  );
}
