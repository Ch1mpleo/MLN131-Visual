import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import Noise from "@/components/Noise";
import StampTag from "@/components/ui/StampTag";
import { ERAS, getEraByIndex } from "@/data/democracyErasData";
import {
  useGeminiClassifier,
  type ScenarioResult,
} from "@/hooks/useGeminiClassifier";
import { navigate } from "@/lib/router";
import { cn } from "@/lib/utils";

type Stage = "lobby" | "generating" | "playing" | "revealing" | "finished";

type RoundRecord = {
  scenario: ScenarioResult;
  pickedEra: number;
  points: number;
};

function scorePick(
  picked: number,
  scenario: ScenarioResult,
): { points: number; label: string } {
  const primary =
    scenario.pct_a >= scenario.pct_b ? scenario.era_a : scenario.era_b;
  const secondary =
    scenario.pct_a >= scenario.pct_b ? scenario.era_b : scenario.era_a;

  if (picked === primary) {
    return { points: 3, label: "Chính xác — giai đoạn chủ đạo!" };
  }
  if (picked === secondary) {
    return { points: 1, label: "Gần đúng — giai đoạn phụ." };
  }
  return { points: 0, label: "Chưa trúng." };
}

export default function GameAI() {
  const [stage, setStage] = useState<Stage>("lobby");
  const [roundCount, setRoundCount] = useState(5);
  const [roundIndex, setRoundIndex] = useState(0);
  const [scenario, setScenario] = useState<ScenarioResult | null>(null);
  const [pickedEra, setPickedEra] = useState<number | null>(null);
  const [records, setRecords] = useState<RoundRecord[]>([]);
  const { generateScenario, loading, error } = useGeminiClassifier();

  useEffect(() => {
    document.title = "Phán Quyết AI · Dân chủ";
  }, []);

  const totalScore = records.reduce((s, r) => s + r.points, 0);
  const maxScore = records.length * 3;

  const startRound = async () => {
    setStage("generating");
    setScenario(null);
    setPickedEra(null);
    try {
      const next = await generateScenario();
      setScenario(next);
      setStage("playing");
    } catch {
      setStage("lobby");
    }
  };

  const startGame = async (n: number) => {
    setRoundCount(n);
    setRoundIndex(0);
    setRecords([]);
    await startRound();
  };

  const handlePick = (eraIndex: number) => {
    if (!scenario || pickedEra !== null) return;
    setPickedEra(eraIndex);
    const { points } = scorePick(eraIndex, scenario);
    setRecords((prev) => [
      ...prev,
      { scenario, pickedEra: eraIndex, points },
    ]);
    setStage("revealing");
  };

  const handleNext = async () => {
    if (roundIndex + 1 >= roundCount) {
      setStage("finished");
      return;
    }
    setRoundIndex((i) => i + 1);
    await startRound();
  };

  const lastRecord = records[records.length - 1];
  const revealScenario = lastRecord?.scenario ?? scenario;
  const revealPick = lastRecord?.pickedEra ?? pickedEra;

  const grade = useMemo(() => {
    const pct = maxScore > 0 ? totalScore / maxScore : 0;
    if (pct >= 0.9) return "Tướng quân lý luận";
    if (pct >= 0.7) return "Xuất sắc";
    if (pct >= 0.5) return "Khá giỏi";
    if (pct >= 0.3) return "Cần ôn thêm";
    return "Hãy đọc lại trục lịch sử";
  }, [totalScore, maxScore]);

  return (
    <div className="relative min-h-screen paper overflow-hidden">
      <Noise patternAlpha={18} patternRefreshInterval={2} />
      <div className="fixed top-0 inset-x-0 z-40 flex">
        <span className="h-1.5 flex-1 bg-blood" />
        <span className="h-1.5 flex-1 bg-ink" />
        <span className="h-1.5 flex-1 bg-flagYellow" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-10 pt-10 pb-20">
        <TopBar
          stage={stage}
          roundIndex={roundIndex}
          roundCount={roundCount}
          score={totalScore}
          maxScore={roundCount * 3}
          onExit={() => navigate("/")}
          onHome={() => navigate("/#classifier")}
        />

        <AnimatePresence mode="wait">
          {stage === "lobby" && (
            <motion.div
              key="lobby"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
            >
              <LobbyScreen onStart={startGame} error={error} />
            </motion.div>
          )}

          {stage === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[50vh] flex-col items-center justify-center border-2 border-ink bg-ink text-cream p-12 shadow-[10px_10px_0_#D32F2F]"
            >
              <div className="flex gap-1.5 mb-6">
                {[0, 1, 2, 3].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2.5 w-2.5 bg-blood"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
              <p className="font-headline text-2xl md:text-3xl uppercase tracking-tight">
                AI đang soạn thách thức…
              </p>
              <p className="mt-2 font-mono text-sm uppercase tracking-[0.25em] text-cream/60">
                Vòng {roundIndex + 1} / {roundCount}
              </p>
            </motion.div>
          )}

          {(stage === "playing" || stage === "revealing") && revealScenario && (
            <motion.div
              key={`round-${roundIndex}-${stage}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
            >
              <RoundView
                scenario={revealScenario}
                roundIndex={roundIndex}
                roundCount={roundCount}
                pickedEra={revealPick}
                stage={stage}
                onPick={handlePick}
                onNext={handleNext}
                isLast={roundIndex + 1 >= roundCount}
                lastPoints={lastRecord?.points}
                loadingNext={loading}
              />
            </motion.div>
          )}

          {stage === "finished" && (
            <motion.div
              key="finished"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <FinishScreen
                score={totalScore}
                maxScore={maxScore}
                grade={grade}
                records={records}
                onReplay={() => startGame(roundCount)}
                onHome={() => navigate("/#classifier")}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {error && stage !== "lobby" && stage !== "generating" && (
          <p className="mt-4 font-mono text-sm text-blood">{error}</p>
        )}
      </div>
    </div>
  );
}

function TopBar({
  stage,
  roundIndex,
  roundCount,
  score,
  maxScore,
  onExit,
  onHome,
}: {
  stage: Stage;
  roundIndex: number;
  roundCount: number;
  score: number;
  maxScore: number;
  onExit: () => void;
  onHome: () => void;
}) {
  const progress =
    stage !== "lobby" && roundCount > 0
      ? ((stage === "finished" ? roundCount : roundIndex) / roundCount) * 100
      : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          type="button"
          onClick={onExit}
          className="font-mono text-sm uppercase tracking-[0.25em] text-ink/70 hover:text-blood"
        >
          ← Về bảo tàng
        </button>
        <StampTag tone="red" rotate={-2}>
          Phán Quyết AI
        </StampTag>
        <button
          type="button"
          onClick={onHome}
          className="font-mono text-sm uppercase tracking-[0.2em] text-ink/60 hover:text-blood hidden sm:block"
        >
          Phân loại
        </button>
      </div>
      {stage !== "lobby" && (
        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 border-2 border-ink overflow-hidden bg-cream">
            <motion.div
              className="h-full bg-blood"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <span className="font-headline text-xl whitespace-nowrap">
            <span className="text-blood">{score}</span>
            <span className="opacity-40"> / {maxScore}</span>
          </span>
          {stage !== "finished" && (
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/55">
              Vòng {Math.min(roundIndex + 1, roundCount)}/{roundCount}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

function LobbyScreen({
  onStart,
  error,
}: {
  onStart: (n: number) => void;
  error: string | null;
}) {
  const options = [
    { n: 5, label: "Nhanh", cap: "5 vòng" },
    { n: 7, label: "Tiêu chuẩn", cap: "7 vòng" },
    { n: 10, label: "Đầy đủ", cap: "10 vòng" },
  ];

  return (
    <div className="grid md:grid-cols-12 gap-10 mt-4">
      <div className="md:col-span-7">
        <StampTag tone="red" className="mb-4">
          Trò chơi thuyết trình
        </StampTag>
        <h1 className="headline text-[clamp(3rem,8vw,6.5rem)] text-ink leading-[0.92]">
          PHÁN
          <br />
          <span className="text-blood">QUYẾT</span> AI
        </h1>
        <p className="serif text-xl italic text-ink/80 max-w-xl border-l-4 border-blood pl-6 mt-6">
          AI soạn mô tả mơ hồ trộn hai giai đoạn. Người chơi đoán giai đoạn chủ
          đạo — đúng chủ đạo +3 điểm, đúng phụ +1 điểm.
        </p>
        <ul className="mt-6 space-y-3 serif text-lg text-ink/85">
          <li>
            <strong className="text-blood font-headline">01.</strong> AI tạo
            thách thức mơ hồ (không lộ tên giai đoạn).
          </li>
          <li>
            <strong className="text-blood font-headline">02.</strong> Chọn 1 trong
            6 giai đoạn trên trục lịch sử.
          </li>
          <li>
            <strong className="text-blood font-headline">03.</strong> Tiết lộ tỷ
            lệ % (vd. 70% tư sản — 30% XHCN).
          </li>
        </ul>
      </div>
      <div className="md:col-span-5">
        <div className="border-2 border-ink bg-bone p-7 shadow-[8px_8px_0_#1A1A1A]">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60 mb-4">
            Chọn số vòng
          </p>
          {options.map((opt) => (
            <button
              key={opt.n}
              type="button"
              onClick={() => onStart(opt.n)}
              className="group mb-3 w-full border-2 border-ink bg-cream px-5 py-4 text-left hover:bg-ink hover:text-cream transition-colors flex justify-between items-center"
            >
              <div>
                <div className="font-headline text-xl uppercase">{opt.label}</div>
                <div className="font-mono text-xs uppercase tracking-[0.2em] opacity-70">
                  {opt.cap}
                </div>
              </div>
              <span className="font-headline text-4xl text-blood group-hover:text-flagYellow">
                {opt.n}
              </span>
            </button>
          ))}
          {error && (
            <p className="mt-3 font-mono text-sm text-blood">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function RoundView({
  scenario,
  roundIndex,
  roundCount,
  pickedEra,
  stage,
  onPick,
  onNext,
  isLast,
  lastPoints,
  loadingNext,
}: {
  scenario: ScenarioResult;
  roundIndex: number;
  roundCount: number;
  pickedEra: number | null;
  stage: "playing" | "revealing";
  onPick: (era: number) => void;
  onNext: () => void;
  isLast: boolean;
  lastPoints?: number;
  loadingNext?: boolean;
}) {
  const primaryEra =
    scenario.pct_a >= scenario.pct_b ? scenario.era_a : scenario.era_b;
  const secondaryEra =
    scenario.pct_a >= scenario.pct_b ? scenario.era_b : scenario.era_a;
  const primaryPct = Math.max(scenario.pct_a, scenario.pct_b);
  const secondaryPct = Math.min(scenario.pct_a, scenario.pct_b);

  const verdict =
    pickedEra !== null ? scorePick(pickedEra, scenario) : null;

  return (
    <div className="grid lg:grid-cols-12 gap-8">
      <div className="lg:col-span-5">
        <div className="border-2 border-ink bg-ink text-cream p-8 shadow-[10px_10px_0_#D32F2F] min-h-[280px] flex flex-col">
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-blood mb-3">
            ▣ Thách thức · Vòng {roundIndex + 1}/{roundCount}
          </span>
          <p className="serif text-xl md:text-2xl leading-relaxed flex-1">
            {scenario.description}
          </p>
        </div>
      </div>

      <div className="lg:col-span-7 flex flex-col gap-4">
        <p className="font-headline text-xl uppercase text-ink">
          Chọn giai đoạn chủ đạo
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {ERAS.map((era, i) => {
            const letter = String.fromCharCode(65 + i);
            const isPicked = pickedEra === i;
            const isPrimary = stage === "revealing" && i === primaryEra;
            const isSecondary = stage === "revealing" && i === secondaryEra;

            return (
              <button
                key={era.id}
                type="button"
                disabled={stage === "revealing"}
                onClick={() => onPick(i)}
                className={cn(
                  "text-left border-2 p-4 flex gap-3 transition-all",
                  isPrimary
                    ? "border-blood bg-blood text-cream shadow-[4px_4px_0_#1A1A1A]"
                    : isSecondary
                      ? "border-ink bg-flagYellow text-ink"
                      : isPicked
                        ? "border-ink bg-bone"
                        : "border-ink bg-cream hover:bg-bone shadow-[3px_3px_0_#1A1A1A]",
                  stage === "revealing" && !isPrimary && !isSecondary && "opacity-50",
                )}
              >
                <span className="font-headline text-2xl">{letter}</span>
                <span>
                  <span className="block font-headline text-sm uppercase leading-tight">
                    {era.text}
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] opacity-70">
                    {era.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <AnimatePresence>
          {stage === "revealing" && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="border-2 border-ink bg-cream p-6 shadow-[6px_6px_0_#1A1A1A]"
            >
              <div className="mb-4 flex flex-wrap items-center gap-3">
                {verdict && (
                  <StampTag
                    tone={verdict.points >= 3 ? "red" : verdict.points >= 1 ? "ink" : "cream"}
                  >
                    {verdict.label} (+{lastPoints ?? verdict.points}đ)
                  </StampTag>
                )}
              </div>

              <div className="space-y-3 mb-4">
                <SplitBar
                  label={getEraByIndex(primaryEra).label}
                  pct={primaryPct}
                  tone="blood"
                />
                <SplitBar
                  label={getEraByIndex(secondaryEra).label}
                  pct={secondaryPct}
                  tone="ink"
                />
              </div>

              <p className="serif italic text-ink/85">{scenario.explanation}</p>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={onNext}
                  disabled={loadingNext}
                  className="bg-ink text-cream px-8 py-3 font-headline uppercase shadow-[4px_4px_0_#D32F2F] hover:-translate-y-0.5 transition-transform disabled:opacity-50"
                >
                  {isLast ? "Xem kết quả" : "Vòng tiếp theo →"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function SplitBar({
  label,
  pct,
  tone,
}: {
  label: string;
  pct: number;
  tone: "blood" | "ink";
}) {
  return (
    <div>
      <div className="flex justify-between mb-1 font-mono text-xs uppercase tracking-[0.15em]">
        <span>{label}</span>
        <span>{pct}%</span>
      </div>
      <div className="h-3 border border-ink bg-bone overflow-hidden">
        <motion.div
          className={cn("h-full", tone === "blood" ? "bg-blood" : "bg-ink")}
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </div>
  );
}

function FinishScreen({
  score,
  maxScore,
  grade,
  records,
  onReplay,
  onHome,
}: {
  score: number;
  maxScore: number;
  grade: string;
  records: RoundRecord[];
  onReplay: () => void;
  onHome: () => void;
}) {
  return (
    <div className="grid md:grid-cols-2 gap-10 mt-4">
      <div className="border-2 border-ink bg-ink text-cream p-8 shadow-[10px_10px_0_#D32F2F]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cream/60">
          Tổng điểm
        </p>
        <div className="headline text-[clamp(4rem,12vw,8rem)] text-flagYellow leading-none">
          {score}
          <span className="text-3xl text-cream/50"> / {maxScore}</span>
        </div>
        <p className="font-headline text-2xl uppercase mt-4">
          {grade}
        </p>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={onReplay}
            className="bg-blood text-cream px-6 py-3 font-headline uppercase"
          >
            Chơi lại
          </button>
          <button
            type="button"
            onClick={onHome}
            className="border-2 border-cream px-6 py-3 font-headline uppercase hover:bg-cream hover:text-ink transition-colors"
          >
            Về phân loại
          </button>
        </div>
      </div>
      <div className="border-2 border-ink bg-bone p-6 max-h-[420px] overflow-y-auto">
        <p className="font-headline uppercase text-xl mb-4">Chi tiết từng vòng</p>
        <ul className="space-y-3">
          {records.map((r, i) => (
            <li key={i} className="border border-ink/30 bg-cream p-4 text-sm">
              <div className="flex justify-between font-mono text-xs uppercase text-ink/60 mb-1">
                <span>Vòng {i + 1}</span>
                <span className="text-blood">+{r.points}đ</span>
              </div>
              <p className="serif italic line-clamp-2">{r.scenario.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
