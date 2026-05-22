import SectionHeader from "@/components/ui/SectionHeader";
import ArchivalCard from "@/components/ui/ArchivalCard";
import CountUp from "@/components/CountUp";
import AnimatedContent from "@/components/AnimatedContent";
import { ScrollVelocity } from "@/components/ScrollVelocity";
import HistoricPhoto from "@/components/ui/HistoricPhoto";

export default function Context() {
  return (
    <section
      id="context"
      className="relative py-24 md:py-32 bg-cream grain overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="Phần I"
          eyebrow="Trước Cách mạng Tháng Tám"
          title="MỘT CỔ HAI TRÒNG"
          tagline='Đêm trước giành chính quyền: Pháp và Nhật cấu kết, bóp nghẹt Đông Dương trong hai vòng xiềng xích.'
        />

        <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          <AnimatedContent distance={80} delay={0}>
            <ArchivalCard
              label="CHÍNH TRỊ · 09/1940"
              number="I"
              variant="cream"
            >
              <p className="mb-3">
                Pháp đầu hàng, cấu kết cùng Nhật: một bên giữ quyền cai trị,
                một bên biến Đông Dương thành căn cứ và{" "}
                <em>“kho vựa lương thực”</em> cho chiến tranh.
              </p>
              <p className="mb-3">
                <strong className="text-blood">09/03/1945</strong> — Nhật đảo
                chính Pháp. Chính phủ Trần Trọng Kim chỉ là bù nhìn, không
                quyền lực thực tế.
              </p>
              <p>
                Nhật đầu hàng Đồng minh → <strong>khoảng trống quyền lực</strong>{" "}
                — thời cơ vàng.
              </p>
            </ArchivalCard>
          </AnimatedContent>

          <AnimatedContent distance={80} delay={0.12}>
            <ArchivalCard
              label="KINH TẾ · KIỆT QUỆ"
              number="II"
              variant="ink"
            >
              <p className="mb-3">
                Chính sách <em>“nhổ lúa trồng đay”</em>: nhân dân bị cưỡng bức
                phá ruộng, phục vụ nhu cầu chiến tranh của Nhật Bản.
              </p>
              <p className="mb-3">
                Thu mua gạo giá rẻ mạt. Tích trữ lương thực cho quân đội.
              </p>
              <p>
                Lạm phát phi mã: giá gạo bật lên{" "}
                <strong className="text-blood">hàng trăm lần</strong> chỉ trong
                vài năm.
              </p>
            </ArchivalCard>
          </AnimatedContent>

          <AnimatedContent distance={80} delay={0.24}>
            <ArchivalCard
              label="XÃ HỘI · ẤT DẬU 1945"
              number="III"
              variant="blood"
            >
              <p className="mb-3">
                Nạn đói lịch sử năm Ất Dậu cướp đi hơn{" "}
                <strong>hai triệu đồng bào</strong>. Nhiều làng quê chết
                50–80% dân số.
              </p>
              <p>
                95% dân số mù chữ — hệ quả của chính sách ngu dân nhiều thập
                niên dưới ách thực dân.
              </p>
            </ArchivalCard>
          </AnimatedContent>
        </div>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-start">
          <HistoricPhoto
            src="https://vcdn1-vnexpress.vnecdn.net/2015/01/09/12-9406-1420769930.jpg?w=680&h=0&q=100&dpr=2&fit=crop&s=jfsZVILGF--946VL-4nhpg"
            alt="Nạn đói năm Ất Dậu 1945 — hơn 2 triệu đồng bào chết đói"
            caption="Nạn đói Ất Dậu 1945"
            credit="Ảnh tư liệu · Public Domain"
            year="1945"
            aspect="landscape"
          />
          <HistoricPhoto
            src="https://c.files.bbci.co.uk/C01E/production/_103228194_phapnhat.jpg"
            alt="Nhật đảo chính Pháp ngày 09/03/1945 — khoảng trống quyền lực hình thành"
            caption="09/03/1945 · Nhật đảo chính Pháp"
            credit="Ảnh tư liệu · Public Domain"
            year="1945"
            aspect="landscape"
          />
        </div>

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatBlock value={1858} caption="năm Pháp đổ bộ · mở đầu đô hộ" />
          <StatBlock value={87} suffix=" năm" caption="Việt Nam dưới ách thực dân Pháp" />
          <StatBlock value={2_000_000} caption="đồng bào chết đói · Ất Dậu 1945" />
          <StatBlock value={95} suffix="%" caption="dân số mù chữ dưới ách thực dân" />
        </div>

        <div className="mt-14 relative border-y-2 border-ink overflow-hidden bg-ink text-cream">
          <ScrollVelocity
            texts={[
              "NHỔ LÚA · TRỒNG ĐAY · NẠN ĐÓI · ẤT DẬU · MỘT CỔ HAI TRÒNG · ",
              "PHÁP - NHẬT · BÙ NHÌN · THỜI CƠ VÀNG · CÁCH MẠNG THÁNG TÁM · ",
            ]}
            velocity={40}
            className="font-headline text-cream"
            scrollerClassName="!font-headline !text-cream !text-2xl !md:text-3xl uppercase tracking-tight py-2"
          />
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  value,
  caption,
  suffix = "",
}: {
  value: number;
  caption: string;
  suffix?: string;
}) {
  return (
    <AnimatedContent distance={40}>
      <div className="relative bg-bone border-2 border-ink p-3 md:p-4 shadow-[5px_5px_0_#1A1A1A] overflow-hidden">
        <div className="font-headline text-[clamp(1.4rem,3.2vw,2.25rem)] leading-none text-blood truncate">
          <CountUp to={value} duration={2.4} separator="," />
          {suffix}
        </div>
        <div className="mt-2 font-mono text-[9px] md:text-[10px] tracking-[0.2em] uppercase text-ink/80 leading-snug">
          {caption}
        </div>
      </div>
    </AnimatedContent>
  );
}