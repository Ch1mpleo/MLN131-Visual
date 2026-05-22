import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import CountUp from "@/components/CountUp";
import AnimatedContent from "@/components/AnimatedContent";
import RotatingText from "@/components/RotatingText";
import StampTag from "@/components/ui/StampTag";
import CardSwap, { Card } from "@/components/CardSwap";
import PixelCard from "@/components/PixelCard";
import ImageLightbox, { type LightboxImage } from "@/components/ui/ImageLightbox";

const LEGACY_IMAGE: LightboxImage = {
  src: "https://i.pinimg.com/736x/85/3a/d6/853ad6e7918f261e15d3cf46a7674dc2.jpg",
  alt: "Thế hệ Việt Nam hôm nay — tiếp nối tinh thần 1954",
  caption: "Thế hệ kế tiếp · Tinh thần trường kỳ sống mãi trong lòng dân tộc",
  credit: "Ảnh tư liệu hiện đại",
  year: "Hôm nay",
};

const LESSONS = [
  {
    no: "I",
    title: "SỰ TỈNH TÁO",
    vi: "Xác định ưu tiên",
    body: 'Giải quyết dứt điểm "giặc đói, giặc dốt" trước khi đánh giặc ngoại xâm. Trong deadline hôm nay: fix lỗi ngắn hạn không được bỏ quên gốc rễ.',
    quote: "Thấy rõ đâu là gốc, đâu là ngọn.",
  },
  {
    no: "II",
    title: "SỰ LINH HOẠT",
    vi: "Dĩ bất biến, ứng vạn biến",
    body: "Mục tiêu độc lập không đổi — phương pháp phải đổi theo tình thế. Hôm nay là 'dĩ bất biến' về sứ mệnh, 'ứng vạn biến' về công nghệ.",
    quote: "Mục tiêu bất biến. Phương pháp vạn biến.",
  },
  {
    no: "III",
    title: "SỰ TÍCH LŨY",
    vi: "Lấy ngắn nuôi dài",
    body: "1945–1946 bồi dưỡng nội lực. 1954 gặt hái Điện Biên Phủ. Học hành và sự nghiệp: từng dự án nhỏ là gạch cho 'Điện Biên' cá nhân sau này.",
    quote: "Ngắn là hạt — dài là rừng.",
  },
  {
    no: "IV",
    title: "SỰ KIÊN TRÌ",
    vi: "Tư duy trường kỳ",
    body: "Chín năm. Không giàu xổi. Thắng từng bước bền vững. Trong công việc, đừng sợ đường dài — sợ mất phương hướng giữa đường dài.",
    quote: "Không giàu xổi. Thắng từng bước.",
  },
];

export default function Lessons() {
  const [posterOpen, setPosterOpen] = useState(false);

  return (
    <section
      id="lessons"
      className="relative py-24 md:py-32 bg-bone grain overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="Phần IV"
          eyebrow="Vận dụng hiện đại — Liên hệ thực tiễn"
          title="BỐN BÀI HỌC XƯƠNG MÁU"
          tagline="Từ chiến khu đến phòng họp hội đồng quản trị — bốn nguyên lý kháng chiến vẫn vận hành trong học tập, sự nghiệp và quản trị doanh nghiệp."
        />

        <div className="mt-12 flex flex-wrap items-center gap-4 font-headline uppercase text-[clamp(1.25rem,3.5vw,2.75rem)] leading-tight">
          <span className="text-ink">Hôm nay ta đánh</span>
          <RotatingText
            texts={["deadline", "burnout", "trì trệ", "tự mãn", "sợ hãi"]}
            mainClassName="inline-flex overflow-hidden bg-blood text-cream px-4 py-1"
            staggerFrom="last"
            staggerDuration={0.025}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-120%" }}
            transition={{ type: "spring", damping: 28, stiffness: 380 }}
            rotationInterval={2000}
          />
          <span className="text-ink">— bằng tinh thần của 1954.</span>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          {LESSONS.map((l, i) => (
            <AnimatedContent key={l.no} distance={60} delay={i * 0.08}>
              <article
                className={`group relative p-7 md:p-8 h-full border-4 ${
                  i % 2 === 0
                    ? "bg-cream border-ink"
                    : "bg-ink text-cream border-blood"
                } shadow-[8px_8px_0_${i % 2 === 0 ? "#D32F2F" : "#D32F2F"}]`}
                style={{
                  boxShadow: `8px 8px 0 ${i % 2 === 0 ? "#D32F2F" : "#D32F2F"}`,
                }}
              >
                <header className="flex items-start justify-between mb-5">
                  <span
                    className={`font-headline text-6xl md:text-7xl leading-none ${
                      i % 2 === 0 ? "text-blood" : "text-flagYellow"
                    }`}
                  >
                    {l.no}
                  </span>
                  <StampTag
                    tone={i % 2 === 0 ? "ink" : "cream"}
                    rotate={2}
                    className="text-[10px]"
                  >
                    Bài học {l.no}
                  </StampTag>
                </header>

                <h3 className="headline text-2xl md:text-3xl uppercase leading-tight mb-2">
                  {l.title}
                </h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.3em] opacity-70 mb-5">
                  — {l.vi}
                </p>
                <p className="serif text-base md:text-lg leading-relaxed mb-6">
                  {l.body}
                </p>
                <blockquote
                  className={`serif italic border-l-4 pl-4 text-sm ${
                    i % 2 === 0
                      ? "border-blood text-ink/80"
                      : "border-flagYellow text-cream/85"
                  }`}
                >
                  {l.quote}
                </blockquote>
              </article>
            </AnimatedContent>
          ))}
        </div>

        {/* ══════════════════════════════════════════════════════════════════
            🖼️  LEGACY POSTER — dedicated highlight block for the portrait
            image. Image keeps its natural proportions on the left; a bold
            propaganda-poster-style headline sits on the right. The image is
            clickable and opens full-resolution in the shared lightbox.
            ══════════════════════════════════════════════════════════════════ */}
        <AnimatedContent distance={80}>
          <div className="mt-20 relative">
            {/* Floating "Di sản" tag — pokes out above the card */}
            <div className="absolute -top-5 left-6 md:left-10 z-10">
              <StampTag tone="red" rotate={-3}>
                Di sản · 1954 → Hôm nay
              </StampTag>
            </div>

            <div className="relative bg-ink text-cream border-4 border-ink shadow-[14px_14px_0_#D32F2F] overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                {/* ─── IMAGE SIDE — natural portrait, never cropped ─── */}
                <button
                  type="button"
                  onClick={() => setPosterOpen(true)}
                  className="relative md:col-span-5 lg:col-span-5 group bg-ink overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-flagYellow cursor-zoom-in"
                  aria-label={`Phóng to: ${LEGACY_IMAGE.alt}`}
                >
                  <div className="relative w-full h-full min-h-[360px] md:min-h-[460px] flex items-center justify-center">
                    <img
                      src={LEGACY_IMAGE.src}
                      alt={LEGACY_IMAGE.alt}
                      className="block w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />

                    {/* Red gradient tint — propaganda-poster feel */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-ink/80 via-ink/10 to-blood/30 mix-blend-multiply pointer-events-none" />

                    {/* Archival grain */}
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
                      }}
                    />

                    {/* Vertical edge — flag-yellow rule */}
                    <div className="absolute top-0 bottom-0 right-0 w-1 bg-flagYellow" />
                  </div>

                  {/* Zoom hint on hover */}
                  <div className="absolute top-4 right-4 bg-blood text-cream grid place-items-center w-10 h-10 border-2 border-cream opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <svg
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                    >
                      <path d="M5 5h5M5 5v5M5 5l6 6M19 19h-5M19 19v-5M19 19l-6-6" strokeLinecap="round" />
                    </svg>
                  </div>

                  {/* Caption strip at bottom of image */}
                  <div className="absolute bottom-0 left-0 right-0 bg-blood text-cream font-mono text-[10px] uppercase tracking-[0.35em] px-4 py-2.5 flex items-center justify-between pointer-events-none">
                    <span>Thế hệ kế tiếp</span>
                    <span className="text-flagYellow">Nhấp để phóng to</span>
                  </div>
                </button>

                {/* ─── TEXT SIDE ─── */}
                <div className="md:col-span-7 lg:col-span-7 relative p-8 md:p-10 lg:p-14 flex flex-col justify-center gap-6">
                  {/* Decorative corner ticks */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blood" />
                    <span className="w-2 h-2 bg-flagYellow" />
                    <span className="w-2 h-2 bg-cream/40" />
                  </div>

                  <div className="font-mono text-[10px] md:text-xs uppercase tracking-[0.4em] text-cream/55">
                    Bài học V · ngoài trang sử
                  </div>

                  <h3 className="headline text-[clamp(1.75rem,4vw,3.25rem)] uppercase leading-[1.05] text-cream">
                    Tinh thần <span className="text-flagYellow">1954</span>
                    <br />
                    sống mãi trong dân tộc
                  </h3>

                  <div className="flex items-center gap-2">
                    <span className="h-[3px] w-12 bg-blood" />
                    <span className="h-[3px] w-28 bg-cream" />
                  </div>

                  <p className="serif italic text-base md:text-lg text-cream/90 leading-relaxed max-w-xl">
                    Từ <em>"hũ gạo cứu đói"</em> đến giảng đường hôm nay — từ
                    chiến sĩ áo xanh đến lập trình viên, kỹ sư AI — ngọn lửa
                    trường kỳ vẫn cháy.
                  </p>

                  <p className="serif text-base md:text-lg text-cream/80 leading-relaxed max-w-xl">
                    Lịch sử không ngủ. Nó{" "}
                    <span className="text-blood font-semibold not-italic">
                      đang sống
                    </span>{" "}
                    trong mỗi quyết định của thế hệ hôm nay — mỗi dòng code,
                    mỗi bài thuyết trình, mỗi startup giờ đây vẫn mang DNA
                    của{" "}
                    <span className="text-flagYellow">Điện Biên Phủ</span>.
                  </p>

                  <div className="pt-4 mt-2 border-t border-cream/15 flex flex-wrap items-center justify-between gap-3">
                    <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.3em] text-cream/50">
                      {LEGACY_IMAGE.credit}
                    </span>
                    <span className="font-headline text-xs md:text-sm tracking-[0.3em] text-flagYellow">
                      — VNR202 · 2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimatedContent>

        <ImageLightbox
          open={posterOpen}
          images={[LEGACY_IMAGE]}
          index={0}
          onClose={() => setPosterOpen(false)}
          onIndexChange={() => {}}
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-6">
            <StampTag tone="red">Case Study · FPT 2025</StampTag>
            <h3 className="mt-6 headline text-[clamp(2rem,5vw,3.5rem)] uppercase leading-tight text-ink">
              Từ “hũ gạo cứu đói” đến{" "}
              <span className="text-blood">
                <CountUp to={70_000} duration={2.5} separator="," />
              </span>{" "}
              tỷ VND
            </h3>
            <p className="serif mt-5 text-lg text-ink/85 leading-relaxed max-w-xl">
              Doanh thu năm 2025 của tập đoàn FPT là minh chứng sống động cho
              nguyên lý <em>“lấy ngắn nuôi dài”</em> — dòng tiền ngắn hạn từ
              dịch vụ CNTT nuôi các khoản đầu tư dài hạn vào AI, Cloud và bán
              dẫn. Không “giàu xổi”. Không nản chí. Từng bước bền vững.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4">
              <Pill value={70000} suffix="B" label="doanh thu 2025" />
              <Pill value={37} label="năm thành lập" />
              <Pill value={82000} label="nhân sự toàn cầu" />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#hero"
                className="bg-ink text-cream px-5 py-2.5 font-headline uppercase text-sm tracking-wide shadow-[3px_3px_0_#D32F2F] hover:-translate-y-0.5 transition-transform"
              >
                ↑ Về đầu trang
              </a>
              <a
                href="#victory"
                className="border-2 border-ink px-5 py-2.5 font-headline uppercase text-sm tracking-wide hover:bg-ink hover:text-cream transition-colors"
              >
                Xem lại Điện Biên
              </a>
            </div>
          </div>

          <div className="lg:col-span-6 relative min-h-[28rem]">
            <div
              className="relative h-[28rem] md:h-[30rem] pr-10"
              style={{ perspective: "900px" }}
            >
              <CardSwap
                cardDistance={36}
                verticalDistance={48}
                delay={3400}
                pauseOnHover={true}
                width={380}
                height={260}
              >
                <Card className="!bg-cream !text-ink !border-4 !border-ink !rounded-none overflow-hidden">
                  <div className="h-full p-6 flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
                      Trong học tập
                    </span>
                    <h4 className="headline text-2xl mt-2 uppercase leading-tight">
                      Không học đối phó
                    </h4>
                    <p className="serif mt-3 text-sm leading-relaxed flex-1">
                      Tránh deadline-driven. Hướng tới{" "}
                      <strong>tích luỹ năng lực</strong> như cách Bình dân học
                      vụ xoá mù chữ — từng con chữ, từng bài học.
                    </p>
                  </div>
                </Card>
                <Card className="!bg-ink !text-cream !border-4 !border-blood !rounded-none overflow-hidden">
                  <div className="h-full p-6 flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
                      Trong công việc
                    </span>
                    <h4 className="headline text-2xl mt-2 uppercase text-flagYellow leading-tight">
                      Fix & improve
                    </h4>
                    <p className="serif mt-3 text-sm leading-relaxed flex-1 text-cream/90">
                      Dập lỗi hệ thống (ngắn hạn) + cải tiến quy trình (dài
                      hạn). Hai việc song song — như vừa chống giặc đói vừa
                      chuẩn bị kháng chiến.
                    </p>
                  </div>
                </Card>
                <Card className="!bg-blood !text-cream !border-4 !border-ink !rounded-none overflow-hidden">
                  <div className="h-full p-6 flex flex-col">
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80">
                      Trong quản trị
                    </span>
                    <h4 className="headline text-2xl mt-2 uppercase leading-tight">
                      Ngắn nuôi dài
                    </h4>
                    <p className="serif mt-3 text-sm leading-relaxed flex-1 text-cream/95">
                      FPT: dịch vụ CNTT nuôi AI, Cloud, bán dẫn. Lời dạy 1946
                      vẫn còn nguyên giá trị — đừng cắt vốn cho tương lai để
                      sống qua quý này.
                    </p>
                  </div>
                </Card>
              </CardSwap>
            </div>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-5">
          <PixelCard variant="pink" className="!rounded-none !bg-cream !border-2 !border-ink !aspect-auto h-60">
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
                Công cụ hỗ trợ
              </span>
              <h4 className="mt-2 headline text-2xl uppercase text-ink">
                AI có đạo đức
              </h4>
              <p className="serif text-sm text-ink/80 mt-2">
                ChatGPT · Gemini · NotebookLM — dùng để sáng tạo nội dung, không để đối
                phó.
              </p>
            </div>
          </PixelCard>

          <PixelCard variant="yellow" className="!rounded-none !bg-ink !border-2 !border-blood !aspect-auto h-60">
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/70">
                Nguồn kiểm chứng
              </span>
              <h4 className="mt-2 headline text-2xl uppercase text-flagYellow">
                Liêm chính học thuật
              </h4>
              <p className="serif text-sm text-cream/85 mt-2">
                Giáo trình Lịch sử Đảng · Báo cáo thường niên FPT 2025.
              </p>
            </div>
          </PixelCard>

          <PixelCard variant="blue" className="!rounded-none !bg-blood !border-2 !border-ink !aspect-auto h-60">
            <div className="absolute inset-0 p-6 flex flex-col justify-end">
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-cream/80">
                Giá trị sáng tạo
              </span>
              <h4 className="mt-2 headline text-2xl uppercase text-cream">
                Lịch sử = mô hình quản trị
              </h4>
              <p className="serif text-sm text-cream/90 mt-2">
                Chuyển hoá lịch sử thành khung tư duy quản trị bản thân hiện
                đại.
              </p>
            </div>
          </PixelCard>
        </div>
      </div>
    </section>
  );
}

function Pill({
  value,
  label,
  suffix = "",
}: {
  value: number;
  label: string;
  suffix?: string;
}) {
  return (
    <div className="bg-cream border-2 border-ink p-3 shadow-[4px_4px_0_#1A1A1A]">
      <div className="font-headline text-2xl md:text-3xl text-ink leading-none">
        <CountUp to={value} separator="," duration={2.2} />
        {suffix}
      </div>
      <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.25em] text-ink/70">
        {label}
      </div>
    </div>
  );
}
