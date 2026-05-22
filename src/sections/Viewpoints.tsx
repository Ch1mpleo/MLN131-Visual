import SectionHeader from "@/components/ui/SectionHeader";
import ArchivalCard from "@/components/ui/ArchivalCard";
import StampTag from "@/components/ui/StampTag";
import HistoricPhoto from "@/components/ui/HistoricPhoto";
import GlareHover from "@/components/GlareHover";
import StarBorder from "@/components/StarBorder";

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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* ── Cell A: Thuật ngữ recap ── */}
          <GlareHover
            width="100%"
            height="auto"
            background="#EDE6CE"
            borderRadius="0px"
            borderColor="#1A1A1A"
            glareColor="#ffffff"
            glareOpacity={0.25}
            glareAngle={-30}
            glareSize={300}
            className="flex flex-col !border-2"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="p-5 flex flex-col gap-3 w-full">
              <HistoricPhoto
                alt="Nền dân chủ Hy Lạp cổ đại"
                caption="Nền dân chủ Hy Lạp cổ đại"
                year="~500 TCN"
                aspect="wide"
                colorize={true}
                maxHeight="110px"
              />
              <StampTag tone="red" className="text-[9px] self-start">
                Về mặt thuật ngữ
              </StampTag>
              <h3 className="headline text-xl md:text-2xl text-ink">
                DEMOS + KRATOS
              </h3>
              <ul className="space-y-1.5">
                {[
                  ["Nguồn gốc", "Hy Lạp cổ đại, TK VII–VI TCN"],
                  ["Nghĩa gốc", "Nhân dân cai trị"],
                  ["Giản lược", "Quyền lực của nhân dân"],
                  ["Tính kế thừa", "Giữ nguyên đến ngày nay"],
                ].map(([k, v]) => (
                  <li key={k} className="flex gap-2 text-xs">
                    <span className="font-mono uppercase tracking-wide text-ink/50 shrink-0 w-24">{k}:</span>
                    <span className="serif text-ink/80">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </GlareHover>

          {/* ── Cell B: Mác–Lênin ── */}
          <GlareHover
            width="100%"
            height="auto"
            background="#EDE6CE"
            borderRadius="0px"
            borderColor="#1A1A1A"
            glareColor="#ffffff"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={300}
            className="flex flex-col !border-2"
            style={{ width: "100%", height: "auto" }}
          >
            <div className="p-5 flex flex-col gap-3 w-full">
              <HistoricPhoto
                alt="Karl Marx và Friedrich Engels"
                caption="Karl Marx & Friedrich Engels"
                year="1845"
                aspect="landscape"
                colorize={true}
                maxHeight="150px"
              />
              <StampTag tone="ink" className="text-[9px] self-start">
                Chủ nghĩa Mác–Lênin
              </StampTag>
              <h3 className="headline text-xl md:text-2xl text-ink">
                3 PHƯƠNG DIỆN
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {["Quyền lực", "Chế độ XH", "Tổ chức XH"].map((p) => (
                  <StampTag key={p} tone="red" className="text-[8px]">
                    {p}
                  </StampTag>
                ))}
              </div>
              <div className="space-y-2">
                {[
                  { label: "Quyền lực", desc: "Quyền lực thuộc về nhân dân; mọi quyền lực nhà nước vì nhân dân." },
                  { label: "Hình thức NN", desc: "Dân chủ là hình thái nhà nước — phạm trù lịch sử." },
                  { label: "Giá trị XH", desc: "Dân chủ là giá trị xã hội — phạm trù vĩnh viễn." },
                ].map((d) => (
                  <div key={d.label} className="border-l-2 border-blood pl-3">
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-blood block">{d.label}</span>
                    <span className="serif text-ink/80 text-xs">{d.desc}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="bg-ink text-cream px-2 py-1.5">
                  <span className="font-mono uppercase tracking-wide block text-[8px] text-cream/60">Lịch sử</span>
                  <span className="font-headline uppercase">Hình thái NN</span>
                </div>
                <div className="bg-blood text-cream px-2 py-1.5">
                  <span className="font-mono uppercase tracking-wide block text-[8px] text-cream/60">Vĩnh viễn</span>
                  <span className="font-headline uppercase">Giá trị XH</span>
                </div>
              </div>
            </div>
          </GlareHover>

          {/* ── Cell C: Hồ Chí Minh ── */}
          <div className="flex flex-col border-2 border-ink shadow-[4px_4px_0_#D32F2F]">
            <HistoricPhoto
              alt="Chủ tịch Hồ Chí Minh"
              caption="Chủ tịch Hồ Chí Minh"
              year="1946"
              aspect="landscape"
              colorize={false}
              maxHeight="170px"
            />
            <div className="bg-ink p-5 flex flex-col gap-3 flex-1">
              <StampTag tone="red" className="text-[9px] self-start">
                Tư tưởng Hồ Chí Minh
              </StampTag>
              <h3 className="headline text-xl md:text-2xl text-cream">
                DÂN LÀ CHỦ
              </h3>
              <div className="flex flex-col gap-2">
                {HCM_QUOTES.map((q, i) => (
                  <StarBorder
                    key={i}
                    as="div"
                    color="#D32F2F"
                    speed="5s"
                    className="w-full text-left"
                  >
                    <div className="px-3 py-2">
                      <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-blood/80 block mb-1">
                        {q.context}
                      </span>
                      <p className="serif italic text-cream text-xs leading-relaxed">
                        "{q.text}"
                      </p>
                    </div>
                  </StarBorder>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Conclusion callout */}
        <div className="mt-6">
          <ArchivalCard variant="blood" label="Tổng hợp" number="→">
            <p className="serif text-cream/90 leading-relaxed">
              Dân chủ là <strong>giá trị xã hội</strong> phản ánh quyền cơ bản của con người; là{" "}
              <strong>hình thức tổ chức nhà nước</strong> của giai cấp cầm quyền; có quá trình{" "}
              <strong>ra đời và phát triển</strong> cùng lịch sử xã hội nhân loại.
            </p>
          </ArchivalCard>
        </div>
      </div>
    </section>
  );
}
