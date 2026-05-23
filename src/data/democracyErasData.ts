// ─── 6 GIAI ĐOẠN PHÁT TRIỂN DÂN CHỦ ─────────────────────────────────────────
// Dùng chung cho DemocracyTimeline, AIClassifier, GameAI.

export const ERAS = [
  {
    id: "era-1",
    index: 0,
    text: "Cộng sản nguyên thủy",
    year: "~17.000 TCN",
    label: "Chưa có nền dân chủ",
    period: "Cổ đại",
    demType: "— (Tiền đề)",
    demColor: "bg-ink/20 text-ink",
    photoCaption: "Xã hội nguyên thủy — thị tộc, bộ lạc",
    photoYear: "~17.000 TCN",
    photoSrc:
      "https://luatduonggia.vn/wp-content/uploads/2025/06/cong-xa-nguyen-thuy-la-gi-tim-hieu-ve-cong-xa-nguyen-thuy.jpg",
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
    index: 1,
    text: "Chiếm hữu nô lệ",
    year: "~447 TCN",
    label: "Nền dân chủ chủ nô",
    period: "Cổ đại",
    demType: "Dân chủ chủ nô",
    demColor: "bg-bone text-ink",
    photoCaption: "Chế độ chiếm hữu nô lệ",
    photoYear: "~447 TCN",
    photoSrc:
      "https://cdn.accgroup.vn/wp-content/uploads/2022/12/9.2-5-hinh-thai-kinh-te-xa-hoi-tu-truoc-toi-nay-co-nhung-dac-diem-gi-noi-bat-1.jpg",
    features: [
      "LLSX phát triển → chế độ tư hữu, giai cấp hình thành",
      "Dân tham gia bầu nhà nước",
      '"Dân" chỉ gồm chủ nô + công dân tự do',
      "Nô lệ (đa số) bị loại khỏi quyền dân chủ",
      "Nền dân chủ đầu tiên trong lịch sử nhà nước",
    ],
  },
  {
    id: "era-3",
    index: 2,
    text: "Phong kiến",
    year: "TK XIII",
    label: "Quân chủ phong kiến",
    period: "Trung cổ",
    demType: "Nền quân chủ PK",
    demColor: "bg-smoke text-cream",
    photoCaption: "Chế độ phong kiến — nhà nước chuyên chế",
    photoYear: "TK XIII",
    photoSrc:
      "https://congdankhuyenhoc.qltns.mediacdn.vn/zoom/700_438/449484899827462144/2024/1/24/cacvikhaoquantronglexuongdanhkhoathinamdinhdaunamdinhngay27thang12nam1897-1706104184937485134775-8-0-633-1000-crop-1706104395710283177462.jpg",
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
    index: 3,
    text: "Tư bản chủ nghĩa",
    year: "1789",
    label: "Nền dân chủ tư sản",
    period: "Cuối TK XIV – đầu TK XV",
    demType: "Dân chủ tư sản",
    demColor: "bg-bone text-ink",
    photoCaption: "Cách mạng tư sản Pháp :)",
    photoCaptionIcon: "https://img.icons8.com/windows/32/FFFFFF/assassins-creed.png",
    photoCaptionIconAlt: "assassins-creed",
    photoYear: "1789",
    photoSrc:
      "https://image.api.playstation.com/vulcan/img/rnd/202010/0220/lX4FGJHDVSy8szMS7fRrevmY.jpg",
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
    index: 4,
    text: "Xã hội chủ nghĩa",
    year: "1917",
    label: "Nền dân chủ vô sản",
    period: "Từ 1917",
    demType: "Dân chủ XHCN",
    demColor: "bg-blood text-cream",
    photoCaption: "Cách mạng Tháng Mười Nga 1917",
    photoYear: "1917",
    photoSrc:
      "https://media-cdn-v2.laodong.vn/storage/newsportal/2022/11/6/1113505/CM-Thang-10-Nga.jpg",
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
    index: 5,
    text: "Cộng sản chủ nghĩa",
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

export type DemocracyEra = (typeof ERAS)[number];

/** Short labels for AI / game UI */
export const ERA_LABELS = ERAS.map((e) => e.label);

export function getEraByIndex(index: number): DemocracyEra {
  const era = ERAS[index];
  if (!era) throw new Error(`Invalid era index: ${index}`);
  return era;
}

export function pickTwoRandomEraIndices(): [number, number] {
  const a = Math.floor(Math.random() * ERAS.length);
  let b = Math.floor(Math.random() * ERAS.length);
  while (b === a) b = Math.floor(Math.random() * ERAS.length);
  return [a, b];
}
