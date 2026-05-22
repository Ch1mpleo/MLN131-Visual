import RotatingText from "@/components/RotatingText";
import StampTag from "@/components/ui/StampTag";
import { navigate } from "@/lib/router";

// ─── HERO BACKGROUND IMAGE ────────────────────────────────────────────────────
// Replace the URL below to change the hero background photo.
const HERO_BG =
  "https://i.pinimg.com/1200x/e0/49/39/e049394d85dbd2074531ac054285acbe.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[580px] overflow-hidden"
    >
      {/* Background image */}
      <img
        src={HERO_BG}
        alt="Lá cờ Tổ quốc Việt Nam"
        className="absolute inset-0 h-full w-full object-cover object-center"
        loading="eager"
      />

      {/* Dark overlay — left heavier for text, right lightens to reveal image */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/85 via-ink/70 to-ink/45" />
      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-ink/80 to-transparent" />

      {/* Content */}
      <div className="relative h-full mx-auto max-w-7xl px-5 md:px-10 flex flex-col justify-between pt-20 pb-5">
        {/* Main grid */}
        <div className="flex-1 grid grid-cols-12 gap-4 md:gap-6 items-center py-4">
          {/* ── Left: Title ── */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <StampTag tone="red" rotate={-2} className="text-[10px] md:text-xs">
                Bảo tàng Kỹ thuật số
              </StampTag>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cream/70">
                VNR202 · Lịch sử Đảng
              </span>
            </div>

            <div>
              <h1 className="headline text-[clamp(2.2rem,6vw,5rem)] text-cream block">
                NƯỚC VIỆT NAM
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="headline text-[clamp(2.2rem,6vw,5rem)] text-blood">
                  LÀ MỘT
                </h1>
                <span className="h-2 w-16 md:w-28 bg-cream shrink-0" />
              </div>
            </div>

            <h2 className="headline text-[clamp(0.95rem,2.2vw,1.75rem)] text-cream/90 max-w-lg">
              DÂN TỘC VIỆT NAM LÀ MỘT
            </h2>

            <p className="serif text-sm md:text-base text-cream/80 max-w-sm leading-relaxed italic border-l-4 border-blood pl-4">
              "Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ
              thay đổi."
              <span className="block not-italic font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-cream/60 mt-1.5">
                — Hồ Chí Minh
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <a
                href="#context"
                className="bg-blood text-cream px-5 py-2.5 font-headline uppercase tracking-wide text-xs md:text-sm shadow-[3px_3px_0_#F5F5DC] hover:-translate-y-0.5 transition-transform"
              >
                Bước vào →
              </a>
              <a
                href="#lessons"
                className="border-2 border-cream/70 text-cream px-5 py-2.5 font-headline uppercase tracking-wide text-xs md:text-sm hover:bg-cream hover:text-ink transition-colors"
              >
                4 Bài học
              </a>
              <button
                type="button"
                onClick={() => navigate("/game")}
                className="inline-flex items-center gap-2 bg-flagYellow text-ink px-5 py-2.5 font-headline uppercase tracking-wide text-xs md:text-sm shadow-[3px_3px_0_#D32F2F] hover:-translate-y-0.5 transition-transform border-2 border-ink"
              >
                <span className="h-1.5 w-1.5 bg-blood animate-pulse" />
                Chơi ghép nối
              </button>
            </div>
          </div>

          {/* ── Right: Callout panel ── */}
          <div className="col-span-12 md:col-span-5 flex flex-col gap-4">
            {/* Mission card */}
            <div className="bg-ink/80 backdrop-blur-sm text-cream p-5 md:p-6 border border-cream/20 shadow-[6px_6px_0_#D32F2F]">
              <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-[0.3em] opacity-70 mb-3.5">
                Khẩu hiệu 03/09/1945 — Ba nhiệm vụ cấp bách
              </div>
              <div className="font-headline text-2xl md:text-3xl leading-[1.1] uppercase flex flex-wrap items-baseline gap-x-2.5">
                <span>Diệt giặc</span>
                <RotatingText
                  texts={["đói", "dốt", "ngoại xâm"]}
                  mainClassName="inline-flex overflow-hidden bg-blood text-cream px-2.5 py-0.5"
                  staggerFrom="last"
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  transition={{ type: "spring", damping: 30, stiffness: 380 }}
                  rotationInterval={2200}
                />
              </div>
              <div className="mt-4 h-[2px] bg-blood" />
              <p className="serif italic mt-3.5 text-cream/85 text-sm leading-relaxed">
                Chỉ ba mặt trận. Một vận mệnh. Chính phủ lâm thời triệu tập
                toàn dân tộc vào cuộc trường chinh chưa từng có.
              </p>
            </div>

            {/* 4 stats — 2×2 */}
            <div className="grid grid-cols-4 gap-2.5">
              <Stat value="1945" caption="CM Tháng Tám" />
              <Stat value="1954" caption="Giải phóng Bắc" />
              <Stat value="09" caption="năm kháng chiến" />
              <Stat value="56" caption="ngày Điện Biên" />
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex items-center justify-between gap-6 py-2 border-t border-cream/20">
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/60">
            <span className="h-1.5 w-1.5 bg-blood animate-pulse" />
            Ngàn cân treo sợi tóc
          </div>
          <div className="hidden md:flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.3em] text-cream/60">
            <span className="animate-bounce inline-block">↓</span>
            cuộn xuống
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, caption }: { value: string; caption: string }) {
  return (
    <div className="bg-cream/10 border border-cream/25 p-3 md:p-3.5 backdrop-blur-sm">
      <div className="font-headline text-2xl md:text-3xl leading-none text-cream">
        {value}
      </div>
      <div className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.18em] mt-2 text-cream/75 leading-tight">
        {caption}
      </div>
    </div>
  );
}
