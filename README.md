# Dân chủ và sự ra đời, phát triển của dân chủ
### Bảo tàng Kỹ thuật số Tương tác — MLN131

> *"Dân chủ là dân là chủ và dân làm chủ."*
> — Hồ Chí Minh

Trình chiếu trực quan tương tác hệ thống hoá nội dung học phần **Dân chủ và pháp luật** (MLN131): quan niệm về dân chủ (thuật ngữ, Mác–Lênin, Hồ Chí Minh) và tiến trình ra đời, phát triển các nền dân chủ trong lịch sử. Giao diện giữ phong cách **Revolutionary Constructivist** — lưới đỏ/trắng, typography khối, ảnh tư liệu, texture giấy cũ.

---

## Mục tiêu

Chuyển khái niệm lý luận chính trị phức tạp thành trải nghiệm thị giác có cấu trúc:

- **Giáo dục trực quan** — nguồn gốc *demoskratos*, ba quan điểm, lịch sử các nền dân chủ
- **Cầu nối khái niệm** — Hy Lạp cổ → phạm trù lịch sử (hình thái nhà nước) → giá trị vĩnh viễn (giá trị xã hội)
- **Tương tác** — menu mở rộng theo giai đoạn, ảnh lưu trữ, sơ đồ và trích dẫn

---

## Các phần (Sections)

| Section | ID | Nội dung |
|---|---|---|
| **Mở đầu** | `hero` | Tiêu đề *DÂN CHỦ LÀ GÌ?*, RotatingText (*NHÂN DÂN / QUYỀN LỰC / TỰ DO / BÌNH ĐẲNG*), trích Hồ Chí Minh, chân dung tư liệu |
| **Thuật ngữ** | `terminology` | *Demos + Kratos*, sơ đồ phân nhánh, TrueFocus / FuzzyText, ảnh Hy Lạp cổ |
| **Quan niệm** | `viewpoints` | Ba cột: thuật ngữ · Mác–Lênin (3 phương diện + bảng phạm trù) · Hồ Chí Minh (trích dẫn, HistoricPhoto) |
| **Lịch sử** | `timeline` | Infographic tiến trình 6 giai đoạn, FlowingMenu tương tác, ảnh từng era (`photoSrc` trong `ERAS`) |
| **Kết luận** | `conclusion` | Ba nền dân chủ hình thái nhà nước (chủ nô · tư sản · XHCN), BounceCards |
| **Footer** | — | Nguồn, credits, liên kết mục lục |

---

## Hệ thống thiết kế

**Revolutionary Constructivist** — poster tuyên truyền và tư liệu in ấn thời kỳ cách mạng, áp dụng cho chủ đề dân chủ.

| Token | Giá trị | Dùng cho |
|---|---|---|
| `ink` | `#1A1A1A` | Chữ chính, khối cấu trúc |
| `cream` / `paper` | `#F5F5DC` | Nền giấy cũ |
| `blood` | `#D32F2F` | Đỏ chủ đạo, nhấn mạnh, cờ |
| `bone` | `#EDE6CE` | Nền thẻ phụ |
| `flagYellow` | `#FFCD00` | Vàng sao — accent trên nền tối |

**Diagram accents (sơ đồ thuật ngữ):**

| Ý nghĩa | Màu |
|---|---|
| Demos / Nhân dân | `#D32F2F` (`blood`) |
| Kratos / Quyền lực | `#1565C0` |

**Typography:** `Archivo Black` / `Epilogue` (headline), `Newsreader` / `Crimson Text` (serif), `JetBrains Mono` (nhãn, phase).

**Pattern:** shadow cứng (`6px 6px 0`), StampTag xoay, thanh rule đỏ/đen, grain overlay.

---

## Tech stack

| Lớp | Công nghệ |
|---|---|
| Framework | React 19 + TypeScript |
| Build | Vite 5 |
| Styling | Tailwind CSS 3 (custom tokens) |
| Animation | GSAP 3, Motion (Framer) |
| Icons | Lucide React |
| Registry | shadcn CLI + ReactBits |

---

## Component chính

| Component | Vị trí | Vai trò |
|---|---|---|
| `SplitText` | `SectionHeader` | Tiêu đề section reveal từng ký tự |
| `RotatingText` | `Hero` | Luân phiên NHÂN DÂN / QUYỀN LỰC / … |
| `FuzzyText` / `TrueFocus` | `Terminology` | Sơ đồ Demos · Kratos |
| `FlowingMenu` | `DemocracyTimeline` | 6 giai đoạn, marquee hover, panel mở rộng |
| `HistoricPhoto` | Timeline, Viewpoints, Terminology | Ảnh tư liệu, lightbox, placeholder |
| `ViewpointCard` | `Viewpoints` | Thẻ quan điểm ML / HCM |
| `BounceCards` | `Conclusion` | Ba nền dân chủ |
| `Noise` | `Hero` | Texture nhiễu nền |
| `Nav` | Toàn site | Điều hướng cố định; chữ sáng trên Hero / Timeline |

### Thêm ảnh cho từng giai đoạn timeline

Trong `src/sections/DemocracyTimeline.tsx`, mỗi mục trong `ERAS` có trường `photoSrc`:

```ts
{
  id: "era-2",
  photoCaption: "Nền dân chủ Athens — chủ nô và công dân tự do",
  photoYear: "~447 TCN",
  photoSrc: "https://example.com/athens.jpg", // URL ảnh trực tiếp
  features: [ /* ... */ ],
}
```

`photoSrc` dùng cho panel `HistoricPhoto` khi mở dòng menu và thumbnail marquee khi hover.

---

## Cấu trúc dự án

```
src/
├── components/
│   ├── ui/
│   │   ├── Nav.tsx
│   │   ├── SectionHeader.tsx
│   │   ├── HistoricPhoto.tsx
│   │   ├── ArchivalCard.tsx
│   │   ├── ViewpointCard.tsx
│   │   ├── StampTag.tsx
│   │   └── ...
│   ├── FlowingMenu.tsx
│   ├── SplitText.tsx
│   ├── RotatingText.tsx
│   ├── FuzzyText.tsx
│   ├── TrueFocus.tsx
│   ├── BounceCards.tsx
│   └── Noise.tsx
├── sections/
│   ├── Hero.tsx
│   ├── Terminology.tsx
│   ├── Viewpoints.tsx
│   ├── DemocracyTimeline.tsx   # ERAS data + FlowingMenu
│   ├── Conclusion.tsx
│   └── Footer.tsx
├── App.tsx
├── main.tsx
└── index.css
```

Tài liệu ngữ cảnh thiết kế: `.cursor/rules/project-context.mdc`, `design.mdc`.

---

## Chạy dự án

**Yêu cầu:** Node.js 18+

```bash
npm install
npm run dev      # http://localhost:5173
npx tsc --noEmit
npm run build
npm run preview
```

Triển khai GitHub Pages: build output trong `dist/`; `public/404.html` hỗ trợ SPA redirect.

---

## Bối cảnh học thuật

**Học phần:** MLN131 — Dân chủ và pháp luật (Lý luận chính trị)  
**Học kỳ:** 9 · 2026

**Nội dung trọng tâm:**

1. **(a) Quan niệm về dân chủ** — thuật ngữ *demoskratos*; Mác–Lênin (quyền lực, hình thái nhà nước, nguyên tắc quản lý XH); Hồ Chí Minh (giá trị xã hội, thể chế, *dân làm chủ*).
2. **(b) Sự ra đời, phát triển** — từ cộng sản nguyên thủy đến dân chủ XHCN và mục tiêu tương lai; **ba nền dân chủ** với tư cách hình thái nhà nước.

**Nguồn kiểm chứng:** Giáo trình / đề cương học phần Dân chủ và pháp luật; ảnh minh hoạ từ nguồn công khai hoặc URL do người dùng cấu hình. Công cụ AI (ChatGPT, Gemini, NotebookLM) hỗ trợ tổ chức nội dung; khẳng định học thuật theo giáo trình.

---

## License

Dự án học thuật — không dùng cho thương mại.  
Ảnh tư liệu tham chiếu thuộc phạm vi sử dụng giáo dục / public domain khi có ghi nhận.
