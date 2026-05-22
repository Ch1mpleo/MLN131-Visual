import SectionHeader from "@/components/ui/SectionHeader";
import ArchivalCard from "@/components/ui/ArchivalCard";
import StampTag from "@/components/ui/StampTag";
import HistoricPhoto from "@/components/ui/HistoricPhoto";
import {
  ViewpointCard,
  ViewpointDimension,
  ViewpointFactList,
  ViewpointPillPair,
  ViewpointQuote,
} from "@/components/ui/ViewpointCard";

const CARD_PHOTO = {
  className: "!h-full !w-full !border-0 !shadow-none [&_figcaption]:!hidden",
  fill: true,
  objectFit: "cover" as const,
  colorize: true,
  enableLightbox: false,
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
] as const;

const TERMINOLOGY_FACTS = [
  { label: "Nguồn gốc", value: "Hy Lạp cổ đại, thế kỷ VII–VI TCN" },
  { label: "Nghĩa gốc", value: "Nhân dân cai trị" },
  { label: "Giản lược", value: "Quyền lực của nhân dân" },
  { label: "Tính kế thừa", value: "Nội dung cốt lõi giữ nguyên đến ngày nay" },
] as const;

const ML_DIMENSIONS = [
  {
    label: "Quyền lực",
    description:
      "Quyền lực thuộc về nhân dân; nhân dân là chủ nhân nhà nước; mọi quyền lực nhà nước vì nhân dân, phục vụ nhân dân.",
  },
  {
    label: "Hình thức NN",
    description: "Dân chủ là hình thái nhà nước — phạm trù lịch sử, gắn với lịch sử nhà nước.",
  },
  {
    label: "Giá trị XH",
    description: "Dân chủ là giá trị xã hội — phạm trù vĩnh viễn, tồn tại cùng nhân loại.",
  },
] as const;

export default function Viewpoints() {
  return (
    <section id="viewpoints" className="relative bg-cream grain py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="II"
          eyebrow="Quan niệm về dân chủ"
          title="QUAN NIỆM VỀ DÂN CHỦ"
          tagline="Ba góc nhìn: Thuật ngữ — Mác–Lênin — Hồ Chí Minh"
          className="mb-8 md:mb-10"
        />

        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3 lg:gap-5">
          <ViewpointCard
            index="01"
            title="DEMOS + KRATOS"
            category={
              <StampTag tone="red" rotate={-1} className="!text-xs md:!text-sm">
                Về mặt thuật ngữ
              </StampTag>
            }
            photo={
              <HistoricPhoto
                alt="Nền dân chủ Hy Lạp cổ đại"
                src="https://images.unsplash.com/photo-1555993539-1732b0258235?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                objectPosition="center 40%"
                {...CARD_PHOTO}
              />
            }
          >
            <ViewpointFactList items={TERMINOLOGY_FACTS} />
          </ViewpointCard>

          <ViewpointCard
            index="02"
            title="3 PHƯƠNG DIỆN"
            category={
              <StampTag tone="ink" rotate={1} className="!text-xs md:!text-sm">
                Mác–Lênin
              </StampTag>
            }
            photo={
              <HistoricPhoto
                alt="Karl Marx và Friedrich Engels"
                src="https://file.qdnd.vn/data/images/14/2020/11/25/tranhoai/4.jpg?dpi=150&quality=100&w=575"
                objectPosition="center 20%"
                {...CARD_PHOTO}
              />
            }
          >
            <div className="flex flex-wrap gap-2">
              {["Quyền lực", "Chế độ XH", "Tổ chức XH"].map((p) => (
                <StampTag key={p} tone="red" className="!px-2.5 !py-1 !text-[10px] md:!text-xs">
                  {p}
                </StampTag>
              ))}
            </div>
            <div className="space-y-3.5">
              {ML_DIMENSIONS.map((d) => (
                <ViewpointDimension
                  key={d.label}
                  label={d.label}
                  description={d.description}
                />
              ))}
            </div>
            <ViewpointPillPair
              left={{ tag: "Lịch sử", label: "Hình thái NN" }}
              right={{ tag: "Vĩnh viễn", label: "Giá trị XH" }}
            />
          </ViewpointCard>

          <ViewpointCard
            index="03"
            variant="featured"
            title="DÂN LÀ CHỦ"
            category={
              <StampTag tone="red" rotate={-1} className="!text-xs md:!text-sm">
                Hồ Chí Minh
              </StampTag>
            }
            photo={
              <HistoricPhoto
                alt="Chủ tịch Hồ Chí Minh"
                src="https://lh3.googleusercontent.com/proxy/-9Pid3CwbEhNUBDXzS-9AEEzZAvIG3YDqbvScSytB5F_yulQbakxRxB0AHpeA850bnDNH0zhYxIby-onG-uoRm6jkjRdsLti_nzB7goeqoDbpkrsiY_pcVAEBqvaAl-u"
                objectPosition="center 35%"
                {...CARD_PHOTO}
                colorize={false}
              />
            }
          >
            <div className="space-y-3">
              {HCM_QUOTES.map((q) => (
                <ViewpointQuote key={q.context} context={q.context} text={q.text} />
              ))}
            </div>
          </ViewpointCard>
        </div>

        <div className="mt-8 md:mt-10">
          <ArchivalCard variant="blood" label="Tổng hợp" number="→">
            <p className="serif text-base leading-relaxed text-cream/90 md:text-[1.05rem] md:leading-relaxed">
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
