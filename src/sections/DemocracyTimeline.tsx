import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HistoricPhoto from "@/components/ui/HistoricPhoto";
import StampTag from "@/components/ui/StampTag";
import FlowingMenu from "@/components/FlowingMenu";

const MENU_ROW_HEIGHT = 76;

const ERAS = [
  {
    id: "era-1",
    text: "Cộng sản nguyên thủy",
    year: "~17.000 TCN",
    label: "Chưa có nền dân chủ",
    period: "Cổ đại",
    demType: "— (Tiền đề)",
    demColor: "bg-ink/20 text-ink",
    photoCaption: "Xã hội nguyên thủy — thị tộc, bộ lạc",
    photoYear: "~17.000 TCN",
    photoSrc: "https://luatduonggia.vn/wp-content/uploads/2025/06/cong-xa-nguyen-thuy-la-gi-tim-hieu-ve-cong-xa-nguyen-thuy.jpg",
    features: [
      "Xã hội tự quản cộng đồng thị tộc, bộ lạc",
      "Thành viên bộ lạc bầu thủ lĩnh quân sự tại hội nghị chung của cộng đồng",
      "Mọi người có quyền phát biểu và biểu quyết",
      "Chưa có nhà nước, chưa có giai cấp",
      "Hình thức dân chủ sơ khai nhất của loài người",
    ],
  },
  {
    id: "era-2",
    text: "Chiếm hữu nô lệ",
    year: "~447 TCN",
    label: "Nền dân chủ chủ nô",
    period: "Cổ đại",
    demType: "Dân chủ chủ nô",
    demColor: "bg-bone text-ink",
    photoCaption: "Chế độ chiếm hữu nô lệ",
    photoYear: "~447 TCN",
    photoSrc: "https://cdn.accgroup.vn/wp-content/uploads/2022/12/9.2-5-hinh-thai-kinh-te-xa-hoi-tu-truoc-toi-nay-co-nhung-dac-diem-gi-noi-bat-1.jpg",
    features: [
      "LLSX phát triển → chế độ tư hữu, giai cấp hình thành",
      "Dân tham gia bầu nhà nước",
      "\"Dân\" chỉ gồm chủ nô + công dân tự do",
      "Nô lệ (đa số) bị loại khỏi quyền dân chủ",
      "Nền dân chủ đầu tiên trong lịch sử nhà nước",
    ],
  },
  {
    id: "era-3",
    text: "Phong kiến",
    year: "TK XIII",
    label: "Quân chủ phong kiến",
    period: "Trung cổ",
    demType: "Nền quân chủ PK",
    demColor: "bg-smoke text-cream",
    photoCaption: "Chế độ phong kiến — nhà nước chuyên chế",
    photoYear: "TK XIII",
    photoSrc: "https://congdankhuyenhoc.qltns.mediacdn.vn/zoom/700_438/449484899827462144/2024/1/24/cacvikhaoquantronglexuongdanhkhoathinamdinhdaunamdinhngay27thang12nam1897-1706104184937485134775-8-0-633-1000-crop-1706104395710283177462.jpg",
    features: [
      "Nhà nước chuyên chế phong kiến thống trị",
      "Dân chủ chủ nô bị xóa bỏ hoàn toàn",
      "Chế độ độc tài thay thế chế độ dân chủ",
      "Ý thức về dân chủ không có bước tiến đáng kể",
      "Thời kỳ đen tối về quyền lực nhân dân",
    ],
  },
  {
    id: "era-4",
    text: "Tư bản chủ nghĩa",
    year: "1789",
    label: "Nền dân chủ tư sản",
    period: "Cuối TK XIV – đầu TK XV",
    demType: "Dân chủ tư sản",
    demColor: "bg-bone text-ink",
    photoCaption: "Cách mạng tư sản — tự do, bình đẳng, bác ái",
    photoYear: "1789",
    photoSrc: "https://cdn.luatminhkhue.vn/lmk/articles/83/419593/cac-dinh-luat-chung-cua-tu-ban-chu-nghia-419593.jpg",
    features: [
      "Giai cấp tư sản mở đường cho nền dân chủ tư sản",
      "Bước tiến lớn: tự do, bình đẳng, dân chủ",
      "Xây dựng trên nền tảng tư hữu về tư liệu sản xuất",
      "Thực tế: thiểu số nắm TLSX kiểm soát đại đa số",
      "Dân chủ bị hạn chế bởi bất bình đẳng kinh tế",
    ],
  },
  {
    id: "era-5",
    text: "Xã hội chủ nghĩa",
    year: "1917",
    label: "Nền dân chủ vô sản",
    period: "Từ 1917",
    demType: "Dân chủ XHCN",
    demColor: "bg-blood text-cream",
    photoCaption: "Cách mạng Tháng Mười Nga 1917",
    photoYear: "1917",
    photoSrc: "https://media-cdn-v2.laodong.vn/storage/newsportal/2022/11/6/1113505/CM-Thang-10-Nga.jpg",
    features: [
      "Ra đời sau Cách mạng Tháng Mười Nga thắng lợi (1917)",
      "Thiết lập quyền lực của đại đa số nhân dân",
      "Xóa bỏ tư hữu về tư liệu sản xuất",
      "Nhà nước của nhân dân, do nhân dân, vì nhân dân",
      "Dân chủ thực chất nhất trong lịch sử đến nay",
    ],
  },
  {
    id: "era-6",
    text: "Cộng sản chủ nghĩa ↗",
    year: "Tương lai",
    label: "Tương lai — mục tiêu",
    period: "Tương lai",
    demType: "Mục tiêu",
    demColor: "bg-blood text-cream",
    photoCaption: "",
    photoYear: "",
    photoSrc: "",
    features: [
      "Xã hội không còn giai cấp, không còn nhà nước",
      "Dân chủ hoàn toàn và triệt để",
      "Mọi người đều là chủ nhân xã hội",
      "Tự do, bình đẳng, bác ái thực sự",
      "Điểm cuối của tiến trình phát triển lịch sử",
    ],
  },
] as const;

type Era = (typeof ERAS)[number];

function EraDetailPanel({ era }: { era: Era }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {era.id !== "era-6" ? (
        <div className="border-b border-ink/15 p-5 md:border-b-0 md:border-r">
          <HistoricPhoto
            alt={era.photoCaption}
            caption={era.photoCaption}
            year={era.photoYear}
            src={era.photoSrc || undefined}
            aspect="landscape"
            colorize={true}
            maxHeight="220px"
          />
        </div>
      ) : (
        <div className="flex items-center justify-center border-r border-blood/20 bg-blood/10 p-8">
          <div className="text-center">
            <span className="headline text-6xl text-blood">↗</span>
            <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-ink/60">
              Mục tiêu tương lai
            </p>
          </div>
        </div>
      )}

      <div className="p-5 [font-feature-settings:normal]">
        <div className="mb-3 flex items-center gap-2">
          <StampTag tone="red" className="text-[8px]">
            {era.period}
          </StampTag>
          <span className={`font-headline text-xs uppercase px-2 py-0.5 ${era.demColor}`}>
            {era.demType}
          </span>
        </div>
        <h3 className="headline mb-3 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-xl text-ink">
          <span>{era.text.replace(" ↗", "")}</span>
          <span className="font-mono text-sm tracking-[0.14em] text-ink/55">{era.year}</span>
        </h3>
        <ul className="flex flex-col gap-2">
          {era.features.map((feature) => (
            <li
              key={feature}
              className="serif border-2 border-ink/20 bg-cream px-4 py-3 text-sm leading-relaxed text-ink shadow-[2px_2px_0_rgba(26,26,26,0.12)]"
            >
              {feature.normalize("NFC")}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function DemocracyTimeline() {
  const [activeEra, setActiveEra] = useState<number | null>(null);

  const handleEraClick = (index: number) => {
    setActiveEra((prev) => (prev === index ? null : index));
  };

  return (
    <section id="timeline" className="relative bg-ink text-cream py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="III"
          eyebrow="Sự ra đời và phát triển"
          title="SỰ RA ĐỜI & PHÁT TRIỂN"
          tagline="Tiến trình 6 giai đoạn từ cộng sản nguyên thủy đến tương lai cộng sản chủ nghĩa."
          className="mb-6 [&_h2]:text-cream [&_p]:text-cream/70 [&_span]:text-cream/50"
        />

        {/* Reference diagram — border hugs image (no letterbox) */}
        <div className="mb-8 w-full">
          <HistoricPhoto
            alt="Sơ đồ tiến trình phát triển các hình thức dân chủ"
            aspect="wide"

            src="https://i.ibb.co/N2hwX1vb/Gemini-Generated-Image-2pmkw12pmkw12pmk.png"
            colorize={false}
            maxHeight="clamp(12rem, 38vw, 22.5rem)"
            className="w-full border-cream/25 shadow-[6px_6px_0_#D32F2F] [&>div]:block [&>div]:bg-transparent [&>div]:leading-[0] [&_button]:block [&_button]:w-full [&_img]:block [&_img]:h-auto [&_img]:w-full [&_img]:max-w-full"
          />
        </div>

        <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-cream/55">
            Nhấn từng dòng để mở / đóng chi tiết giai đoạn
          </p>
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blood">
            <MousePointerClick className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Di chuột hoặc nhấn
          </span>
        </div>

        {/* FlowingMenu — detail expands inline below clicked row */}
        <div className="border-2 border-cream/20 shadow-[6px_6px_0_#D32F2F]">
          <FlowingMenu
            items={ERAS.map((era) => ({
              text: era.text.replace(" ↗", ""),
              year: era.year,
              subtext: era.label,
              image: era.photoSrc,
            }))}
            speed={18}
            textColor="#F5F5DC"
            bgColor="#1A1A1A"
            marqueeBgColor="#D32F2F"
            marqueeTextColor="#F5F5DC"
            borderColor="#2A2A2A"
            rowHeight={MENU_ROW_HEIGHT}
            activeIndex={activeEra}
            onItemClick={handleEraClick}
            renderExpanded={(index) => <EraDetailPanel era={ERAS[index]} />}
          />
        </div>
      </div>
    </section>
  );
}
