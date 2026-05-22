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

          {/* ── Left: single image placeholder ── */}
          <div className="md:col-span-2">
            <HistoricPhoto
              alt="Triết học và hội đồng dân chủ Hy Lạp cổ đại"
              caption="Đại hội nhân dân Hy Lạp cổ đại"
              credit="Thêm ảnh tại đây"
              year="~500 TCN"
              aspect="portrait"
              colorize={true}
              maxHeight="460px"
            />
          </div>

          {/* ── Right: Etymology diagram ── */}
          <div className="md:col-span-3 flex flex-col gap-5">

            {/* Origin strip + TrueFocus */}
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/50 mb-3">
                Thế kỷ VII–VI TCN · Athens · δημοκρατία
              </p>
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
              <div className="w-full grid grid-cols-2 gap-4">
                {/* DEMOS */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-6 bg-ink" />
                  <div className="border-2 border-blood bg-blood/10 px-4 py-3 w-full text-center shadow-[3px_3px_0_#1A1A1A]">
                    <FuzzyText
                      fontSize="clamp(1.4rem, 3.5vw, 2.2rem)"
                      fontWeight={900}
                      color="#D32F2F"
                      enableHover={true}
                      baseIntensity={0.15}
                      hoverIntensity={0.6}
                      className="block"
                    >
                      DEMOS
                    </FuzzyText>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70 mt-1">
                      Nhân dân
                    </p>
                  </div>
                </div>
                {/* KRATOS */}
                <div className="flex flex-col items-center">
                  <div className="w-[2px] h-6 bg-ink" />
                  <div
                    className="border-2 bg-[#1565C0]/10 px-4 py-3 w-full text-center shadow-[3px_3px_0_#1A1A1A]"
                    style={{ borderColor: "#1565C0" }}
                  >
                    <FuzzyText
                      fontSize="clamp(1.4rem, 3.5vw, 2.2rem)"
                      fontWeight={900}
                      color="#1565C0"
                      enableHover={true}
                      baseIntensity={0.15}
                      hoverIntensity={0.6}
                      className="block"
                    >
                      KRATOS
                    </FuzzyText>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-ink/70 mt-1">
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
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: "Ra đời", value: "TK VII–VI TCN" },
                { label: "Nguồn gốc", value: "Hy Lạp cổ đại" },
                { label: "Nghĩa gốc", value: "Nhân dân cai trị" },
                { label: "Tính kế thừa", value: "Đến ngày nay" },
              ].map((f) => (
                <div key={f.label} className="bg-ink/5 border border-ink/15 px-3 py-2">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 block">
                    {f.label}
                  </span>
                  <span className="font-headline text-sm uppercase text-ink font-black">
                    {f.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Reference diagram — below the JSX diagram */}
            <HistoricPhoto
              alt="Sơ đồ phân tích thuật ngữ dân chủ: Demos + Kratos"
              caption="Sơ đồ phân tích thuật ngữ (tài liệu học phần)"
              aspect="landscape"
              colorize={false}
              maxHeight="160px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
