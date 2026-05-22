import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Aurora from "@/components/Aurora";
import CountUp from "@/components/CountUp";
import AnimatedContent from "@/components/AnimatedContent";
import StampTag from "@/components/ui/StampTag";
import ImageLightbox, { type LightboxImage } from "@/components/ui/ImageLightbox";

interface TimelineItem {
  date: string;
  title: string;
  body: string;
  images?: LightboxImage[];
}

const TIMELINE: TimelineItem[] = [
  {
    date: "02 · 1951",
    title: "Đại hội II của Đảng",
    body: "Đảng ra hoạt động công khai với tên gọi Đảng Lao động Việt Nam. Xác định nhiệm vụ: đuổi Pháp - Mỹ, giành độc lập, 'người cày có ruộng'.",
    images: [
      {
        src: "https://tuyenquang.dcs.vn/Image/Large/2022211161323_71931.jpg",
        alt: "Toàn cảnh Đại hội đại biểu toàn quốc lần II tại Chiêm Hoá, Tuyên Quang · 02/1951",
        caption: "Đại hội II · Chiêm Hoá, Tuyên Quang · Tháng 2/1951",
        credit: "Ảnh tư liệu · TTXVN",
        year: "02/1951",
      },
      {
        src: "https://baotanglichsu.vn/DataFiles/Uploaded/image/dhoi2.gif",
        alt: "Chủ tịch Hồ Chí Minh đọc Báo cáo chính trị tại Đại hội II",
        caption: "Chủ tịch Hồ Chí Minh đọc Báo cáo chính trị",
        credit: "Ảnh tư liệu · TTXVN",
        year: "1951",
      },
    ],
  },
  {
    date: "1953",
    title: "Cải cách ruộng đất",
    body: "Bồi dưỡng sức dân — khẩu hiệu 'người cày có ruộng' được thực thi bước đầu, giải phóng năng lực sản xuất nông thôn.",
    images: [
      {
        src: "https://thinhvuongvietnam.com/Content/UploadFiles/EditorFiles/images/2023/Quy4/cthcm-cuoi-195321102023104648.jpg",
        alt: "Nông dân nhận ruộng đất trong cuộc Cải cách ruộng đất 1953",
        caption: "Nông dân nhận ruộng · Cải cách ruộng đất · 1953",
        credit: "Ảnh tư liệu · Public Domain",
        year: "1953",
      },
      {
        src: "https://upload.wikimedia.org/wikipedia/commons/4/49/C%E1%BA%A3i_c%C3%A1ch_ru%E1%BB%99ng_%C4%91%E1%BA%A5t_th%E1%BA%AFng_l%E1%BB%A3i%2C_n%C3%B4ng_d%C3%A2n_vui_s%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91t_v%C4%83n_t%E1%BB%B1_c%C5%A9.jpg",
        alt: "Lễ chia ruộng cho nông dân · Người cày có ruộng · 1953",
        caption: "Lễ chia ruộng · Khẩu hiệu 'Người cày có ruộng'",
        credit: "Ảnh tư liệu · Public Domain",
        year: "1953",
      },
    ],
  },
  {
    date: "13 · 03 · 1954",
    title: "Mở màn Điện Biên Phủ",
    body: "Đại đoàn 312 nổ súng tấn công cứ điểm Him Lam. Kế hoạch Nava bắt đầu lung lay.",
    images: [
      {
        src: "https://i.pinimg.com/1200x/90/ed/d2/90edd2e525b6798c8ea8f9a0c3bcf7cd.jpg",
        alt: "Bộ đội Đại đoàn 312 tiến công cứ điểm Him Lam · 13/03/1954",
        caption: "Đại đoàn 312 tiến công Him Lam · 13/03/1954",
        credit: "Ảnh: TTXVN",
        year: "03/1954",
      },
    ],
  },
  {
    date: "07 · 05 · 1954",
    title: "Bắt sống De Castries",
    body: "Sau 56 ngày đêm 'khoét núi, ngủ hầm, mưa dầm, cơm vắt' — lá cờ 'Quyết chiến quyết thắng' tung bay trên nóc hầm chỉ huy Pháp.",
    images: [
      {
        src: "https://dienbientv.vn/dataimages/201905/original/images2766589_tuong_de_cat_oerc.jpg",
        alt: "Tướng De Castries bị bắt sống tại hầm chỉ huy · Điện Biên Phủ 07/05/1954",
        caption: "Tướng De Castries bị bắt sống tại hầm chỉ huy",
        credit: "Ảnh: Triệu Đại · TTXVN",
        year: "07/05/1954",
      },
      {
        src: "https://cdnmedia.baotintuc.vn/Upload/3qVxwVtNEPp6Wp9kkF77g/files/2021/05/07/nhiep-anh-070521-6.jpg",
        alt: "Lá cờ 'Quyết chiến quyết thắng' tung bay trên nóc hầm De Castries",
        caption: "Lá cờ 'Quyết chiến quyết thắng' trên nóc hầm De Castries",
        credit: "Ảnh: TTXVN",
        year: "07/05/1954",
      },
      {
        src: "https://file3.qdnd.vn/data/images/0/2024/04/14/upload_2166/tubinhphapdienbienphu1.jpg?dpi=150&quality=100&w=870",
        alt: "Tù binh Pháp bị bắt giữ sau chiến dịch Điện Biên Phủ · 07/05/1954",
        caption: "Tù binh Pháp sau chiến dịch Điện Biên Phủ",
        credit: "Ảnh: TTXVN",
        year: "07/05/1954",
      },
    ],
  },
  {
    date: "21 · 07 · 1954",
    title: "Ký Hiệp định Genève",
    body: "Pháp rút khỏi Đông Dương. Miền Bắc hoàn toàn giải phóng sau gần 100 năm đô hộ — bắt đầu hành trình thống nhất đất nước.",
    images: [
      {
        src: "https://cdnmedia.baotintuc.vn/Upload/a7srThwxbojBCucvUWgnxA/files/2024/07/21/Geneva-21072024.jpg",
        alt: "Phái đoàn Việt Nam ký kết Hiệp định Genève về Đông Dương · 21/07/1954",
        caption: "Hội nghị Genève · Phái đoàn Việt Nam ký kết · 21/07/1954",
        credit: "Ảnh tư liệu · Public Domain",
        year: "21/07/1954",
      },
      {
        src: "https://bcp.cdnchinhphu.vn/334894974524682240/2024/4/25/1gionevoa-17140129931551422933117.jpg",
        alt: "Phái đoàn Việt Nam ký kết Hiệp định Genève về Đông Dương · 21/07/1954",
        caption: "Hội nghị Genève · Phái đoàn Việt Nam ký kết · 21/07/1954",
        credit: "Ảnh tư liệu · Public Domain",
        year: "21/07/1954",
      },
    ],
  },
];

export default function Victory() {
  // Single shared lightbox state for all timeline galleries
  const [lightbox, setLightbox] = useState<{
    images: LightboxImage[];
    index: number;
  } | null>(null);

  const openAt = (images: LightboxImage[], index: number) =>
    setLightbox({ images, index });

  return (
    <section
      id="victory"
      className="relative py-24 md:py-32 bg-cream grain overflow-hidden"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[45vh] opacity-70">
        <Aurora
          colorStops={["#D32F2F", "#FFCD00", "#D32F2F"]}
          amplitude={1.1}
          blend={0.55}
          speed={0.6}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="1951 — 1954"
          eyebrow="Đẩy mạnh kháng chiến đến thắng lợi"
          title="CHẤN ĐỘNG ĐỊA CẦU"
          tagline='"Chín năm làm một Điện Biên — Nên vành hoa đỏ, nên thiên sử vàng." — Tố Hữu'
        />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10">
          {/* Sticky stats panel */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 bg-blood text-cream p-7 md:p-9 shadow-[10px_10px_0_#1A1A1A] border-4 border-ink">
              <StampTag tone="cream" rotate={-2}>
                Điện Biên Phủ
              </StampTag>
              <div className="mt-6 font-headline text-[clamp(4rem,12vw,9rem)] leading-none text-cream">
                <CountUp to={56} duration={2.6} />
              </div>
              <div className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-cream/90">
                ngày đêm quyết chiến
              </div>

              <div className="mt-8 rule w-20 bg-cream" />

              <div className="mt-6 grid grid-cols-2 gap-3">
                <BigNum value={16_000} label="quân Pháp bị tiêu diệt / bắt" />
                <BigNum value={1} suffix=" lá cờ" label="Quyết chiến quyết thắng" />
                <BigNum value={62} label="máy bay bị phá huỷ" />
              </div>

              <div className="mt-8 rule w-20 bg-cream" />
              <p className="serif italic mt-5 text-cream/90 text-sm leading-relaxed">
                "Một dân tộc Việt Nam nhỏ bé đã đánh bại cả một đế quốc thực
                dân lớn mạnh — và thức tỉnh toàn bộ phong trào giải phóng dân
                tộc thế giới."
              </p>
            </div>
          </div>

          {/* Timeline with per-event thumbnail galleries */}
          <div className="lg:col-span-8">
            <ol className="relative space-y-5 before:absolute before:left-4 md:before:left-5 before:top-3 before:bottom-3 before:w-[3px] before:bg-ink">
              {TIMELINE.map((t, i) => (
                <AnimatedContent key={t.date} distance={60} delay={i * 0.08}>
                  <li className="relative pl-14 md:pl-16">
                    <span className="absolute left-0 md:left-1 top-0 grid h-10 w-10 place-items-center bg-ink text-cream font-headline text-sm border-2 border-blood">
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    <div className="bg-bone border-2 border-ink p-5 md:p-6 shadow-[5px_5px_0_#1A1A1A] hover:-translate-y-1 transition-transform">
                      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                        <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.3em] bg-ink text-cream px-2 py-1">
                          {t.date}
                        </span>
                        <span className="font-mono text-[10px] text-ink/60">
                          CHƯƠNG {String(i + 1).padStart(2, "0")} / {TIMELINE.length}
                        </span>
                      </div>
                      <h3 className="headline text-2xl md:text-[1.75rem] uppercase leading-tight text-ink">
                        {t.title}
                      </h3>
                      <p className="serif mt-3 leading-relaxed text-ink/90">
                        {t.body}
                      </p>

                      {/* Thumbnail gallery — uniform size, opens lightbox */}
                      {t.images && t.images.length > 0 && (
                        <ThumbnailStrip
                          images={t.images}
                          onOpen={(idx) => openAt(t.images!, idx)}
                        />
                      )}
                    </div>
                  </li>
                </AnimatedContent>
              ))}
            </ol>
          </div>
        </div>

        {/* Genève declaration block */}
        <div className="mt-16 border-4 border-ink bg-ink text-cream p-8 md:p-12 shadow-[10px_10px_0_#D32F2F]">
          <div className="flex items-center gap-3 mb-5">
            <StampTag tone="red" rotate={-1}>
              Hiệp định Genève
            </StampTag>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/70">
              21 · 07 · 1954
            </span>
          </div>
          <h2 className="my-5 headline text-[clamp(1.6rem,4vw,3rem)] leading-tight text-cream">
            Giải phóng hoàn toàn miền Bắc
          </h2>
          <p className="serif text-cream/85 italic mt-6 max-w-3xl leading-relaxed">
            Sau gần 100 năm đô hộ, gần một thập kỷ kháng chiến trường kỳ, lá cờ
            đỏ sao vàng được kéo lên trên toàn bộ miền Bắc. Nhưng chân lý
            <span className="text-blood font-semibold">
              {" "}"Nước Việt Nam là một, dân tộc Việt Nam là một"{" "}
            </span>
            tiếp tục được tranh đấu cho tới ngày thống nhất hoàn toàn
            30/04/1975.
          </p>
        </div>
      </div>

      {/* Shared lightbox for all timeline thumbnails */}
      <ImageLightbox
        open={lightbox !== null}
        images={lightbox?.images ?? []}
        index={lightbox?.index ?? 0}
        onClose={() => setLightbox(null)}
        onIndexChange={(i) =>
          setLightbox((prev) => (prev ? { ...prev, index: i } : prev))
        }
      />
    </section>
  );
}

/* ────────────────────────────────────────────────────────────────────
   THUMBNAIL STRIP — contact-sheet style preview row.
   All thumbs are uniform squares regardless of source aspect ratio,
   so the layout never breaks. Clicking pops up the full uncropped
   image in the lightbox with a smooth fade + zoom animation.
   ──────────────────────────────────────────────────────────────────── */
function ThumbnailStrip({
  images,
  onOpen,
}: {
  images: LightboxImage[];
  onOpen: (index: number) => void;
}) {
  return (
    <div className="mt-5 pt-5 border-t-2 border-dashed border-ink/25">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <svg
            viewBox="0 0 24 24"
            className="w-3.5 h-3.5 text-blood"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <rect x="3" y="6" width="18" height="14" rx="1" />
            <circle cx="12" cy="13" r="3.5" />
            <path d="M8 6l1.5-2h5L16 6" />
          </svg>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink/70">
            Tư liệu ảnh · {String(images.length).padStart(2, "0")} bản
          </span>
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-ink/40">
          Nhấp để phóng to
        </span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        {images.map((img, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => onOpen(idx)}
            className="group relative w-20 h-20 md:w-24 md:h-24 shrink-0 border-2 border-ink overflow-hidden shadow-[3px_3px_0_#1A1A1A] hover:-translate-y-1 hover:shadow-[5px_5px_0_#D32F2F] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blood cursor-zoom-in"
            aria-label={`Phóng to: ${img.alt}`}
          >
            {img.src ? (
              <img
                src={img.src}
                alt={img.alt}
                className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
              />
            ) : (
              <div className="absolute inset-0 bg-ink/5 flex items-center justify-center">
                <svg
                  viewBox="0 0 48 48"
                  className="h-6 w-6 opacity-25"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect x="4" y="8" width="40" height="32" rx="2" stroke="#1A1A1A" strokeWidth="2" />
                  <circle cx="16" cy="20" r="4" stroke="#1A1A1A" strokeWidth="2" />
                  <path d="M4 36l10-10 8 8 6-6 10 8" stroke="#1A1A1A" strokeWidth="2" strokeLinejoin="round" />
                </svg>
              </div>
            )}

            {/* Index badge */}
            <span className="absolute top-0 left-0 bg-ink text-cream font-mono text-[9px] px-1.5 py-0.5 leading-none">
              {String(idx + 1).padStart(2, "0")}
            </span>

            {/* Hover zoom icon */}
            <span className="absolute bottom-1 right-1 bg-blood text-cream grid place-items-center w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <svg
                viewBox="0 0 24 24"
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
              >
                <path d="M5 5h5M5 5v5M5 5l6 6M19 19h-5M19 19v-5M19 19l-6-6" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function BigNum({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  return (
    <div className="bg-ink border border-cream/15 p-3 shadow-[3px_3px_0_#1A1A1A]">
      <div className="font-headline text-3xl md:text-4xl text-flagYellow leading-none">
        <CountUp to={value} separator="," duration={2.4} />
      </div>
      {suffix && (
        <div className="font-headline text-base md:text-lg text-flagYellow leading-none mt-0.5">
          {suffix}
        </div>
      )}
      <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-cream/80 leading-snug">
        {label}
      </div>
    </div>
  );
}
