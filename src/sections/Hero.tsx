import Noise from "@/components/Noise";
import RotatingText from "@/components/RotatingText";
import StampTag from "@/components/ui/StampTag";

const HO_CHI_MINH_PORTRAIT =
  "https://i1-e.pinimg.com/1200x/ff/ec/30/ffec307c263a9e02300677cd240c0b4e.jpg";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-ink"
    >
      <Noise patternAlpha={18} patternRefreshInterval={2} />

      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-blood" />

      {/* Constructivist backdrop bands */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden w-[46%] md:block"
        aria-hidden
      >
        <div className="absolute inset-y-0 right-0 w-full bg-blood/12" />
        <div className="absolute bottom-0 right-0 h-[38%] w-[72%] bg-blood/20" />
        <div className="absolute right-8 top-[18%] h-[58%] w-2 bg-cream/25" />
        <div className="absolute right-0 top-[22%] h-[52%] w-1 bg-blood" />
      </div>

      <div className="relative z-10 mx-auto flex h-full min-h-[100svh] max-w-7xl flex-col justify-between px-5 pb-6 pt-20 md:px-10">
        <div className="grid flex-1 grid-cols-12 items-center gap-6 md:gap-8">
          {/* ── Copy column ── */}
          <div className="col-span-12 flex flex-col gap-3 md:col-span-6 md:gap-4 lg:col-span-7">
            <div className="flex items-center gap-3">
              <StampTag tone="red" rotate={-2} className="text-[10px] md:text-xs">
                Lý luận chính trị
              </StampTag>
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream/60 md:text-[10px]">
                MLN131 · Dân chủ &amp; Pháp luật
              </span>
            </div>

            <div>
              <h1 className="headline block text-[clamp(2.5rem,6.5vw,5.5rem)] leading-none text-cream">
                DÂN CHỦ
              </h1>
              <div className="mt-1 flex items-center gap-3">
                <h1 className="headline text-[clamp(2.5rem,6.5vw,5.5rem)] leading-none text-blood">
                  LÀ GÌ?
                </h1>
                <span className="h-[3px] max-w-[8rem] flex-1 bg-cream/40" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-cream/50 md:text-xs">
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

            <p className="serif max-w-sm border-l-4 border-blood pl-4 text-sm italic leading-relaxed text-cream/80 md:text-base">
              "Dân chủ là dân là chủ và dân làm chủ."
              <span className="mt-1.5 block font-mono text-[9px] uppercase tracking-widest text-cream/50 not-italic md:text-[10px]">
                — Hồ Chí Minh
              </span>
            </p>
          </div>

          {/* ── Portrait monument (custom frame — not HistoricPhoto) ── */}
          <div className="col-span-12 md:col-span-6 lg:col-span-5">
            <figure className="relative mx-auto w-full max-w-[420px] md:mx-0 md:ml-auto md:max-w-none">
              <div className="relative">
                {/* Offset constructivist shadow */}
                <div
                  className="absolute -bottom-3 -right-3 hidden h-full w-full border-2 border-blood bg-blood md:block"
                  aria-hidden
                />

                <div className="relative overflow-hidden border-[3px] border-cream bg-ink shadow-[10px_10px_0_#D32F2F] md:border-4">
                  <div className="relative aspect-[3/4] w-full md:aspect-auto md:h-[min(72svh,640px)]">
                    <img
                      src={HO_CHI_MINH_PORTRAIT}
                      alt="Chân dung Hồ Chí Minh"
                      className="h-full w-full object-cover object-[center_12%] contrast-[1.08] grayscale brightness-[0.92] md:object-[center_10%]"
                      fetchPriority="high"
                      decoding="async"
                    />

                    {/* Vignette for depth */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-cream/5 mix-blend-multiply" />
                    <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-cream/20" />

                    {/* Year stamp */}
                    <div className="absolute left-0 top-0 bg-blood px-4 py-2 font-headline text-sm uppercase tracking-wide text-cream shadow-[4px_4px_0_#1A1A1A] md:text-base">
                      1946
                    </div>

                    {/* Archive label */}
                    <div className="absolute bottom-0 left-0 right-0 border-t-2 border-cream/30 bg-ink/85 px-4 py-3 backdrop-blur-[2px]">
                      <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-cream/55">
                        Tư liệu lưu trữ
                      </p>
                      <p className="headline mt-0.5 text-base leading-none text-cream md:text-lg">
                        HỒ CHÍ MINH
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <figcaption className="mt-3 hidden font-mono text-[9px] uppercase tracking-[0.22em] text-cream/45 md:block">
                Chân dung Chủ tịch Hồ Chí Minh · Năm 1946
              </figcaption>
            </figure>
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
              <span className="headline text-lg leading-none text-blood md:text-2xl">
                {s.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-ink to-transparent" />
    </section>
  );
}
