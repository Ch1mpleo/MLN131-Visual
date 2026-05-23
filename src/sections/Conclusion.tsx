import SectionHeader from "@/components/ui/SectionHeader";
import StampTag from "@/components/ui/StampTag";
import BounceCards from "@/components/BounceCards";
import CornerEmblem from "@/components/ui/CornerEmblem";

const IMG_SLAVE = "https://cdn.luatminhkhue.vn/lmk/articles/71/357604/kieu-nha-nuoc-chu-no-la-gi---tim-hieu-ve-kieu-nha-nuoc-chu-no-357604.jpg";
const IMG_BOURGEOIS = "https://tiasang.gitlab.io/history/wihm/images/cover.jpg";
const IMG_SOCIALIST = "https://redsvn.net/wp-content/uploads/2023/06/Lenin.jpg";

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
    <section id="conclusion" className="relative overflow-hidden bg-cream grain py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="KẾT LUẬN"
          eyebrow="Ba nền dân chủ"
          title="BA NỀN DÂN CHỦ"
          tagline="Với tư cách hình thái nhà nước, lịch sử nhân loại đến nay có ba nền (chế độ) dân chủ."
          align="center"
          className="mb-8 md:mb-10"
        />

        <div className="mb-10 flex justify-center">
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

        <div className="grid grid-cols-1 border-2 border-ink shadow-[6px_6px_0_#D32F2F] md:grid-cols-3">
          {THREE_DEMOCRACIES.map((d) => (
            <div
              key={d.num}
              className={`relative ${d.bg} ${d.borderClass} flex flex-col`}
            >
              {d.isHighlight && (
                <div className="absolute right-3 top-3 z-10">
                  <CornerEmblem />
                </div>
              )}

              <div className={`flex flex-1 flex-col gap-2 p-5 ${d.textColor}`}>
                <span
                  className={`block font-mono text-[9px] uppercase tracking-[0.3em] ${d.accentClass}`}
                >
                  {d.num}
                </span>
                <StampTag tone={d.stampTone} className="self-start text-[8px]">
                  {d.era}
                </StampTag>
                <h3
                  className={`headline text-lg leading-tight md:text-xl ${d.textColor}`}
                >
                  {d.name}
                </h3>
                <p
                  className={`serif text-sm leading-relaxed opacity-85 ${d.textColor}`}
                >
                  {d.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Finishing line — on section background, no wrapper box */}
        <div className="relative mt-14 md:mt-20 border-t-4 border-blood pt-10 md:pt-14">
          <span className="mb-6 block text-center font-mono text-xs font-semibold uppercase tracking-[0.2em] text-ink/75 md:mb-7 md:text-sm">
            Tổng kết
          </span>
          <p className="headline mx-auto max-w-5xl text-center text-balance text-ink text-[clamp(1.35rem,3.5vw,2.6rem)] leading-[1.12]">
            <span className="text-blood">DÂN CHỦ</span> VỪA LÀ MỤC TIÊU, VỪA LÀ TIỀN ĐỀ VÀ PHƯƠNG TIỆN ĐỂ VƯƠN TỚI TỰ DO, GIẢI PHÓNG CON NGƯỜI.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 md:mt-10 md:gap-5">
            <span className="h-0.5 w-12 bg-blood/70 md:w-20" aria-hidden />
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-blood md:text-sm">
              Nhân dân làm chủ
            </span>
            <span className="h-0.5 w-12 bg-blood/70 md:w-20" aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
