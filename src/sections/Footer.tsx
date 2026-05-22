import StampTag from "@/components/ui/StampTag";

export default function Footer() {
  return (
    <footer className="relative bg-ink text-cream py-16 border-t-4 border-blood overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10 grid grid-cols-1 md:grid-cols-12 gap-10">
        <div className="md:col-span-6 flex flex-col gap-5">
          <StampTag tone="red">Credits</StampTag>
          <h3 className="headline uppercase text-4xl md:text-5xl leading-tight">
            NƯỚC VIỆT NAM LÀ MỘT
          </h3>
          <p className="serif text-cream/80 max-w-xl italic leading-relaxed">
            Bảo tàng Kỹ thuật số Tương tác — biên khảo lịch sử Cách mạng Việt
            Nam 1945–1954 theo phong cách Revolutionary Constructivist. Chạy
            trên React, TailwindCSS &amp; ReactBits.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "React",
              "TailwindCSS",
              "ReactBits",
              "GSAP",
            ].map((t) => (
              <span
                key={t}
                className="font-mono text-[10px] uppercase tracking-[0.25em] border border-cream/40 px-2 py-1"
              >
                {t}
              </span>
            ))}
          </div>

          {/* Author credit */}
          <div className="flex items-center gap-3 pt-1">
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50">
              Made by
            </span>
            <a
              href="https://github.com/Ch1mpleo"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 bg-blood border-2 border-blood px-3 py-1.5 shadow-[4px_4px_0_#F5F5DC] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#F5F5DC] transition-all duration-200"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-4 h-4 fill-cream shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.385-1.335-1.755-1.335-1.755-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span className="font-headline text-sm uppercase tracking-wide text-cream">
                Ch1mpleo
              </span>
            </a>
          </div>
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
            Chương mục
          </span>
          {[
            { id: "hero", t: "Mở đầu" },
            { id: "context", t: "Bối cảnh" },
            { id: "struggle", t: "Ba giặc (45–46)" },
            { id: "resistance", t: "Kháng chiến (46–50)" },
            { id: "victory", t: "Điện Biên Phủ" },
            { id: "lessons", t: "Bốn bài học" },
          ].map((x) => (
            <a
              key={x.id}
              href={`#${x.id}`}
              className="font-headline uppercase text-sm text-cream/90 hover:text-blood transition-colors"
            >
              → {x.t}
            </a>
          ))}
        </div>

        <div className="md:col-span-3 flex flex-col gap-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
            Nguồn &amp; Kiểm chứng
          </span>
          <p className="serif text-sm text-cream/85 leading-relaxed">
            Giáo trình Lịch sử Đảng Cộng sản Việt Nam. Báo cáo thường niên FPT
            2025. Tư liệu ảnh: tư liệu công cộng (Public Domain).
          </p>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/60 mt-2">
            VNR202 · Học kỳ 9 · 2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-10 mt-12 pt-6 border-t border-cream/20 flex flex-wrap items-center justify-between gap-4">
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/60">
          © 2026 · Interactive Archive.
        </p>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-blood animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70">
            Dĩ bất biến · Ứng vạn biến
          </span>
        </div>
      </div>
    </footer>
  );
}
