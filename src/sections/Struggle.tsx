import SectionHeader from "@/components/ui/SectionHeader";
import ArchivalCard from "@/components/ui/ArchivalCard";
import AnimatedContent from "@/components/AnimatedContent";
import CountUp from "@/components/CountUp";
import StampTag from "@/components/ui/StampTag";
import HistoricPhoto from "@/components/ui/HistoricPhoto";

const THREE_ENEMIES = [
  {
    tag: "GIẶC ĐÓI",
    headline: "Hũ gạo cứu đói · Tuần lễ vàng · Quỹ độc lập",
    body: `Nhân dân nhường cơm sẻ áo, tăng gia sản xuất không ngừng.
Đầu năm 1946 nạn đói cơ bản được đẩy lùi — một kỳ tích chỉ sau vài tháng giành chính quyền.`,
  },
  {
    tag: "GIẶC DỐT",
    headline: "Bình dân học vụ · Xoá mù chữ toàn dân",
    body: `Lớp học mở khắp làng xã, từ đình làng đến bờ ruộng.
Cuối năm 1946: hơn 2,5 triệu người biết đọc biết viết — bước đầu "khai dân trí".`,
  },
  {
    tag: "GIẶC NGOẠI XÂM",
    headline: "Dĩ bất biến, ứng vạn biến",
    body: `Hoà hoãn quân Tưởng ở phía Bắc, đánh Pháp ở phía Nam.
Rồi ký Hiệp định Sơ bộ 6/3/1946 và Tạm ước 14/9/1946 — mua thời gian chuẩn bị kháng chiến lâu dài.`,
  },
];

export default function Struggle() {
  return (
    <section
      id="struggle"
      className="relative py-24 md:py-32 bg-bone grain overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="1945 — 1946"
          eyebrow="Xây dựng & Bảo vệ chính quyền non trẻ"
          title="NGÀN CÂN TREO SỢI TÓC"
          tagline="Chính quyền vừa lập đã bị bao vây. Ba nhiệm vụ cấp bách ra đời ngày 03/09/1945 — chưa đầy 24 giờ sau Tuyên ngôn Độc lập."
        />

        <div className="mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5">
            <div className="bg-ink text-cream p-7 md:p-9 shadow-[8px_8px_0_#D32F2F] sticky top-28">
              <StampTag tone="cream" rotate={2}>
                Thời cuộc
              </StampTag>
              <h3 className="mt-6 headline text-3xl md:text-4xl leading-tight">
                20 vạn quân Tưởng phía Bắc.{" "}
                <span className="text-flagYellow">
                  2 vạn quân Anh phía Nam.
                </span>{" "}
                6 vạn quân Nhật chờ giải giáp.
              </h3>
              <div className="mt-6 rule-red w-20" />
              <p className="serif italic text-cream/85 mt-5 leading-relaxed">
                Thuận lợi duy nhất: nhân dân tin tưởng tuyệt đối vào Đảng và
                Bác Hồ. Hệ thống xã hội chủ nghĩa thế giới đang hình thành —
                mầm mống đồng minh dài hạn.
              </p>

              <div className="mt-8 grid grid-cols-2 gap-3">
                <MiniStat label="cử tri đi bầu" value={89} suffix="%" />
                <MiniStat
                  label="người biết chữ"
                  value={2_500_000}
                  separator=","
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-5">
            {THREE_ENEMIES.map((enemy, i) => (
              <AnimatedContent key={enemy.tag} distance={60} delay={i * 0.1}>
                <ArchivalCard
                  label={`Mặt trận 0${i + 1}`}
                  number={`0${i + 1}`}
                  variant={i === 2 ? "blood" : i === 1 ? "ink" : "cream"}
                  className="hover:translate-x-1"
                >
                  <div className="mb-3">
                    <StampTag
                      tone={i === 2 ? "cream" : i === 1 ? "cream" : "red"}
                      rotate={-1}
                    >
                      {enemy.tag}
                    </StampTag>
                  </div>
                  <h4 className="headline text-2xl md:text-3xl uppercase leading-tight mb-3">
                    {enemy.headline}
                  </h4>
                  <p className="serif whitespace-pre-line opacity-95">
                    {enemy.body}
                  </p>
                </ArchivalCard>
              </AnimatedContent>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <HistoricPhoto
            src="https://laodongthudo.vn/stores/news_dataimages/quocdai/082019/30/17/4634_Ynh_11.jpg"
            alt="Lớp Bình dân học vụ · Xoá mù chữ toàn dân 1945–1946"
            caption="Bình dân học vụ · Nhân dân học chữ dưới ánh đèn dầu, năm 1945"
            credit="Ảnh tư liệu · Public Domain"
            year="1945–46"
            aspect="landscape"
          />
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="bg-cream border-4 border-ink p-7 md:p-9 shadow-[6px_6px_0_#D32F2F]">
            <StampTag tone="red">Củng cố chính quyền</StampTag>
            <ul className="mt-6 serif text-lg space-y-4">
              <LiStep
                date="06 · 01 · 1946"
                text="Tổng tuyển cử toàn quốc — 89% cử tri đi bầu."
              />
              <LiStep
                date="02 · 03 · 1946"
                text="Quốc hội khoá I họp phiên đầu tiên tại Nhà hát lớn Hà Nội."
              />
              <LiStep
                date="12 · 07 · 1946"
                text="Đập tan âm mưu đảo chính tại vụ án Ôn Như Hầu."
              />
              <LiStep
                date="09 · 11 · 1946"
                text="Thông qua Hiến pháp đầu tiên của nước Việt Nam Dân chủ Cộng hoà."
              />
            </ul>
          </div>

          <div className="bg-blood text-cream p-7 md:p-9 border-4 border-ink shadow-[6px_6px_0_#1A1A1A]">
            <StampTag tone="cream" rotate={3}>
              Sách lược ngoại giao
            </StampTag>
            <p className="serif mt-6 text-lg font-normal text-cream leading-relaxed">
              Trước 06/03/1946: hoà hoãn quân Tưởng để rảnh tay đánh Pháp ở
              miền Nam. Sau 06/03/1946: ký Hiệp định Sơ bộ và Tạm ước 14/9 để
              đẩy 20 vạn quân Tưởng về nước — đổi lấy thời gian vàng chuẩn bị
              kháng chiến trường kỳ.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function MiniStat({
  label,
  value,
  suffix = "",
  separator = "",
}: {
  label: string;
  value: number;
  suffix?: string;
  separator?: string;
}) {
  return (
    <div className="bg-cream/10 border border-cream/30 p-3">
      <div className="font-headline text-3xl md:text-4xl text-flagYellow leading-none">
        <CountUp to={value} duration={2.2} separator={separator} />
        {suffix}
      </div>
      <div className="font-mono text-[9px] uppercase tracking-[0.25em] mt-2 text-cream/80">
        {label}
      </div>
    </div>
  );
}

function LiStep({ date, text }: { date: string; text: string }) {
  return (
    <li className="flex gap-4 items-start">
      <span className="shrink-0 font-mono text-xs md:text-sm uppercase tracking-[0.15em] bg-ink text-cream px-3 py-1.5 shadow-[3px_3px_0_#D32F2F] border border-blood">
        {date}
      </span>
      <span className="text-ink pt-0.5">{text}</span>
    </li>
  );
}
