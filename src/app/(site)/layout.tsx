import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";

// Shared layout for all public pages: skip link, header, main, footer.
export default function SiteLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <a
        href="#main"
        className="bg-accent text-accent-fg sr-only z-50 rounded-md px-3 py-2 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Skip to content
      </a>
      <Header />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-5xl flex-1 px-4 py-12 outline-none sm:px-6 sm:py-16"
      >
        {children}
      </main>
      <Footer />
    </>
  );
}
