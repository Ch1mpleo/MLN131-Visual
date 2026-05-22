import SectionHeader from "@/components/ui/SectionHeader";
import TextType from "@/components/TextType";
import AnimatedContent from "@/components/AnimatedContent";
import SpotlightCard from "@/components/SpotlightCard";
import StampTag from "@/components/ui/StampTag";
import CountUp from "@/components/CountUp";
import HistoricPhoto from "@/components/ui/HistoricPhoto";

const DOCTRINE = [
  {
    char: "TD",
    title: "Toàn dân",
    body: "Mọi người dân, không phân biệt giai cấp, dân tộc, tôn giáo, đều là chiến sĩ.",
  },
  {
    char: "TD",
    title: "Toàn diện",
    body: "Chiến tranh trên mọi mặt trận: quân sự, chính trị, kinh tế, văn hoá, ngoại giao.",
  },
  {
    char: "TK",
    title: "Trường kỳ",
    body: "Không nôn nóng. Thắng từng bước, bồi dưỡng nội lực, kiên trì đến cùng.",
  },
  {
    char: "TL",
    title: "Tự lực cánh sinh",
    body: "Dựa vào sức mình là chính. Viện trợ là quý — nhưng không phụ thuộc.",
  },
];

export default function Resistance() {
  return (
    <section
      id="resistance"
      className="relative py-24 md:py-32 bg-ink text-cream overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      >
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="tac-grid"
              width="48"
              height="48"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 48 0 L 0 0 0 48"
                fill="none"
                stroke="#D32F2F"
                strokeWidth="0.5"
                opacity="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tac-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <StampTag tone="red">1946 — 1950</StampTag>
            <span className="font-mono text-xs tracking-[0.3em] uppercase text-cream/70">
              Toàn quốc kháng chiến
            </span>
          </div>
          <h2 className="headline text-[clamp(1.75rem,4.5vw,3.5rem)] leading-[1.05] text-cream uppercase tracking-monumental max-w-3xl">
            THÀ HY SINH <span className="text-blood">TẤT CẢ</span>, CHỨ NHẤT ĐỊNH KHÔNG CHỊU MẤT NƯỚC
          </h2>
          <div className="flex items-center gap-2 pt-1">
            <span className="h-[3px] w-12 bg-blood" />
            <span className="h-[3px] w-28 bg-cream" />
          </div>
        </div>

        {/* Row 1 — Lời kêu gọi (left) × Chiến dịch 1947 (right) */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <div className="relative bg-cream text-ink p-6 md:p-8 border-4 border-blood shadow-[10px_10px_0_#D32F2F]">
              <div className="flex items-center justify-between mb-5 border-b-2 border-ink pb-3">
                <span className="font-mono text-xs uppercase tracking-[0.3em]">
                  Lời kêu gọi toàn quốc kháng chiến
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.3em] bg-blood text-cream px-2 py-1">
                  19 · 12 · 1946
                </span>
              </div>

              {/* Portrait + typing text — portrait slides in from left to sync with the typing reveal */}
              <div className="flex flex-col sm:flex-row gap-5 md:gap-6">
                <AnimatedContent
                  direction="horizontal"
                  distance={60}
                  duration={0.9}
                  delay={0.1}
                  className="shrink-0 self-start"
                >
                  <figure className="relative w-36 sm:w-40 md:w-44 lg:w-48 border-2 border-ink bg-ink shadow-[5px_5px_0_#1A1A1A]">
                    <div className="relative aspect-[3/4] overflow-hidden bg-ink/10">
                      <img
                        src="https://file3.qdnd.vn/data/images/0/2016/11/21/vuongthuy/08112016vthuy88.jpg"
                        alt="Chủ tịch Hồ Chí Minh · Lời kêu gọi Toàn quốc kháng chiến 19/12/1946"
                        className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                      />

                      {/* Archival grain overlay — echoes the typing cursor's pulse */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-25 mix-blend-multiply"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.3 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
                        }}
                      />
                    </div>

                    {/* Pulse accent dot — visually syncs with the cursor blink */}
                    <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-blood border-2 border-cream animate-pulse" />
                  </figure>
                </AnimatedContent>

                <div className="flex-1 min-w-0">
                  <TextType
                    as="p"
                    text={[
                      'Hỡi đồng bào toàn quốc! Chúng ta muốn hoà bình, chúng ta phải nhân nhượng. Nhưng chúng ta càng nhân nhượng, thực dân Pháp càng lấn tới, vì chúng quyết tâm cướp nước ta một lần nữa!',
                      'Không! Chúng ta thà hy sinh tất cả, chứ nhất định không chịu mất nước, nhất định không chịu làm nô lệ.',
                      'Bất kỳ đàn ông, đàn bà, bất kỳ người già, người trẻ, không chia tôn giáo, đảng phái, dân tộc — hễ là người Việt Nam thì phải đứng lên đánh thực dân Pháp để cứu Tổ quốc.',
                    ]}
                    typingSpeed={28}
                    pauseDuration={2400}
                    deletingSpeed={18}
                    loop={true}
                    showCursor={true}
                    cursorCharacter="▍"
                    className="serif text-base md:text-lg leading-relaxed min-h-[14rem] md:min-h-[12rem] block"
                    cursorClassName="text-blood"
                  />
                  <p className="mt-5 text-right font-mono text-xs uppercase tracking-[0.3em] opacity-70">
                    — Chủ tịch Hồ Chí Minh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <AnimatedContent distance={80}>
              <SpotlightCard
                className="!bg-ink !border !border-cream/20 !rounded-none !p-7 !text-cream shadow-[8px_8px_0_#D32F2F]"
                spotlightColor="rgba(211, 47, 47, 0.45)"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-70">
                    Chiến dịch
                  </span>
                  <span className="headline text-4xl text-flagYellow">
                    1947
                  </span>
                </div>
                <h3 className="headline text-2xl md:text-3xl uppercase leading-tight mb-3">
                  Việt Bắc Thu – Đông
                </h3>
                <p className="serif leading-relaxed text-cream/85">
                  Phá sản chiến lược <em>"đánh nhanh thắng nhanh"</em> của
                  Pháp. Bảo toàn căn cứ địa cách mạng — xác lập thế cầm cự,
                  chuẩn bị phản công.
                </p>
              </SpotlightCard>
            </AnimatedContent>
          </div>
        </div>

        {/* Row 2 — Photo (left) × Chiến dịch 1950 (right) */}
        <div className="mt-6 lg:mt-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <HistoricPhoto
              src="https://danviet.ex-cdn.com/files/f1/upload/4-2019/images/2019-12-19/Loi-dan-cua-Tong-chi-huy-Vo-Nguyen-Giap-voi-mat-tran-Ha-Noi-truoc-ngay-Toan-quoc-khang-chien-4-1576714639-width480height316.jpg"
              alt="Chiến sĩ Vệ quốc quân trên đường ra mặt trận · 19/12/1946"
              caption="Toàn quốc kháng chiến · Chiến sĩ ra trận theo Lời kêu gọi của Bác Hồ"
              credit="Ảnh tư liệu · Public Domain"
              year="1946"
              colorize={true}
            />
          </div>

          <div className="lg:col-span-5">
            <AnimatedContent distance={80} delay={0.1}>
              <SpotlightCard
                className="!bg-blood !border !border-ink !rounded-none !p-7 !text-cream shadow-[8px_8px_0_#1A1A1A]"
                spotlightColor="rgba(255, 205, 0, 0.55)"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-80">
                    Chiến dịch
                  </span>
                  <span className="headline text-4xl text-flagYellow">
                    1950
                  </span>
                </div>
                <h3 className="headline text-2xl md:text-3xl uppercase leading-tight mb-3">
                  Biên Giới Thu Đông
                </h3>
                <p className="serif leading-relaxed text-cream/95">
                  Nhằm phá bỏ sự phong toả của địch, tiêu diệt sinh lực địch và
                  mở rộng căn cứ địa, tháng 6-1950 Đảng quyết định mở chiến dịch
                  Biên giới. Trải qua{" "}
                  <strong>30 ngày đêm chiến đấu (16-9 đến 17-10-1950)</strong>,
                  ta giành thắng lợi to lớn, kết thúc thời kỳ chiến đấu trong
                  vòng vây, mở ra cục diện mới đưa cuộc kháng chiến sang giai
                  đoạn phát triển cao hơn.
                </p>
              </SpotlightCard>
            </AnimatedContent>
          </div>
        </div>

        <div className="mt-14">
          <div className="flex items-center gap-4 mb-8">
            <StampTag tone="cream">Đường lối</StampTag>
            <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] text-cream/70">
              Bốn nguyên tắc chiến lược
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {DOCTRINE.map((d, i) => (
              <AnimatedContent key={d.title} distance={60} delay={i * 0.08}>
                <div className="group relative bg-cream text-ink p-6 h-full border-2 border-cream hover:border-blood hover:-translate-y-1 transition-all duration-300 shadow-[4px_4px_0_#D32F2F]">
                  <div className="flex items-start justify-between mb-4">
                    <span className="font-headline text-5xl text-blood leading-none">
                      {d.char}
                    </span>
                    <span className="font-mono text-[10px] text-ink/60">
                      0{i + 1} / 04
                    </span>
                  </div>
                  <h4 className="headline text-xl uppercase mb-3">
                    {d.title}
                  </h4>
                  <p className="serif text-sm leading-relaxed">{d.body}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-3">
          <BigStat value={3000} suffix="+" caption="ngày kháng chiến" />
          <BigStat value={9} caption="năm trường kỳ" />
          <BigStat value={1} suffix=" dân tộc" caption="thống nhất ý chí" />
          <BigStat value={0} caption="đầu hàng" />
        </div>
      </div>
    </section>
  );
}

function BigStat({
  value,
  caption,
  suffix = "",
}: {
  value: number;
  caption: string;
  suffix?: string;
}) {
  return (
    <div className="border border-cream/20 p-4 bg-ink/60 backdrop-blur-sm">
      <div className="font-headline text-3xl md:text-4xl text-flagYellow leading-none">
        <CountUp to={value} duration={2.4} separator="," />
        {suffix}
      </div>
      <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.25em] text-cream/80">
        {caption}
      </div>
    </div>
  );
}
