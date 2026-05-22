import SectionHeader from "@/components/ui/SectionHeader";
import StampTag from "@/components/ui/StampTag";
import BounceCards from "@/components/BounceCards";
import CircularText from "@/components/CircularText";

// ─── REPLACE these placeholder URLs with your own images ──────────────────────
const IMG_SLAVE     = "https://placehold.co/400x400/EDE6CE/1A1A1A?text=Dân+chủ+chủ+nô";
const IMG_BOURGEOIS = "https://placehold.co/400x400/1A1A1A/F5F5DC?text=Dân+chủ+tư+sản";
const IMG_SOCIALIST = "https://placehold.co/400x400/D32F2F/F5F5DC?text=Dân+chủ+XHCN";
// ──────────────────────────────────────────────────────────────────────────────

const THREE_DEMOCRACIES = [
  {
    num: "01",
    name: "Nền dân chủ chủ nô",
    era: "Chế độ chiếm hữu nô lệ",
    bg: "bg-bone",
    borderClass: "md:border-r-2 border-ink",
    textColor: "text-ink",
    accentClass: "text-ink/50",
    stampTone: "ink" as const,
    desc: "Dân chủ đầu tiên — chỉ dành cho chủ nô và công dân tự do; nô lệ (đa số) không có quyền.",
    isHighlight: false,
  },
  {
    num: "02",
    name: "Nền dân chủ tư sản",
    era: "Chế độ tư bản chủ nghĩa",
    bg: "bg-ink",
    borderClass: "md:border-r-2 border-cream/20",
    textColor: "text-cream",
    accentClass: "text-cream/50",
    stampTone: "cream" as const,
    desc: "Bước tiến lớn về tự do, bình đẳng — bị hạn chế bởi tư hữu tư liệu sản xuất.",
    isHighlight: false,
  },
  {
    num: "03",
    name: "Nền dân chủ XHCN",
    era: "Chế độ xã hội chủ nghĩa",
    bg: "bg-blood",
    borderClass: "",
    textColor: "text-cream",
    accentClass: "text-cream/60",
    stampTone: "cream" as const,
    desc: "Quyền lực thực sự của đại đa số nhân dân lao động — ra đời 1917.",
    isHighlight: true,
  },
];

export default function Conclusion() {
  return (
    <section id="conclusion" className="relative bg-cream grain py-12 md:py-16 overflow-hidden">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="KẾT LUẬN"
          eyebrow="Ba nền dân chủ"
          title="BA NỀN DÂN CHỦ"
          tagline="Với tư cách hình thái nhà nước, lịch sử nhân loại đến nay có ba nền (chế độ) dân chủ."
          align="center"
          className="mb-8 md:mb-10"
        />

        {/* ── BounceCards gallery ── */}
        <div className="flex justify-center mb-10">
          <BounceCards
            images={[IMG_SLAVE, IMG_BOURGEOIS, IMG_SOCIALIST]}
            containerWidth={520}
            containerHeight={320}
            animationDelay={0.3}
            animationStagger={0.08}
            easeType="elastic.out(1, 0.8)"
            transformStyles={[
              "rotate(-12deg) translate(-130px)",
              "rotate(0deg)",
              "rotate(12deg) translate(130px)",
            ]}
            enableHover={true}
          />
        </div>

        {/* ── Three detailed cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-2 border-ink shadow-[6px_6px_0_#D32F2F]">
          {THREE_DEMOCRACIES.map((d) => (
            <div
              key={d.num}
              className={`relative ${d.bg} ${d.borderClass} flex flex-col`}
            >
              {/* CircularText seal — XHCN card only */}
              {d.isHighlight && (
                <div className="absolute top-3 right-3 z-10">
                  <CircularText
                    text="DÂN CHỦ XÃ HỘI CHỦ NGHĨA • NHÂN DÂN LÀM CHỦ • "
                    spinDuration={20}
                    onHover="slowDown"
                    className="!w-[88px] !h-[88px] !text-[7px] !font-mono !text-cream"
                  />
                </div>
              )}

              <div className={`p-5 flex flex-col gap-2 flex-1 ${d.textColor}`}>
                <span className={`font-mono text-[9px] uppercase tracking-[0.3em] block ${d.accentClass}`}>
                  {d.num}
                </span>
                <StampTag tone={d.stampTone} className="text-[8px] self-start">
                  {d.era}
                </StampTag>
                <h3 className={`headline text-lg md:text-xl leading-tight ${d.textColor}`}>
                  {d.name}
                </h3>
                <p className={`serif text-sm leading-relaxed opacity-85 ${d.textColor}`}>
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Finishing line ── */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-[auto_1fr] border-2 border-ink shadow-[6px_6px_0_#D32F2F]">
          {/* Red accent column */}
          <div className="bg-blood px-4 py-6 flex items-center justify-center md:writing-mode-vertical">
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream whitespace-nowrap md:[writing-mode:vertical-rl] md:rotate-180">
              Chủ nghĩa Mác–Lênin
            </span>
          </div>
          {/* Quote */}
          <div className="bg-ink px-6 py-6">
            <p className="headline text-[clamp(1.1rem,2.4vw,1.8rem)] text-cream leading-tight">
              DÂN CHỦ VỪA LÀ MỤC TIÊU, VỪA LÀ TIỀN ĐỀ VÀ PHƯƠNG TIỆN ĐỂ VƯƠN TỚI TỰ DO, GIẢI PHÓNG CON NGƯỜI.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
