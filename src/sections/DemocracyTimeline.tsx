import { useState } from "react";
import { MousePointerClick } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import HistoricPhoto from "@/components/ui/HistoricPhoto";
import StampTag from "@/components/ui/StampTag";
import FlowingMenu from "@/components/FlowingMenu";
import { ERAS, type DemocracyEra } from "@/data/democracyErasData";

const MENU_ROW_HEIGHT = 76;

type Era = DemocracyEra;

function EraDetailPanel({ era }: { era: Era }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {era.id !== "era-6" ? (
        <div className="border-b border-ink/15 p-5 md:border-b-0 md:border-r">
          <HistoricPhoto
            alt={era.photoCaption}
            caption={era.photoCaption}
            captionIcon={"photoCaptionIcon" in era ? era.photoCaptionIcon : undefined}
            captionIconAlt={"photoCaptionIconAlt" in era ? era.photoCaptionIconAlt : undefined}
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
          <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-blood">
            <MousePointerClick className="h-3.5 w-3.5 shrink-0" strokeWidth={2} aria-hidden />
            Di chuột hoặc nhấn vào từng giai đoạn
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
