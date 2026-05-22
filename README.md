# Nước Việt Nam Là Một · 1945–1954
### Interactive Digital Museum — VNR202

> *"Sông có thể cạn, núi có thể mòn, song chân lý ấy không bao giờ thay đổi."*
> — Hồ Chí Minh

An interactive visual document / digital museum covering the Vietnamese Revolution from 1945 to 1954, built as an academic presentation for the **VNR202 History of the Communist Party of Vietnam** course (Semester 9).

---

## What It Does

The site functions as an **Interactive Digital Museum** — converting dry historical data and complex events into a living, scroll-driven visual experience. It bridges two worlds:

- **Historical archive** of the Vietnamese resistance (1945–1954)
- **Modern management framework** — drawing direct parallels between revolutionary strategy and contemporary study/career/business management

### Sections

| Section | Period | Content |
|---|---|---|
| **Hero — Nước Việt Nam Là Một** | — | Immersive landing with the iconic dual-slogan layout inspired by revolutionary propaganda posters |
| **Bối cảnh — Một Cổ Hai Tròng** | Pre-1945 | French-Japanese collaboration, the Great Famine of Ất Dậu (2M dead, 90% illiterate), animated statistics |
| **Ba Giặc — Ngàn Cân Treo Sợi Tóc** | 1945–1946 | The three urgent enemies (hunger, ignorance, invasion), election of January 6 1946, diplomatic manoeuvres |
| **Kháng Chiến — Thà Hy Sinh Tất Cả** | 1946–1950 | Full-text typewriter playback of *Lời kêu gọi toàn quốc kháng chiến*, Việt Bắc & Border campaigns, the 4-principle war doctrine |
| **Chấn Động Địa Cầu** | 1951–1954 | 56-day Điện Biên Phủ countdown, 5-step annotated timeline, Geneva Accords |
| **Bốn Bài Học Xương Máu** | Present | 4 timeless leadership lessons + FPT Group 2025 case study (70,000 billion VND revenue) as modern proof |

---

## Design System

**"Revolutionary Constructivist"** aesthetic — inspired by 1940s Vietnamese propaganda posters.

| Token | Value | Usage |
|---|---|---|
| `ink` | `#1A1A1A` | Primary text, structural elements |
| `paper` / `cream` | `#F5F5DC` | Main background (aged newsprint feel) |
| `blood` | `#D32F2F` | Primary red — passion, sacrifice, the flag |
| `bone` | `#EDE6CE` | Secondary background for cards |
| `flagYellow` | `#FFCD00` | Star yellow — accent on dark backgrounds |

**Typography:**
- **Headlines:** `Archivo Black` / `Epilogue` — ultra-bold, all-caps, tight tracking, monumental scale
- **Body:** `Newsreader` / `Crimson Text` — readable serif, academic/archival feel
- **Mono labels:** `JetBrains Mono` — dates, tags, classification labels

**Signature patterns:** hard drop shadows (`6px 6px 0 #1A1A1A`), rotated stamp tags, red/black rule bars, grain texture overlay.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 + TypeScript |
| Build tool | Vite 5 |
| Styling | Tailwind CSS 3 with custom design tokens |
| Animations | GSAP 3 + `@gsap/react`, Motion (Framer) |
| 3D / Shaders | Three.js + `@react-three/fiber`, OGL |
| Component registry | shadcn CLI + **ReactBits** registry |
| Icon set | Lucide React |

---

## ReactBits Components Used

| Component | Where | Effect |
|---|---|---|
| `SplitText` | Hero, all section headers | GSAP-powered char-by-char headline reveal |
| `RotatingText` | Hero, Lessons | Cycle through *"giặc đói / dốt / ngoại xâm"* and modern adversaries |
| `Dither` | Hero backdrop | WebGL retro-dithered red noise overlay |
| `Aurora` | Victory section header | Flowing red/yellow aurora — dawn of 1954 |
| `CountUp` | Context, Struggle, Victory, Lessons | Spring-animated stat counters |
| `ScrollVelocity` | Context | Scroll-speed-reactive slogan marquee |
| `ScrollReveal` | Struggle | Word-by-word blur + opacity reveal |
| `ScrollFloat` | Victory | Parallax-shift headline |
| `AnimatedContent` | Every section | Scroll-triggered entrance for cards & blocks |
| `TextType` | Resistance | Typewriter playback of the 1946 national call |
| `SpotlightCard` | Resistance | Cursor-tracking radial spotlight on campaign cards |
| `CardSwap` | Lessons | 3D-perspective card stack for FPT case studies |
| `PixelCard` | Lessons | Pixel-dissolve hover for sources/ethics cards |

---

## Project Structure

```
src/
├── components/
│   ├── ui/               # Custom design-system primitives
│   │   ├── Nav.tsx           — Fixed tactical-map navigation bar
│   │   ├── SectionHeader.tsx — Phase stamp + SplitText headline + rule
│   │   ├── ArchivalCard.tsx  — Bordered archival card with label/number
│   │   └── StampTag.tsx      — Rotated propaganda-style stamp tag
│   ├── SplitText.tsx     # ReactBits — GSAP char split
│   ├── RotatingText.tsx  # ReactBits — phrase cycling
│   ├── Dither.tsx        # ReactBits — WebGL dither background
│   ├── Aurora.tsx        # ReactBits — gradient aurora background
│   ├── CountUp.tsx       # ReactBits — animated counter
│   ├── ScrollVelocity.tsx# ReactBits — velocity-reactive marquee
│   ├── ScrollReveal.tsx  # ReactBits — scroll-scrubbed reveal
│   ├── ScrollFloat.tsx   # ReactBits — parallax float
│   ├── AnimatedContent.tsx # ReactBits — scroll entrance wrapper
│   ├── TextType.tsx      # ReactBits — typewriter effect
│   ├── SpotlightCard.tsx # ReactBits — cursor-glow card
│   ├── CardSwap.tsx      # ReactBits — 3D card swap
│   ├── PixelCard.tsx     # ReactBits — pixel-dissolve card
│   ├── GlitchText.tsx    # ReactBits — RGB glitch text
│   ├── ScrambledText.tsx # ReactBits — cursor-proximity scramble
│   └── Stepper.tsx       # ReactBits — animated step indicator
├── sections/
│   ├── Hero.tsx          # Landing — Nước Việt Nam Là Một
│   ├── Context.tsx       # Một Cổ Hai Tròng (Pre-1945)
│   ├── Struggle.tsx      # Ngàn Cân Treo Sợi Tóc (1945–46)
│   ├── Resistance.tsx    # Toàn Quốc Kháng Chiến (1946–50)
│   ├── Victory.tsx       # Điện Biên Phủ (1951–54)
│   ├── Lessons.tsx       # Bốn Bài Học Xương Máu
│   └── Footer.tsx        # Colophon & credits
├── lib/
│   └── utils.ts          # cn() helper (clsx + tailwind-merge)
├── App.tsx
├── main.tsx
└── index.css             # Tailwind directives + global styles
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:5173

# Type-check
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Academic Context

**Course:** VNR202 — Lịch sử Đảng Cộng sản Việt Nam  
**Semester:** 9 · 2026  
**Framework:** The presentation argues that the revolutionary strategy of 1945–1954 — particularly the dialectic between *short-term firefighting* and *long-term strategy building* — is a timeless management model, validated by modern case studies such as FPT Group's 2025 trajectory.

**The 4 Blood-Earned Lessons:**
1. **Sự tỉnh táo** — Identify priorities: solve "giặc đói, giặc dốt" before the existential threat
2. **Sự linh hoạt** — *"Dĩ bất biến, ứng vạn biến"*: fixed goals, flexible methods
3. **Sự tích lũy** — *"Lấy ngắn nuôi dài"*: short-term hustle funds long-term capital
4. **Sự kiên trì** — *"Tư duy trường kỳ"*: nine years, no shortcuts, win step by step

**Sources:**
- Giáo trình Lịch sử Đảng Cộng sản Việt Nam (official curriculum)
- Báo cáo thường niên FPT 2025
- AI tools used for ideation only; all historical claims verified against primary sources

---

## License

Academic project — not for commercial redistribution.  
Historical photographs referenced are in the public domain.
