import type { ReactNode } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import ArchivalCard from "@/components/ui/ArchivalCard";
import StampTag from "@/components/ui/StampTag";
import HistoricPhoto from "@/components/ui/HistoricPhoto";
import GlareHover from "@/components/GlareHover";
import { cn } from "@/lib/utils";

const CARD_PHOTO = {
  className: "!border-0 !shadow-none [&_figcaption]:!hidden",
  aspect: "wide" as const,
  maxHeight: "72px",
  colorize: true,
};

const HCM_QUOTES = [
  {
    text: "Dân chủ là dân là chủ và dân làm chủ.",
    context: "Giá trị nhân loại chung",
  },
  {
    text: "Chế độ ta là chế độ dân chủ, tức là nhân dân là người chủ, mà Chính phủ là người đầy tớ trung thành của nhân dân.",
    context: "Thể chế chính trị",
  },
  {
    text: "Dân làm chủ thì Chủ tịch, bộ trưởng... làm đầy tớ cho nhân dân, chứ không phải là làm quan cách mạng.",
    context: "Thực hành dân chủ",
  },
];

function ViewpointCard({
  photo,
  stamp,
  title,
  accent = "ink",
  children,
}: {
  photo: ReactNode;
  stamp: ReactNode;
  title: string;
  accent?: "ink" | "blood";
  children: ReactNode;
}) {
  return (
    <GlareHover
      width="100%"
      height="auto"
      background="#EDE6CE"
      borderRadius="0px"
      borderColor="#1A1A1A"
      glareColor="#ffffff"
      glareOpacity={0.28}
      glareAngle={-30}
      glareSize={280}
      className="flex h-full flex-col !border-2"
      style={{ width: "100%", height: "100%" }}
    >
      <article className="flex h-full min-h-0 flex-col">
        <div
          className={cn(
            "h-[72px] shrink-0 overflow-hidden border-b-2 border-ink bg-ink",
            accent === "blood" && "ring-2 ring-inset ring-blood/30",
          )}
        >
          {photo}
        </div>
        <div className="flex flex-1 flex-col gap-2.5 p-4">
          {stamp}
          <h3 className="headline text-lg leading-tight text-ink md:text-xl">
            {title}
          </h3>
          {children}
        </div>
      </article>
    </GlareHover>
  );
}

export default function Viewpoints() {
  return (
    <section id="viewpoints" className="relative bg-cream grain py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="(a)"
          eyebrow="Quan niệm về dân chủ"
          title="QUAN NIỆM VỀ DÂN CHỦ"
          tagline="Ba góc nhìn: Thuật ngữ — Mác–Lênin — Hồ Chí Minh"
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3">
          <ViewpointCard
            photo={
              <HistoricPhoto
                alt="Nền dân chủ Hy Lạp cổ đại"
                year="~500 TCN"
                {...CARD_PHOTO}
              />
            }
            stamp={
              <StampTag tone="red" className="text-[9px] self-start">
                Về mặt thuật ngữ
              </StampTag>
            }
            title="DEMOS + KRATOS"
          >
            <ul className="space-y-1">
              {[
                ["Nguồn gốc", "Hy Lạp cổ đại, TK VII–VI TCN"],
                ["Nghĩa gốc", "Nhân dân cai trị"],
                ["Giản lược", "Quyền lực của nhân dân"],
                ["Tính kế thừa", "Giữ nguyên đến ngày nay"],
              ].map(([k, v]) => (
                <li key={k} className="flex gap-2 text-xs">
                  <span className="w-[5.5rem] shrink-0 font-mono uppercase tracking-wide text-ink/50">
                    {k}:
                  </span>
                  <span className="serif text-ink/80">{v}</span>
                </li>
              ))}
            </ul>
          </ViewpointCard>

          <ViewpointCard
            photo={
              <HistoricPhoto
                alt="Karl Marx và Friedrich Engels"
                year="1845"
                {...CARD_PHOTO}
              />
            }
            stamp={
              <StampTag tone="ink" className="text-[9px] self-start">
                Chủ nghĩa Mác–Lênin
              </StampTag>
            }
            title="3 PHƯƠNG DIỆN"
          >
            <div className="flex flex-wrap gap-1">
              {["Quyền lực", "Chế độ XH", "Tổ chức XH"].map((p) => (
                <StampTag key={p} tone="red" className="text-[8px]">
                  {p}
                </StampTag>
              ))}
            </div>
            <div className="space-y-1.5">
              {[
                {
                  label: "Quyền lực",
                  desc: "Quyền lực thuộc về nhân dân; mọi quyền lực nhà nước vì nhân dân.",
                },
                {
                  label: "Hình thức NN",
                  desc: "Dân chủ là hình thái nhà nước — phạm trù lịch sử.",
                },
                {
                  label: "Giá trị XH",
                  desc: "Dân chủ là giá trị xã hội — phạm trù vĩnh viễn.",
                },
              ].map((d) => (
                <div key={d.label} className="border-l-2 border-blood pl-2.5">
                  <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-blood">
                    {d.label}
                  </span>
                  <span className="serif text-xs text-ink/80">{d.desc}</span>
                </div>
              ))}
            </div>
            <div className="mt-auto grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="bg-ink px-2 py-1.5 text-cream">
                <span className="block font-mono text-[8px] uppercase tracking-wide text-cream/60">
                  Lịch sử
                </span>
                <span className="font-headline uppercase">Hình thái NN</span>
              </div>
              <div className="bg-blood px-2 py-1.5 text-cream">
                <span className="block font-mono text-[8px] uppercase tracking-wide text-cream/60">
                  Vĩnh viễn
                </span>
                <span className="font-headline uppercase">Giá trị XH</span>
              </div>
            </div>
          </ViewpointCard>

          <ViewpointCard
            accent="blood"
            photo={
              <HistoricPhoto
                alt="Chủ tịch Hồ Chí Minh"
                year="1946"
                {...CARD_PHOTO}
                colorize={false}
              />
            }
            stamp={
              <StampTag tone="red" className="text-[9px] self-start">
                Tư tưởng Hồ Chí Minh
              </StampTag>
            }
            title="DÂN LÀ CHỦ"
          >
            <div className="flex flex-col gap-1.5">
              {HCM_QUOTES.map((q) => (
                <blockquote
                  key={q.context}
                  className="border-l-2 border-blood bg-blood/5 px-2.5 py-1.5"
                >
                  <span className="mb-0.5 block font-mono text-[8px] uppercase tracking-[0.2em] text-blood/90">
                    {q.context}
                  </span>
                  <p className="serif text-xs italic leading-snug text-ink/90">
                    &ldquo;{q.text}&rdquo;
                  </p>
                </blockquote>
              ))}
            </div>
          </ViewpointCard>
        </div>

        <div className="mt-5">
          <ArchivalCard variant="blood" label="Tổng hợp" number="→">
            <p className="serif text-sm leading-relaxed text-cream/90 md:text-base">
              Dân chủ là <strong>giá trị xã hội</strong> phản ánh quyền cơ bản của
              con người; là <strong>hình thức tổ chức nhà nước</strong> của giai cấp
              cầm quyền; có quá trình <strong>ra đời và phát triển</strong> cùng lịch
              sử xã hội nhân loại.
            </p>
          </ArchivalCard>
        </div>
      </div>
    </section>
  );
}
