import Noise from "@/components/Noise";
import ClickSpark from "@/components/ClickSpark";
import RotatingText from "@/components/RotatingText";
import StampTag from "@/components/ui/StampTag";
import HistoricPhoto from "@/components/ui/HistoricPhoto";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative h-[100svh] min-h-[580px] overflow-hidden bg-ink"
    >
      {/* Animated grain overlay */}
      <Noise patternAlpha={18} patternRefreshInterval={2} />

      {/* Red constructivist top band */}
      <div className="absolute top-0 inset-x-0 h-1 bg-blood z-10" />

      {/* Content */}
      <div className="relative z-10 h-full mx-auto max-w-7xl px-5 md:px-10 flex flex-col justify-between pt-20 pb-6">
        <div className="flex-1 grid grid-cols-12 gap-4 md:gap-8 items-center">

          {/* ── Left: Title ── */}
          <div className="col-span-12 md:col-span-7 flex flex-col gap-3 md:gap-4">
            <div className="flex items-center gap-3">
              <StampTag tone="red" rotate={-2} className="text-[10px] md:text-xs">
                Lý luận chính trị
              </StampTag>
              <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cream/60">
                CNML01 · Dân chủ &amp; Pháp luật
              </span>
            </div>

            <div>
              <h1 className="headline text-[clamp(2.5rem,6.5vw,5.5rem)] text-cream leading-none block">
                DÂN CHỦ
              </h1>
              <div className="flex items-center gap-3 mt-1">
                <h1 className="headline text-[clamp(2.5rem,6.5vw,5.5rem)] text-blood leading-none">
                  LÀ GÌ?
                </h1>
                <span className="h-[3px] flex-1 max-w-[8rem] bg-cream/40" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] md:text-xs tracking-[0.25em] uppercase text-cream/50">
                Là quyền của
              </span>
              <RotatingText
                texts={["NHÂN DÂN", "QUYỀN LỰC", "TỰ DO", "BÌNH ĐẲNG"]}
                mainClassName="headline text-blood text-lg md:text-2xl"
                rotationInterval={2500}
                staggerFrom="last"
                initial={{ y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 300 }}
              />
            </div>

            <p className="serif text-sm md:text-base text-cream/80 max-w-sm leading-relaxed italic border-l-4 border-blood pl-4">
              "Dân chủ là dân là chủ và dân làm chủ."
              <span className="block not-italic font-mono text-[9px] md:text-[10px] tracking-widest uppercase text-cream/50 mt-1.5">
                — Hồ Chí Minh
              </span>
            </p>

            <div className="flex flex-wrap items-center gap-3 mt-1">
              <ClickSpark sparkColor="#D32F2F" sparkCount={10} sparkRadius={28}>
                <a
                  href="#terminology"
                  className="bg-blood text-cream px-5 py-2.5 font-headline uppercase tracking-wide text-xs md:text-sm shadow-[3px_3px_0_#F5F5DC] hover:-translate-y-0.5 transition-transform inline-block"
                >
                  Tìm hiểu ngay →
                </a>
              </ClickSpark>
              <a
                href="#timeline"
                className="border-2 border-cream/60 text-cream px-5 py-2.5 font-headline uppercase tracking-wide text-xs md:text-sm hover:bg-cream hover:text-ink transition-colors"
              >
                Lịch sử phát triển
              </a>
            </div>
          </div>

          {/* ── Right: Photo placeholder ── */}
          <div className="hidden md:flex col-span-5 items-center justify-end h-full">
            <div className="w-1.5 self-stretch bg-blood mr-4 shrink-0" />
            <div className="w-full">
              <HistoricPhoto
                alt="Chân dung Hồ Chí Minh"
                caption="Chân dung nhân vật lịch sử"
                year="1946"
                aspect="portrait"
                colorize={false}
                maxHeight="420px"
              />
            </div>
          </div>
        </div>

        {/* Bottom stat band */}
        <div className="grid grid-cols-3 gap-4 border-t border-cream/20 pt-4">
          {[
            { label: "Nguồn gốc", value: "VII–VI TCN" },
            { label: "Thuật ngữ gốc", value: "δημοκρατία" },
            { label: "Nền dân chủ", value: "3 hình thái" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-0.5">
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cream/50">
                {s.label}
              </span>
              <span className="headline text-blood text-lg md:text-2xl leading-none">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink/80 to-transparent pointer-events-none z-10" />
    </section>
  );
}
