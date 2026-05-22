// ─── TRÒ CHƠI GHÉP NỐI LỊCH SỬ ────────────────────────────────────────────────
// 14 cặp "Thách thức — Giải pháp" bao quát Chương 2, mục I (1945 – 1954).
// Dữ liệu dùng chung cho mini-game "Ghép nối Lịch sử" tại /game.

export type Phase = "1945–1946" | "1946–1950" | "1951–1954";

export interface Pair {
  id: number;
  phase: Phase;
  phaseLabel: string; // Short header (e.g. "Ngàn cân treo sợi tóc")
  category: string; // Issue tag (e.g. "KINH TẾ", "VĂN HOÁ", "QUÂN SỰ"...)
  challenge: {
    title: string;
    date: string;
    description: string;
  };
  solution: {
    title: string;
    date: string;
    description: string;
    result?: string;
  };
}

export const PAIRS: Pair[] = [
  {
    id: 1,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "Kinh tế · Nạn đói",
    challenge: {
      title: "Nạn đói Ất Dậu",
      date: "Cuối 1944 – đầu 1945",
      description:
        "Hơn 2 triệu đồng bào chết đói, kinh tế xơ xác, tài chính kiệt quệ, 50% ruộng đất bỏ hoang.",
    },
    solution: {
      title: "Tăng gia sản xuất · Tuần lễ vàng",
      date: "Cuối 1945 – đầu 1946",
      description:
        "Phát động \"hũ gạo tiết kiệm\", \"Tuần lễ vàng\", \"Quỹ độc lập\"; bãi bỏ thuế thân, giảm tô 25%.",
      result: "Đầu 1946: nạn đói cơ bản được đẩy lùi.",
    },
  },
  {
    id: 2,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "Văn hoá · Nạn dốt",
    challenge: {
      title: "95% dân số mù chữ",
      date: "Tháng 9/1945",
      description:
        "Chế độ thực dân để lại hơn 95% dân số mù chữ cùng nhiều hủ tục lạc hậu.",
    },
    solution: {
      title: "Phong trào Bình dân học vụ",
      date: "08/09/1945",
      description:
        "Chủ tịch Hồ Chí Minh phát động toàn dân học chữ Quốc ngữ — \"diệt giặc dốt\".",
      result: "Cuối 1946: hơn 2,5 triệu người biết đọc, biết viết.",
    },
  },
  {
    id: 3,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "Chính trị · Tính pháp lý",
    challenge: {
      title: "Chính quyền non trẻ, chưa được công nhận",
      date: "Sau 02/09/1945",
      description:
        "Hệ thống chính quyền cách mạng mới được thiết lập, thiếu thốn, chưa được quốc tế công nhận về địa vị pháp lý.",
    },
    solution: {
      title: "Tổng tuyển cử & Hiến pháp 1946",
      date: "06/01/1946 · 09/11/1946",
      description:
        "Tổ chức Tổng tuyển cử toàn quốc bầu Quốc hội khoá I, lập Chính phủ chính thức (02/03/1946) và thông qua Hiến pháp đầu tiên.",
      result: "Khẳng định tính hợp hiến, hợp pháp của chính quyền.",
    },
  },
  {
    id: 4,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "Quân sự · Nam Bộ",
    challenge: {
      title: "Pháp xâm lược Sài Gòn",
      date: "Đêm 22 rạng 23/09/1945",
      description:
        "Thực dân Pháp nổ súng đánh chiếm Sài Gòn – Chợ Lớn, mở đầu cuộc chiến tranh xâm lược Việt Nam lần thứ hai.",
    },
    solution: {
      title: "Nam Bộ kháng chiến · Nam tiến",
      date: "23/09/1945",
      description:
        "Hội nghị liên tịch hiệu triệu quân dân Nam Bộ đứng lên kháng chiến; Trung ương cử các chi đội \"Nam tiến\" chi viện.",
      result: "Bác Hồ phong tặng Nam Bộ danh hiệu \"Thành đồng Tổ quốc\".",
    },
  },
  {
    id: 5,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "Ngoại giao · Miền Bắc",
    challenge: {
      title: "20 vạn quân Tưởng tràn vào miền Bắc",
      date: "Từ cuối 08/1945",
      description:
        "Hơn 20 vạn quân Tưởng Giới Thạch và tay sai Việt Quốc, Việt Cách mang âm mưu \"diệt Cộng, cầm Hồ\", phá Việt Minh.",
    },
    solution: {
      title: "Hoà hoãn · Đảng \"tự giải tán\"",
      date: "11/11/1945",
      description:
        "Thực hiện sách lược \"hoà hoãn, nhân nhượng có nguyên tắc\"; đảm bảo lương thực cho quân Tưởng, mở rộng Chính phủ liên hiệp; Đảng tuyên bố \"tự giải tán\", rút vào hoạt động bí mật.",
      result: "Tránh mũi nhọn tấn công, bảo toàn lực lượng cách mạng.",
    },
  },
  {
    id: 6,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "Ngoại giao · Pháp–Tưởng",
    challenge: {
      title: "Hiệp ước Hoa – Pháp",
      date: "28/02/1946",
      description:
        "Pháp và Tưởng ký Hiệp ước Trùng Khánh, thoả thuận cho Pháp ra miền Bắc thay quân Tưởng — đặt Việt Nam vào thế vô cùng nguy hiểm.",
    },
    solution: {
      title: "Hiệp định Sơ bộ · Tạm ước 14/9",
      date: "06/03/1946 · 14/09/1946",
      description:
        "Trung ương ra Chỉ thị \"Hoà để tiến\" (09/03/1946); Chủ tịch Hồ Chí Minh ký Hiệp định Sơ bộ 06/3 và Tạm ước 14/9 để gạt nhanh quân Tưởng về nước, câu giờ xây dựng lực lượng.",
      result: "Ta loại bớt một kẻ thù, tranh thủ thời gian hoà bình chuẩn bị kháng chiến.",
    },
  },
  {
    id: 7,
    phase: "1945–1946",
    phaseLabel: "Ngàn cân treo sợi tóc",
    category: "An ninh · Nội phản",
    challenge: {
      title: "Âm mưu đảo chính Ôn Như Hầu",
      date: "Dự định 14/07/1946",
      description:
        "Đại Việt – Quốc dân đảng câu kết với Pháp, lợi dụng lúc quân Tưởng rút để âm mưu đảo chính lật đổ Chính phủ.",
    },
    solution: {
      title: "Phá Vụ án Ôn Như Hầu",
      date: "Rạng sáng 12/07/1946",
      description:
        "Công an cách mạng đột nhập trụ sở số 7 phố Ôn Như Hầu (Hà Nội), đập tan âm mưu lật đổ chính quyền.",
      result: "Giữ vững thành quả cách mạng giữa lòng Thủ đô.",
    },
  },
  {
    id: 8,
    phase: "1946–1950",
    phaseLabel: "Toàn quốc kháng chiến",
    category: "Quân sự · Bùng nổ",
    challenge: {
      title: "Tối hậu thư của Pháp",
      date: "18/12/1946",
      description:
        "Cuối 1946, Pháp liên tục khiêu khích, bắn đại bác gây thảm sát ở Hà Nội và gửi tối hậu thư đòi giải giáp lực lượng tự vệ của ta.",
    },
    solution: {
      title: "Lời kêu gọi Toàn quốc kháng chiến",
      date: "19/12/1946",
      description:
        "Thường vụ Trung ương Đảng phát động toàn dân kháng chiến; Chủ tịch Hồ Chí Minh ra Lời kêu gọi — \"Toàn dân, toàn diện, trường kỳ, tự lực cánh sinh\".",
      result: "Mở đầu cuộc kháng chiến chống Pháp trên quy mô cả nước.",
    },
  },
  {
    id: 9,
    phase: "1946–1950",
    phaseLabel: "Toàn quốc kháng chiến",
    category: "Quân sự · Việt Bắc",
    challenge: {
      title: "Pháp tấn công Việt Bắc",
      date: "Thu – Đông 1947",
      description:
        "Pháp huy động 15.000 quân tiến công lên căn cứ địa Việt Bắc, hòng tiêu diệt cơ quan đầu não kháng chiến của ta.",
    },
    solution: {
      title: "Chiến thắng Việt Bắc Thu – Đông",
      date: "Chỉ thị 15/10/1947",
      description:
        "Ban Thường vụ Trung ương Đảng ra chỉ thị \"Phá tan cuộc tấn công mùa đông của giặc Pháp\"; phát động chiến tranh du kích rộng khắp.",
      result: "75 ngày đêm: bẻ gãy mọi mũi tiến công, phá sản chiến lược \"đánh nhanh thắng nhanh\".",
    },
  },
  {
    id: 10,
    phase: "1946–1950",
    phaseLabel: "Toàn quốc kháng chiến",
    category: "Quân sự · Ngoại giao",
    challenge: {
      title: "Kế hoạch Rơ-ve · bao vây biên giới",
      date: "Từ 1949",
      description:
        "Pháp thực hiện Kế hoạch Rơ-ve, khoá chặt biên giới Việt – Trung; ta bị bao vây cô lập, cần mở rộng quan hệ quốc tế.",
    },
    solution: {
      title: "Chiến dịch Biên giới Thu – Đông",
      date: "16/09 – 17/10/1950",
      description:
        "Đầu 1950, Bác Hồ sang Trung Quốc, Liên Xô thiết lập quan hệ ngoại giao; Trung ương mở Chiến dịch Biên giới tiêu diệt sinh lực địch.",
      result: "Phá thế bao vây, khai thông biên giới, giành quyền chủ động chiến lược.",
    },
  },
  {
    id: 11,
    phase: "1951–1954",
    phaseLabel: "Đẩy mạnh kháng chiến",
    category: "Chính trị · Đường lối",
    challenge: {
      title: "Cần đường lối riêng cho mỗi nước Đông Dương",
      date: "Đầu những năm 1950",
      description:
        "Kháng chiến bước vào giai đoạn quyết liệt, Mỹ can thiệp sâu vào Đông Dương — đòi hỏi đường lối cách mạng phù hợp cho từng nước.",
    },
    solution: {
      title: "Đại hội Đảng toàn quốc lần II",
      date: "Tháng 02/1951",
      description:
        "Mỗi nước Đông Dương có một đảng riêng. Tại Việt Nam, Đảng ra hoạt động công khai lấy tên Đảng Lao động Việt Nam, thông qua Chính cương và Điều lệ mới.",
      result: "Củng cố vai trò lãnh đạo, đưa kháng chiến đến thắng lợi.",
    },
  },
  {
    id: 12,
    phase: "1951–1954",
    phaseLabel: "Đẩy mạnh kháng chiến",
    category: "Kinh tế · Nông dân",
    challenge: {
      title: "Khát vọng \"người cày có ruộng\"",
      date: "Giai đoạn 1953",
      description:
        "Giai cấp nông dân — động lực chính của cách mạng — khao khát ruộng đất; cần huy động sức người sức của chi viện tiền tuyến.",
    },
    solution: {
      title: "Luật Cải cách ruộng đất",
      date: "04/12/1953",
      description:
        "Trung ương ban hành Cương lĩnh ruộng đất (11/1953); Quốc hội thông qua Luật cải cách ruộng đất: triệt để giảm tô, giảm tức, chia ruộng cho bần – cố nông.",
      result: "Bồi dưỡng sức dân, nức lòng bộ đội tiền tuyến.",
    },
  },
  {
    id: 13,
    phase: "1951–1954",
    phaseLabel: "Đẩy mạnh kháng chiến",
    category: "Quân sự · Điện Biên Phủ",
    challenge: {
      title: "Kế hoạch Nava · Pháo đài Điện Biên",
      date: "Tháng 07/1953",
      description:
        "Pháp – Mỹ thông qua \"Kế hoạch Nava\" hòng chuyển bại thành thắng trong 18 tháng, xây Điện Biên Phủ thành \"pháo đài khổng lồ không thể công phá\".",
    },
    solution: {
      title: "Chiến dịch Điện Biên Phủ",
      date: "13/03 – 07/05/1954",
      description:
        "Bộ Chính trị mở tiến công chiến lược Đông – Xuân 1953-1954; quyết định mở Chiến dịch Điện Biên Phủ (06/12/1953).",
      result: "56 ngày đêm: tiêu diệt toàn bộ cứ điểm, đập tan Kế hoạch Nava.",
    },
  },
  {
    id: 14,
    phase: "1951–1954",
    phaseLabel: "Đẩy mạnh kháng chiến",
    category: "Ngoại giao · Genève",
    challenge: {
      title: "Kết thúc chiến tranh trên bàn đàm phán",
      date: "Từ 08/05/1954",
      description:
        "Cần buộc Pháp công nhận độc lập chủ quyền của ba nước Đông Dương, giữa hội nghị có nhiều nước lớn gây sức ép.",
    },
    solution: {
      title: "Hiệp định Genève",
      date: "21/07/1954",
      description:
        "Mở mặt trận ngoại giao tại Hội nghị Genève; kiên trì, linh hoạt, đoàn Việt Nam ký kết thành công Hiệp định.",
      result: "Kết thúc thắng lợi cuộc kháng chiến chống Pháp, giải phóng miền Bắc.",
    },
  },
];

export const PHASE_COLORS: Record<Phase, { bg: string; text: string; accent: string }> = {
  "1945–1946": { bg: "bg-blood", text: "text-cream", accent: "#D32F2F" },
  "1946–1950": { bg: "bg-ink", text: "text-cream", accent: "#1A1A1A" },
  "1951–1954": { bg: "bg-flagYellow", text: "text-ink", accent: "#FFCD00" },
};
