import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PAIRS, PHASE_COLORS, type Pair } from "@/data/historyPairs";
import { navigate } from "@/lib/router";
import StampTag from "@/components/ui/StampTag";
import { cn } from "@/lib/utils";

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function shuffle<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Pick the 3 most "plausible" distractors: prefer other pairs in the same phase
// if possible, fall back to random ones. This makes the quiz more challenging
// than purely random 4-of-14 multiple choice.
function pickDistractors(correct: Pair): Pair[] {
  const samePhase = PAIRS.filter(
    (p) => p.id !== correct.id && p.phase === correct.phase,
  );
  const other = PAIRS.filter(
    (p) => p.id !== correct.id && p.phase !== correct.phase,
  );
  const pool = [...shuffle(samePhase), ...shuffle(other)];
  return pool.slice(0, 3);
}

type Round = {
  pair: Pair;
  options: Pair[]; // length 4, shuffled; one of them is pair
};

function buildRounds(count: number): Round[] {
  const selected = shuffle(PAIRS).slice(0, count);
  return selected.map((pair) => {
    const distractors = pickDistractors(pair);
    const options = shuffle([pair, ...distractors]);
    return { pair, options };
  });
}

// ─── GAME PAGE ────────────────────────────────────────────────────────────────

type Stage = "start" | "playing" | "finished";

type Result = { pairId: number; correct: boolean; pickedSolutionId: number };

export default function Game() {
  const [stage, setStage] = useState<Stage>("start");
  const [roundCount, setRoundCount] = useState<number>(10);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    document.title = "Trò chơi Ghép nối Lịch sử · VNR202";
  }, []);

  const start = (n: number) => {
    setRoundCount(n);
    setRounds(buildRounds(n));
    setIndex(0);
    setPicked(null);
    setResults([]);
    setStage("playing");
  };

  const handlePick = (solutionId: number) => {
    if (picked !== null) return;
    const round = rounds[index];
    const correct = solutionId === round.pair.id;
    setPicked(solutionId);
    setResults((prev) => [
      ...prev,
      { pairId: round.pair.id, correct, pickedSolutionId: solutionId },
    ]);
  };

  const next = () => {
    if (index + 1 >= rounds.length) {
      setStage("finished");
      return;
    }
    setIndex(index + 1);
    setPicked(null);
  };

  const score = results.filter((r) => r.correct).length;

  return (
    <div className="relative min-h-screen paper overflow-hidden">
      {/* Grain overlay */}
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none opacity-40 mix-blend-multiply bg-grain"
      />

      {/* Tricolor top rule */}
      <div className="fixed top-0 inset-x-0 z-40 flex">
        <span className="h-1.5 flex-1 bg-blood" />
        <span className="h-1.5 flex-1 bg-ink" />
        <span className="h-1.5 flex-1 bg-flagYellow" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 pt-10 pb-20">
        <TopBar
          stage={stage}
          index={index}
          total={rounds.length}
          score={score}
          onExit={() => navigate("/")}
          onRestart={() => setStage("start")}
        />

        <AnimatePresence mode="wait">
          {stage === "start" && (
            <motion.div
              key="start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              <StartScreen onStart={start} />
            </motion.div>
          )}

          {stage === "playing" && rounds.length > 0 && (
            <motion.div
              key={`round-${index}`}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
            >
              <QuizRound
                round={rounds[index]}
                picked={picked}
                onPick={handlePick}
                onNext={next}
                isLast={index + 1 >= rounds.length}
              />
            </motion.div>
          )}

          {stage === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <FinishScreen
                score={score}
                total={rounds.length}
                results={results}
                rounds={rounds}
                onReplay={() => start(roundCount)}
                onHome={() => navigate("/")}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// ─── TOP BAR ──────────────────────────────────────────────────────────────────

function TopBar({
  stage,
  index,
  total,
  score,
  onExit,
  onRestart,
}: {
  stage: Stage;
  index: number;
  total: number;
  score: number;
  onExit: () => void;
  onRestart: () => void;
}) {
  const progress = stage === "playing" && total > 0 ? (index / total) * 100 : 0;

  return (
    <div className="mb-10">
      <div className="flex items-center justify-between gap-4 mb-5">
        <button
          type="button"
          onClick={onExit}
          className="group flex items-center gap-2 font-mono text-sm md:text-base uppercase tracking-[0.3em] text-ink/70 hover:text-blood transition-colors"
        >
          <span className="transition-transform group-hover:-translate-x-1">
            ←
          </span>
          Về bảo tàng
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-sm md:text-base uppercase tracking-[0.3em] text-ink/60 hidden sm:inline">
            VNR202 · Mini Game
          </span>
          <StampTag tone="ink" rotate={-2} className="text-sm md:text-base px-4 py-2">
            {stage === "playing" ? `Câu ${index + 1}/${total}` : "Ghép nối"}
          </StampTag>
        </div>
      </div>

      {stage === "playing" && (
        <div className="flex items-center gap-5">
          <div className="flex-1 h-3 border-2 border-ink bg-cream relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-blood"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
          <div className="font-headline text-xl md:text-2xl uppercase tracking-wide text-ink whitespace-nowrap">
            <span className="text-blood">{score}</span>
            <span className="mx-1 opacity-50">/</span>
            <span>{total}</span>
          </div>
          <button
            type="button"
            onClick={onRestart}
            className="font-mono text-sm uppercase tracking-[0.2em] text-ink/60 hover:text-blood transition-colors"
            title="Chơi lại"
          >
            ↺ Chơi lại
          </button>
        </div>
      )}
    </div>
  );
}

// ─── START SCREEN ─────────────────────────────────────────────────────────────

function StartScreen({ onStart }: { onStart: (n: number) => void }) {
  const options = [
    { n: 5, label: "Nhanh", caption: "5 câu · khởi động" },
    { n: 10, label: "Tiêu chuẩn", caption: "10 câu · bao quát" },
    { n: 14, label: "Toàn tập", caption: "14 câu · trọn chương" },
  ];

  return (
    <div className="grid md:grid-cols-12 gap-10 items-start mt-6">
      <div className="md:col-span-7 flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <StampTag tone="red" rotate={-3} className="text-base md:text-lg px-4 py-2">
            Mini Game
          </StampTag>
          <span className="font-mono text-sm md:text-base tracking-[0.3em] uppercase text-ink/70">
            Chương 2 · Mục I · 1945 – 1954
          </span>
        </div>

        <h1 className="headline text-[clamp(3.8rem,9vw,7.5rem)] text-ink leading-[0.93]">
          GHÉP
          <br />
          <span className="text-blood">THÁCH THỨC</span>
          <br />
          VỚI GIẢI PHÁP
        </h1>

        <p className="serif text-xl md:text-2xl italic text-ink/80 max-w-xl border-l-4 border-blood pl-6">
          Mỗi bài toán lịch sử — một lời giải của Đảng và Bác Hồ. Bạn có ghép
          đúng từng cặp giữa "ngàn cân treo sợi tóc" không?
        </p>

        <ul className="serif space-y-4 text-lg md:text-xl text-ink/85 max-w-xl">
          <li className="flex gap-4">
            <span className="font-headline text-blood text-xl">01.</span>
            <span>
              Một <strong>thách thức lịch sử</strong> sẽ hiện ra (kèm mốc ngày
              tháng).
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-headline text-blood text-xl">02.</span>
            <span>
              Chọn đúng <strong>giải pháp</strong> của Đảng và Chính phủ trong 4
              phương án.
            </span>
          </li>
          <li className="flex gap-4">
            <span className="font-headline text-blood text-xl">03.</span>
            <span>
              Ta lập tức <strong>tiết lộ kết quả lịch sử</strong> — học ngay khi
              chơi.
            </span>
          </li>
        </ul>
      </div>

      <div className="md:col-span-5 flex flex-col gap-5">
        <div className="border-2 border-ink bg-bone p-7 md:p-9 shadow-[8px_8px_0_#1A1A1A]">
          <div className="font-mono text-sm uppercase tracking-[0.3em] text-ink/70 mb-5">
            Chọn độ dài ván
          </div>
          <div className="flex flex-col gap-4">
            {options.map((opt) => (
              <button
                key={opt.n}
                type="button"
                onClick={() => onStart(opt.n)}
                className="group text-left border-2 border-ink bg-cream hover:bg-ink hover:text-cream transition-colors px-5 py-4 flex items-center justify-between gap-4"
              >
                <div>
                  <div className="font-headline text-2xl uppercase tracking-tight">
                    {opt.label}
                  </div>
                  <div className="font-mono text-sm uppercase tracking-[0.2em] opacity-70 mt-0.5">
                    {opt.caption}
                  </div>
                </div>
                <span className="font-headline text-5xl text-blood group-hover:text-flagYellow transition-colors">
                  {opt.n}
                </span>
              </button>
            ))}
          </div>
          <div className="hairline mt-6 pt-4 font-mono text-sm uppercase tracking-[0.25em] text-ink/60">
            Thứ tự & phương án được xáo ngẫu nhiên mỗi ván.
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── QUIZ ROUND ───────────────────────────────────────────────────────────────

function QuizRound({
  round,
  picked,
  onPick,
  onNext,
  isLast,
}: {
  round: Round;
  picked: number | null;
  onPick: (solutionId: number) => void;
  onNext: () => void;
  isLast: boolean;
}) {
  const correctId = round.pair.id;
  const isAnswered = picked !== null;
  const pickedCorrect = picked === correctId;
  const phaseColor = PHASE_COLORS[round.pair.phase];

  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-10">
      {/* Challenge card */}
      <div className="lg:col-span-5">
        <motion.div
          key={round.pair.id}
          initial={{ rotate: -1, y: 8 }}
          animate={{ rotate: -0.8, y: 0 }}
          className="relative border-2 border-ink bg-ink text-cream shadow-[10px_10px_0_#D32F2F] p-8 md:p-10 h-full"
        >
          <div className="flex items-center justify-between mb-6 gap-3">
            <span
              className={cn(
                "inline-block px-3 py-1.5 font-headline uppercase tracking-wide text-sm md:text-base shadow-[2px_2px_0_#F5F5DC]",
                phaseColor.bg,
                phaseColor.text,
              )}
            >
              {round.pair.phase}
            </span>
            <span className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] opacity-70">
              {round.pair.category}
            </span>
          </div>

          <div className="font-mono text-xs uppercase tracking-[0.3em] text-blood/90 mb-3">
            ▣ Thách thức
          </div>
          <h2 className="headline text-4xl md:text-5xl text-cream leading-tight mb-5">
            {round.pair.challenge.title}
          </h2>
          <div className="inline-block border border-cream/40 px-3 py-1 font-mono text-sm tracking-[0.12em] text-cream/80 mb-5">
            {round.pair.challenge.date}
          </div>
          <p className="serif text-cream/90 leading-relaxed text-lg md:text-xl">
            {round.pair.challenge.description}
          </p>

          <div className="absolute -top-3 -left-3 rotate-[-6deg] bg-flagYellow text-ink font-headline uppercase text-xs tracking-wide px-3 py-1 border-2 border-ink">
            Giai đoạn
          </div>
        </motion.div>
      </div>

      {/* Options */}
      <div className="lg:col-span-7 flex flex-col gap-5">
        <div className="flex items-end justify-between gap-3 mb-1">
          <div>
            <div className="font-mono text-sm uppercase tracking-[0.3em] text-ink/60">
              ▦ Phương án · chọn một
            </div>
            <div className="headline text-2xl md:text-3xl text-ink mt-2">
              Đâu là giải pháp của Đảng và Bác?
            </div>
          </div>
          {isAnswered && (
            <motion.div
              initial={{ scale: 0.6, rotate: -18, opacity: 0 }}
              animate={{ scale: 1, rotate: -8, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
              className={cn(
                "hidden md:inline-block border-2 border-ink px-4 py-2 font-headline uppercase text-base shadow-[3px_3px_0_#1A1A1A]",
                pickedCorrect
                  ? "bg-flagYellow text-ink"
                  : "bg-blood text-cream",
              )}
            >
              {pickedCorrect ? "Chính xác!" : "Chưa đúng"}
            </motion.div>
          )}
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {round.options.map((opt, idx) => {
            const isCorrect = opt.id === correctId;
            const isPicked = opt.id === picked;
            const letter = String.fromCharCode(65 + idx); // A, B, C, D

            let state: "idle" | "correct" | "wrong" | "faded" = "idle";
            if (isAnswered) {
              if (isCorrect) state = "correct";
              else if (isPicked) state = "wrong";
              else state = "faded";
            }

            return (
              <OptionCard
                key={opt.id}
                letter={letter}
                solution={opt.solution}
                state={state}
                onClick={() => onPick(opt.id)}
                disabled={isAnswered}
              />
            );
          })}
        </div>

        {/* Reveal panel */}
        <AnimatePresence>
          {isAnswered && (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className={cn(
                "border-2 border-ink p-6 md:p-8 shadow-[6px_6px_0_#1A1A1A]",
                pickedCorrect ? "bg-flagYellow" : "bg-cream",
              )}
            >
              <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm uppercase tracking-[0.3em] text-ink/70">
                    Đáp án đúng
                  </span>
                  <span className="h-0.5 w-8 bg-ink" />
                </div>
                <span className="font-mono text-sm uppercase tracking-[0.25em] text-ink/70">
                  {round.pair.solution.date}
                </span>
              </div>
              <h3 className="headline text-3xl md:text-4xl text-ink leading-tight mb-3">
                {round.pair.solution.title}
              </h3>
              <p className="serif text-ink/90 leading-relaxed text-lg md:text-xl">
                {round.pair.solution.description}
              </p>
              {round.pair.solution.result && (
                <div className="mt-4 border-t-2 border-ink/20 pt-4 flex items-start gap-3">
                  <span className="font-mono text-sm uppercase tracking-[0.3em] text-blood whitespace-nowrap mt-1">
                    Kết quả
                  </span>
                  <p className="serif italic text-ink/85 text-lg">
                    {round.pair.solution.result}
                  </p>
                </div>
              )}

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onNext}
                  className="group bg-ink text-cream px-8 py-4 font-headline uppercase tracking-wide text-base md:text-lg shadow-[4px_4px_0_#D32F2F] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#D32F2F] transition-all"
                >
                  {isLast ? "Xem kết quả" : "Câu tiếp theo"}
                  <span className="ml-2 transition-transform group-hover:translate-x-1 inline-block">
                    →
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OptionCard({
  letter,
  solution,
  state,
  onClick,
  disabled,
}: {
  letter: string;
  solution: Pair["solution"];
  state: "idle" | "correct" | "wrong" | "faded";
  onClick: () => void;
  disabled: boolean;
}) {
  const base =
    "group relative text-left border-2 p-5 md:p-6 transition-all duration-200 flex gap-5";
  const stateStyles: Record<typeof state, string> = {
    idle:
      "border-ink bg-cream shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 hover:shadow-[6px_6px_0_#D32F2F] hover:bg-bone",
    correct:
      "border-ink bg-flagYellow shadow-[4px_4px_0_#1A1A1A] ring-0",
    wrong:
      "border-ink bg-blood text-cream shadow-[4px_4px_0_#1A1A1A]",
    faded:
      "border-ink/40 bg-cream/60 opacity-55",
  };

  return (
    <motion.button
      type="button"
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      animate={
        state === "correct"
          ? { scale: [1, 1.04, 1] }
          : state === "wrong"
            ? { x: [0, -6, 6, -4, 4, 0] }
            : { scale: 1, x: 0 }
      }
      transition={{ duration: 0.4 }}
      className={cn(base, stateStyles[state])}
    >
      <span
        className={cn(
          "shrink-0 h-14 w-14 grid place-items-center font-headline text-2xl border-2",
          state === "wrong"
            ? "bg-cream text-blood border-cream"
            : state === "correct"
              ? "bg-ink text-flagYellow border-ink"
              : "bg-ink text-cream border-ink",
        )}
      >
        {letter}
      </span>
      <span className="flex-1 min-w-0">
        <span
          className="block uppercase leading-tight text-2xl md:text-3xl"
          style={{ fontFamily: "'Archivo Black', 'Epilogue', sans-serif", fontWeight: 900, letterSpacing: "-0.02em" }}
        >
          {solution.title}
        </span>
        <span className="mt-2.5 flex">
          <span
            className={cn(
              "inline-block font-mono text-sm font-bold tracking-[0.18em] uppercase px-2.5 py-0.5 border-2",
              state === "wrong"
                ? "bg-cream text-blood border-cream"
                : state === "correct"
                  ? "bg-ink text-flagYellow border-ink"
                  : "bg-blood text-cream border-blood",
            )}
          >
            {solution.date}
          </span>
        </span>
      </span>
    </motion.button>
  );
}

// ─── FINISH SCREEN ────────────────────────────────────────────────────────────

function FinishScreen({
  score,
  total,
  results,
  rounds,
  onReplay,
  onHome,
}: {
  score: number;
  total: number;
  results: Result[];
  rounds: Round[];
  onReplay: () => void;
  onHome: () => void;
}) {
  const pct = total > 0 ? score / total : 0;

  const grade = useMemo(() => {
    if (pct === 1) return { label: "Tướng quân vĩ đại", tone: "blood" as const };
    if (pct >= 0.8) return { label: "Xuất sắc", tone: "blood" as const };
    if (pct >= 0.6) return { label: "Khá giỏi", tone: "ink" as const };
    if (pct >= 0.4) return { label: "Cần ôn luyện", tone: "ink" as const };
    return { label: "Hãy đọc lại sử", tone: "ink" as const };
  }, [pct]);

  const wrong = results
    .map((r, i) => ({ r, round: rounds[i] }))
    .filter((x) => !x.r.correct);

  return (
    <div className="grid md:grid-cols-12 gap-10 mt-4">
      <div className="md:col-span-5 flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <StampTag tone="red" rotate={-4} className="text-base md:text-lg px-4 py-2">
            Kết quả ván đấu
          </StampTag>
          <span className="font-mono text-sm tracking-[0.3em] uppercase text-ink/70">
            Tổng kết
          </span>
        </div>

        <div className="relative border-2 border-ink bg-ink text-cream p-8 md:p-10 shadow-[10px_10px_0_#D32F2F]">
          <div className="font-mono text-sm uppercase tracking-[0.3em] text-cream/70">
            Điểm số
          </div>
          <div className="flex items-end gap-4 mt-1">
            <div className="headline text-[clamp(6rem,18vw,12rem)] leading-none text-flagYellow">
              {score}
            </div>
            <div className="pb-4">
              <div className="headline text-3xl md:text-4xl text-cream/80">/ {total}</div>
              <div className="font-mono text-sm uppercase tracking-[0.25em] text-cream/60 mt-1.5">
                {Math.round(pct * 100)}%
              </div>
            </div>
          </div>
          <div className="h-[3px] bg-blood my-5" />
          <div className="font-headline uppercase text-2xl md:text-3xl text-cream">
            Xếp loại: <span className="text-flagYellow">{grade.label}</span>
          </div>
          <p className="serif italic text-cream/80 mt-3 text-lg md:text-xl leading-relaxed">
            "Thắng lợi không đến từ may rủi — mà đến từ sự chuẩn bị tỉnh táo,
            linh hoạt, tích luỹ và kiên trì."
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            type="button"
            onClick={onReplay}
            className="bg-blood text-cream px-8 py-4 font-headline uppercase tracking-wide text-base md:text-lg shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform"
          >
            ↺ Chơi lại
          </button>
          <button
            type="button"
            onClick={onHome}
            className="border-2 border-ink text-ink px-8 py-4 font-headline uppercase tracking-wide text-base md:text-lg hover:bg-ink hover:text-cream transition-colors"
          >
            ← Về bảo tàng
          </button>
        </div>
      </div>

      <div className="md:col-span-7">
        <div className="border-2 border-ink bg-bone p-6 md:p-8 shadow-[8px_8px_0_#1A1A1A]">
          <div className="flex items-center justify-between mb-5 gap-3 flex-wrap">
            <div className="font-headline uppercase text-2xl md:text-3xl text-ink">
              Ôn lại câu sai
            </div>
            <div className="font-mono text-sm uppercase tracking-[0.3em] text-ink/60">
              {wrong.length === 0 ? "Không có câu sai" : `${wrong.length} câu`}
            </div>
          </div>

          {wrong.length === 0 ? (
            <div className="text-center py-14">
              <div className="headline text-7xl text-blood mb-4">★</div>
              <div className="serif italic text-ink/80 text-xl">
                Trọn vẹn 14/14 cặp lịch sử — bạn xứng danh "Tướng quân".
              </div>
            </div>
          ) : (
            <ul className="flex flex-col gap-4 max-h-[600px] overflow-y-auto pr-1">
              {wrong.map(({ r, round }) => (
                <li
                  key={r.pairId}
                  className="border-2 border-ink bg-cream p-5 md:p-6"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="font-mono text-sm uppercase tracking-[0.25em] text-blood">
                      ▣ {round.pair.challenge.title}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 whitespace-nowrap">
                      {round.pair.challenge.date}
                    </span>
                  </div>
                  <div className="h-px bg-ink/20 my-2.5" />
                  <div className="flex items-start justify-between gap-3">
                    <div className="font-headline uppercase text-ink text-base md:text-lg leading-snug">
                      → {round.pair.solution.title}
                    </div>
                    <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/60 whitespace-nowrap">
                      {round.pair.solution.date}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
