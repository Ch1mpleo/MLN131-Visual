import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navigate } from "@/lib/router";

const SECTIONS = [
  { id: "hero", label: "Mở đầu", year: "Intro" },
  { id: "terminology", label: "Thuật ngữ", year: "I" },
  { id: "viewpoints", label: "Quan niệm", year: "II" },
  { id: "timeline", label: "Lịch sử", year: "III" },
  { id: "conclusion", label: "Kết luận", year: "KL" },
];

export default function Nav() {
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  /** Transparent nav over dark sections (hero, timeline) needs light text */
  const onDarkBackdrop = !scrolled && (active === "hero" || active === "timeline");

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-cream/95 backdrop-blur border-b-2 border-ink"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto max-w-7xl px-4 md:px-8 py-4 flex items-center justify-between gap-6">
        <a href="#hero" className="flex items-center gap-3 group">
          <span className="relative inline-grid h-9 w-9 place-items-center bg-blood">
            <svg viewBox="0 0 64 64" className="h-6 w-6">
              <polygon
                points="32,10 38.6,27.2 57,27.2 42.2,37.9 47.8,55.4 32,44.7 16.2,55.4 21.8,37.9 7,27.2 25.4,27.2"
                fill="#FFCD00"
              />
            </svg>
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span
              className={cn(
                "font-headline text-base tracking-tight uppercase transition-colors",
                onDarkBackdrop ? "text-cream" : "text-ink",
              )}
            >
              DÂN CHỦ
            </span>
            <span
              className={cn(
                "font-mono text-[10px] tracking-[0.25em] uppercase transition-colors",
                onDarkBackdrop ? "text-cream/65" : "text-ink/60",
              )}
            >
              Lý luận chính trị
            </span>
          </span>
        </a>

        <ul
          className={cn(
            "hidden md:flex items-stretch gap-0 border-l-2",
            onDarkBackdrop ? "border-cream/25" : "border-ink",
          )}
        >
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <li
                key={s.id}
                className={cn("border-r-2", onDarkBackdrop ? "border-cream/25" : "border-ink")}
              >
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "group flex flex-col px-4 py-2 transition-colors",
                    isActive
                      ? "bg-blood text-cream"
                      : onDarkBackdrop
                        ? "text-cream/85 hover:bg-cream/10"
                        : "text-ink hover:bg-ink/10",
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] uppercase opacity-70">
                    {s.year}
                  </span>
                  <span className="font-headline text-[0.95rem] uppercase tracking-tight">
                    {s.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>

        <a
          href="#conclusion"
          className="hidden lg:inline-flex items-center gap-2 bg-blood text-cream px-5 py-2.5 font-headline text-sm uppercase tracking-wide shadow-[3px_3px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform"
        >
          <span className="h-1.5 w-1.5 bg-flagYellow animate-pulse" />
          Kết luận →
        </a>
      </div>
    </nav>
  );
}
