import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { navigate } from "@/lib/router";

const SECTIONS = [
  { id: "hero", label: "Mở đầu", year: "1945" },
  { id: "context", label: "Bối cảnh", year: "Pre" },
  { id: "struggle", label: "Ba giặc", year: "1945–46" },
  { id: "resistance", label: "Kháng chiến", year: "1946–50" },
  { id: "victory", label: "Điện Biên Phủ", year: "1951–54" },
  { id: "lessons", label: "Bài học", year: "Nay" },
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
            <span className="font-headline text-base tracking-tight uppercase text-ink">
              VNR · 1945–1954
            </span>
            <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-ink/60">
              Interactive Archive
            </span>
          </span>
        </a>

        <ul className="hidden md:flex items-stretch gap-0 border-l-2 border-ink">
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <li key={s.id} className="border-r-2 border-ink">
                <a
                  href={`#${s.id}`}
                  className={cn(
                    "group flex flex-col px-4 py-2 transition-colors",
                    isActive ? "bg-ink text-cream" : "hover:bg-ink/10",
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

        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            navigate("/game");
          }}
          className="hidden lg:inline-flex items-center gap-2 bg-blood text-cream px-5 py-2.5 font-headline text-sm uppercase tracking-wide shadow-[3px_3px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform"
        >
          <span className="h-1.5 w-1.5 bg-flagYellow animate-pulse" />
          Chơi ghép nối →
        </button>
      </div>
    </nav>
  );
}
