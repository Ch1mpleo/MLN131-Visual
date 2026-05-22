import SectionHeader from "@/components/ui/SectionHeader";
import HistoricPhoto from "@/components/ui/HistoricPhoto";
import FuzzyText from "@/components/FuzzyText";
import TrueFocus from "@/components/TrueFocus";

export default function Terminology() {
  return (
    <section id="terminology" className="relative bg-bone grain py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="I"
          eyebrow="Quan niệm về dân chủ"
          title="VỀ MẶT THUẬT NGỮ"
          tagline="Dân chủ (δημοκρατία) — từ ghép Hy Lạp ra đời vào thế kỷ VII–VI TCN."
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 md:gap-10 items-start">

          {/* ── Left: portrait + landscape stack ── */}
          <div className="flex flex-col gap-4 md:col-span-2">
            <HistoricPhoto
              alt="Triết học và hội đồng dân chủ Hy Lạp cổ đại"
              caption="Đại hội nhân dân Hy Lạp cổ đại"
              aspect="portrait"
              colorize={true}
              maxHeight="460px"
              src="https://i0.wp.com/lichsu.blog/wp-content/uploads/2025/09/Discurso_funebre_pericles.png?fit=719%2C573&ssl=1"
            />
            <HistoricPhoto
              alt="Khu di tích Pnyx — nơi họp bình dân Athens"
              caption="Pnyx · Hội trường dân chủ Athens cổ đại"
              aspect="portrait"
              colorize={true}
              maxHeight="460px"
              src="https://thegioidulich.com/upload/tintuc/hy-lap-co-dai/hoi-nghi-hy-lap.jpg"
            />
          </div>


          {/* ── Right: Etymology diagram ── */}
          <div className="md:col-span-3 flex flex-col gap-5">

            {/* Origin strip + TrueFocus */}
            <div>
              <TrueFocus
                sentence="DEMOS KRATOS"
                blurAmount={4}
                borderColor="#D32F2F"
                glowColor="rgba(211,47,47,0.5)"
                animationDuration={0.5}
                pauseBetweenAnimations={1.8}
              />
            </div>

            {/* Split diagram */}
            <div className="flex flex-col items-center">
              {/* Parent box */}
              <div className="border-2 border-ink bg-ink text-cream px-6 py-3 shadow-[4px_4px_0_#D32F2F] w-full text-center">
                <span className="headline text-lg md:text-2xl tracking-tight">
                  DÂN CHỦ = DEMOS + KRATOS
                </span>
              </div>

              {/* Connector */}
              <div className="relative w-full flex justify-center h-8">
                <div className="w-[2px] h-full bg-ink" />
                <div className="absolute bottom-0 left-[20%] right-[20%] h-[2px] bg-ink" />
              </div>

              {/* Two branches */}
              <div className="w-full grid grid-cols-2 gap-5 md:gap-6">
                {/* DEMOS */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-6 bg-ink" />
                  <div className="flex min-h-[7.5rem] w-full flex-col items-center justify-center border-2 border-blood bg-blood/10 px-5 py-6 text-center shadow-[3px_3px_0_#1A1A1A] md:min-h-[9rem] md:py-8">
                    <div className="flex w-full justify-center">
                      <FuzzyText
                        fontSize="clamp(1.6rem, 4vw, 2.6rem)"
                        fontWeight={900}
                        color="#D32F2F"
                        enableHover={true}
                        baseIntensity={0.15}
                        hoverIntensity={0.6}
                        className="mx-auto block"
                      >
                        DEMOS
                      </FuzzyText>
                    </div>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/70 md:text-sm">
                      Nhân dân
                    </p>
                  </div>
                </div>
                {/* KRATOS */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-6 bg-ink" />
                  <div
                    className="flex min-h-[7.5rem] w-full flex-col items-center justify-center border-2 bg-[#1565C0]/10 px-5 py-6 text-center shadow-[3px_3px_0_#1A1A1A] md:min-h-[9rem] md:py-8"
                    style={{ borderColor: "#1565C0" }}
                  >
                    <div className="flex w-full justify-center">
                      <FuzzyText
                        fontSize="clamp(1.6rem, 4vw, 2.6rem)"
                        fontWeight={900}
                        color="#1565C0"
                        enableHover={true}
                        baseIntensity={0.15}
                        hoverIntensity={0.6}
                        className="mx-auto block"
                      >
                        KRATOS
                      </FuzzyText>
                    </div>
                    <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/70 md:text-sm">
                      Quyền lực
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Combined meaning */}
            <div className="border-l-4 border-blood pl-4">
              <p className="serif italic text-ink text-base md:text-lg leading-relaxed">
                Nhân dân cai trị — quyền lực thuộc về nhân dân
              </p>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/50 mt-1">
                Nội dung cốt lõi về cơ bản giữ nguyên đến ngày nay
              </p>
            </div>

            {/* Key facts */}
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {[
                { label: "Ra đời", value: "TK VII–VI TCN" },
                { label: "Nguồn gốc", value: "Hy Lạp cổ đại" },
                { label: "Nghĩa gốc", value: "Nhân dân cai trị" },
                { label: "Tính kế thừa", value: "Đến ngày nay" },
              ].map((f) => (
                <div
                  key={f.label}
                  className="flex min-h-[5.5rem] flex-col items-center justify-center border border-ink/15 bg-ink/5 px-4 py-5 text-center md:min-h-[6.5rem] md:py-6"
                >
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 md:text-[10px]">
                    {f.label}
                  </span>
                  <span className="mt-1.5 font-headline text-sm uppercase text-ink font-black md:text-base">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
