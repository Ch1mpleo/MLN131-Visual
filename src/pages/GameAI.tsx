import { useEffect, useState } from "react";
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

const ROUND_COUNT = 5;
const MAX_PICKS = 2;
const GAME_TITLE = "Hồ Sơ Thời Đại";
const GAME_TITLE_FULL = `${GAME_TITLE} AI`;

type Stage = "lobby" | "generating" | "playing" | "revealing" | "finished";

type RoundRecord = {
  scenario: ScenarioResult;
  pickedEras: number[];
};

function getEraRoles(scenario: ScenarioResult) {
  const primary =
    scenario.pct_a >= scenario.pct_b ? scenario.era_a : scenario.era_b;
  const secondary =
    scenario.pct_a >= scenario.pct_b ? scenario.era_b : scenario.era_a;
  const primaryPct = Math.max(scenario.pct_a, scenario.pct_b);
  const secondaryPct = Math.min(scenario.pct_a, scenario.pct_b);
  return { primary, secondary, primaryPct, secondaryPct };
}

function getRevealLabel(picked: number[], scenario: ScenarioResult): string {
  const { primary, secondary } = getEraRoles(scenario);
  const set = new Set(picked);
  const hasP = set.has(primary);
  const hasS = set.has(secondary);

  if (hasP && hasS && picked.length === 2) return "Trúng cả hai giai đoạn";
  if (hasP && hasS && picked.length > 2) return "Đúng cả hai — chọn thừa";
  if (hasP && picked.length === 1) return "Đúng giai đoạn chủ đạo";
  if (hasS && !hasP) return "Chỉ trúng giai đoạn phụ";
  if (hasP && picked.length >= 2 && !hasS) return "Chủ đạo đúng, phụ sai";
  return "Chưa trúng";
}

/** Split description into short clue lines for scannable display */
function splitClues(text: string): string[] {
  const parts = text
    .split(/(?<=[.!?…])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  return parts.length > 0 ? parts : [text];
}

function ScenarioBrief({
  description,
  roundIndex,
}: {
  description: string;
  roundIndex: number;
}) {
  const clues = splitClues(description);

  return (
    <div className="border-2 border-ink bg-bone shadow-[6px_6px_0_#D32F2F] overflow-hidden">
      <div className="flex">
        <div className="w-2 shrink-0 bg-blood" aria-hidden />
        <div className="flex-1 min-w-0 px-4 py-4 md:px-5 md:py-5">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-ink/50">
              Hồ sơ #{roundIndex + 1}
            </span>
            <span className="font-mono text-[10px] text-ink/35">·</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
              Vòng {roundIndex + 1}/{ROUND_COUNT}
            </span>
          </div>

          {clues.length === 1 ? (
            <p className="serif text-lg md:text-xl lg:text-[1.35rem] text-ink leading-relaxed">
              {clues[0]}
            </p>
          ) : (
            <ul className="space-y-3">
              {clues.map((line, i) => (
                <li
                  key={i}
                  className="flex gap-3 border-l-2 border-blood/40 pl-3"
                >
                  <span className="font-headline text-sm text-blood shrink-0 pt-0.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="serif text-lg md:text-xl text-ink leading-snug">
                    {line}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default function GameAI() {
  const [stage, setStage] = useState<Stage>("lobby");
  const [roundIndex, setRoundIndex] = useState(0);
  const [scenario, setScenario] = useState<ScenarioResult | null>(null);
  const [pickedEras, setPickedEras] = useState<number[]>([]);
  const [records, setRecords] = useState<RoundRecord[]>([]);
  const { generateScenario, loading, error } = useGeminiClassifier();

  useEffect(() => {
    document.title = `${GAME_TITLE_FULL} · Dân chủ`;
  }, []);

  const startRound = async (nextIndex?: number) => {
    setStage("generating");
    setScenario(null);
    setPickedEras([]);
    if (nextIndex !== undefined) {
      setRoundIndex(nextIndex);
    }
    try {
      const next = await generateScenario();
      setScenario(next);
      setStage("playing");
    } catch {
      setStage("lobby");
    }
  };

  const startGame = async () => {
    setRecords([]);
    await startRound(0);
  };

  const toggleEra = (eraIndex: number) => {
    if (stage !== "playing") return;
    setPickedEras((prev) => {
      if (prev.includes(eraIndex)) {
        return prev.filter((i) => i !== eraIndex);
      }
      if (prev.length >= MAX_PICKS) {
        return [...prev.slice(1), eraIndex];
      }
      return [...prev, eraIndex];
    });
  };

  const handleConfirm = () => {
    if (!scenario || pickedEras.length === 0) return;
    setRecords((prev) => [...prev, { scenario, pickedEras }]);
    setStage("revealing");
  };

  const handleNext = async () => {
    if (roundIndex + 1 >= ROUND_COUNT) {
      setStage("finished");
      return;
    }
    await startRound(roundIndex + 1);
  };

  const lastRecord = records[records.length - 1];
  const activeScenario =
    stage === "revealing"
      ? (lastRecord?.scenario ?? scenario)
      : scenario;
  const activePicks =
    stage === "revealing"
      ? (lastRecord?.pickedEras ?? pickedEras)
      : pickedEras;

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
              <LobbyScreen onStart={startGame} error={error} loading={loading} />
            </motion.div>
          )}

          {stage === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex min-h-[40vh] flex-col items-center justify-center border-2 border-ink bg-ink text-cream p-10 shadow-[10px_10px_0_#D32F2F]"
            >
              <div className="flex gap-1.5 mb-5">
                {[0, 1, 2].map((i) => (
                  <motion.span
                    key={i}
                    className="h-2 w-2 bg-blood"
                    animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.15,
                    }}
                  />
                ))}
              </div>
              <p className="font-headline text-xl md:text-2xl uppercase tracking-tight">
                AI đang soạn hồ sơ…
              </p>
              <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em] text-cream/60">
                Vòng {roundIndex + 1} / {ROUND_COUNT}
              </p>
            </motion.div>
          )}

          {(stage === "playing" || stage === "revealing") && activeScenario && (
            <motion.div
              key={`round-${roundIndex}-${stage}-${activeScenario.description.slice(0, 24)}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
            >
              <RoundView
                scenario={activeScenario}
                roundIndex={roundIndex}
                pickedEras={activePicks}
                stage={stage}
                onToggle={toggleEra}
                onConfirm={handleConfirm}
                onNext={handleNext}
                isLast={roundIndex + 1 >= ROUND_COUNT}
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
                records={records}
                onReplay={startGame}
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
  onExit,
  onHome,
}: {
  stage: Stage;
  roundIndex: number;
  onExit: () => void;
  onHome: () => void;
}) {
  const progress =
    stage !== "lobby"
      ? ((stage === "finished" ? ROUND_COUNT : roundIndex) / ROUND_COUNT) * 100
      : 0;

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 mb-4">
        <button
          type="button"
          onClick={onExit}
          className="font-mono text-sm uppercase tracking-[0.25em] text-ink/70 hover:text-blood"
        >
          ← Quay về
        </button>
        <StampTag tone="red" rotate={-2}>
          {GAME_TITLE_FULL}
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
          <div className="flex-1 h-2.5 border-2 border-ink overflow-hidden bg-cream">
            <motion.div
              className="h-full bg-blood"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.35 }}
            />
          </div>
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink/55 whitespace-nowrap">
            Vòng {Math.min(roundIndex + 1, ROUND_COUNT)}/{ROUND_COUNT}
          </span>
        </div>
      )}
    </div>
  );
}

function LobbyScreen({
  onStart,
  error,
  loading,
}: {
  onStart: () => void;
  error: string | null;
  loading: boolean;
}) {
  return (
    <div className="grid md:grid-cols-12 gap-10 mt-4 items-center">
      <div className="md:col-span-7">
        <StampTag tone="red" className="mb-4">
          Trò chơi thuyết trình
        </StampTag>
        <h1 className="headline text-[clamp(3rem,8vw,6.5rem)] text-ink leading-[0.92]">
          HỒ SƠ
          <br />
          <span className="text-blood">THỜI ĐẠI</span> AI
        </h1>
        <p className="serif text-xl italic text-ink/80 max-w-xl border-l-4 border-blood pl-6 mt-6">
          5 vòng · đọc tình huống ngắn như một mẩu chuyện, suy luận 1–2 giai
          đoạn phù hợp.
        </p>
        <ul className="mt-6 space-y-3 serif text-lg text-ink/85">
          <li>
            <strong className="text-blood font-headline">01.</strong> AI kể một
            hoàn cảnh cụ thể — không lộ tên giai đoạn hay thuật ngữ sách giáo
            khoa.
          </li>
          <li>
            <strong className="text-blood font-headline">02.</strong> Chọn tối
            đa <strong>2</strong> đáp án nếu mô tả trộn lẫn.
          </li>
          <li>
            <strong className="text-blood font-headline">03.</strong> Tiết lộ
            đáp án và giải thích sau mỗi vòng.
          </li>
        </ul>
      </div>
      <div className="md:col-span-5 flex justify-center md:justify-end">
        <div className="border-2 border-ink bg-bone p-8 md:p-10 shadow-[10px_10px_0_#D32F2F] w-full max-w-sm text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-ink/60 mb-6">
            Sẵn sàng?
          </p>
          <p className="headline text-6xl text-blood mb-2">{ROUND_COUNT}</p>
          <p className="font-mono text-sm uppercase tracking-[0.2em] text-ink/55 mb-8">
            vòng chơi
          </p>
          <button
            type="button"
            onClick={onStart}
            disabled={loading}
            className="w-full bg-blood text-cream py-4 font-headline text-xl uppercase tracking-wide shadow-[6px_6px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform disabled:opacity-50"
          >
            {loading ? "Đang tải…" : "Bắt đầu chơi →"}
          </button>
          {error && (
            <p className="mt-4 font-mono text-sm text-blood">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}

function RoundView({
  scenario,
  roundIndex,
  pickedEras,
  stage,
  onToggle,
  onConfirm,
  onNext,
  isLast,
  loadingNext,
}: {
  scenario: ScenarioResult;
  roundIndex: number;
  pickedEras: number[];
  stage: "playing" | "revealing";
  onToggle: (era: number) => void;
  onConfirm: () => void;
  onNext: () => void;
  isLast: boolean;
  loadingNext?: boolean;
}) {
  const { primary, secondary, primaryPct, secondaryPct } =
    getEraRoles(scenario);
  const revealLabel =
    stage === "revealing" ? getRevealLabel(pickedEras, scenario) : null;
  const pickSet = new Set(pickedEras);

  return (
    <div className="flex flex-col gap-6">
      <ScenarioBrief description={scenario.description} roundIndex={roundIndex} />

      <div>
        <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-headline text-xl md:text-2xl uppercase text-ink">
              Chọn đáp án
            </p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.2em] text-ink/55">
              {stage === "playing"
                ? `1–${MAX_PICKS} lựa chọn · đã chọn ${pickedEras.length}`
                : "Đỏ = chủ đạo · Vàng = phụ"}
            </p>
          </div>
          {stage === "playing" && pickedEras.length > 0 && (
            <button
              type="button"
              onClick={onConfirm}
              className="bg-blood text-cream px-6 py-3 font-headline text-base uppercase tracking-wide shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform"
            >
              Xác nhận →
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ERAS.map((era, i) => {
            const letter = String.fromCharCode(65 + i);
            const isSelected = pickSet.has(i);
            const isPrimary = stage === "revealing" && i === primary;
            const isSecondary = stage === "revealing" && i === secondary;

            return (
              <button
                key={era.id}
                type="button"
                disabled={stage === "revealing"}
                onClick={() => onToggle(i)}
                className={cn(
                  "relative text-left border-2 p-4 md:p-5 flex gap-4 transition-all min-h-[5.5rem]",
                  isPrimary
                    ? "border-blood bg-blood text-cream shadow-[4px_4px_0_#1A1A1A]"
                    : isSecondary
                      ? "border-ink bg-flagYellow text-ink shadow-[4px_4px_0_#1A1A1A]"
                      : isSelected && stage === "playing"
                        ? "border-blood bg-bone ring-2 ring-blood ring-offset-1"
                        : "border-ink bg-cream hover:bg-bone shadow-[2px_2px_0_#1A1A1A]",
                  stage === "revealing" &&
                    !isPrimary &&
                    !isSecondary &&
                    "opacity-40",
                )}
              >
                <span
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center font-headline text-xl border-2",
                    isPrimary
                      ? "border-cream bg-cream text-blood"
                      : isSecondary
                        ? "border-ink bg-ink text-flagYellow"
                        : isSelected
                          ? "border-blood bg-blood text-cream"
                          : "border-ink bg-ink text-cream",
                  )}
                >
                  {letter}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-headline text-base md:text-lg uppercase leading-tight">
                    {era.text}
                  </span>
                  <span
                    className={cn(
                      "mt-1 block font-mono text-xs md:text-sm uppercase tracking-[0.1em] line-clamp-2",
                      isPrimary ? "text-cream/70" : "text-ink/50",
                    )}
                  >
                    {era.label}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {stage === "revealing" && revealLabel && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-2 border-ink bg-cream p-5 md:p-6 shadow-[4px_4px_0_#1A1A1A]"
          >
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <StampTag tone="red">{revealLabel}</StampTag>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/50">
                {getEraByIndex(primary).label} {primaryPct}% ·{" "}
                {getEraByIndex(secondary).label} {secondaryPct}%
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              <SplitBar
                label={getEraByIndex(primary).label}
                pct={primaryPct}
                tone="blood"
              />
              <SplitBar
                label={getEraByIndex(secondary).label}
                pct={secondaryPct}
                tone="ink"
              />
            </div>

            <p className="serif text-base md:text-lg text-ink/85 leading-relaxed">
              {scenario.explanation}
            </p>

            <div className="mt-5 flex justify-end">
              <button
                type="button"
                onClick={onNext}
                disabled={loadingNext}
                className="bg-ink text-cream px-6 py-2.5 font-headline text-sm uppercase shadow-[3px_3px_0_#D32F2F] hover:-translate-y-0.5 transition-transform disabled:opacity-50"
              >
                {isLast ? "Kết thúc" : "Vòng tiếp →"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
      <div className="flex justify-between mb-1 font-mono text-[10px] uppercase tracking-[0.12em]">
        <span className="truncate pr-2">{label}</span>
        <span className="shrink-0">{pct}%</span>
      </div>
      <div className="h-2 border border-ink bg-bone overflow-hidden">
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
  records,
  onReplay,
  onHome,
}: {
  records: RoundRecord[];
  onReplay: () => void;
  onHome: () => void;
}) {
  return (
    <div className="grid md:grid-cols-12 gap-8 mt-4">
      <div className="md:col-span-5 border-2 border-ink bg-ink text-cream p-8 shadow-[10px_10px_0_#D32F2F]">
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-cream/60">
          Hoàn thành
        </p>
        <h2 className="headline text-4xl md:text-5xl uppercase mt-2 text-flagYellow">
          {ROUND_COUNT} vòng
        </h2>
        <p className="serif italic text-cream/80 mt-3">
          Cảm ơn đã tham gia — xem lại từng hồ sơ bên phải.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReplay}
            className="bg-blood text-cream px-6 py-3 font-headline uppercase text-sm"
          >
            Chơi lại
          </button>
          <button
            type="button"
            onClick={onHome}
            className="border-2 border-cream px-6 py-3 font-headline uppercase text-sm hover:bg-cream hover:text-ink transition-colors"
          >
            Về phân loại
          </button>
        </div>
      </div>
      <div className="md:col-span-7 border-2 border-ink bg-bone p-5 max-h-[480px] overflow-y-auto">
        <p className="font-headline uppercase text-lg mb-4">Tóm tắt các vòng</p>
        <ul className="space-y-3">
          {records.map((r, i) => {
            const { primary, secondary } = getEraRoles(r.scenario);
            return (
              <li
                key={i}
                className="border-2 border-ink/20 bg-cream p-4 text-sm"
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50 mb-2">
                  Vòng {i + 1}
                </div>
                <p className="serif text-ink/90 leading-snug mb-2 line-clamp-2">
                  {r.scenario.description}
                </p>
                <p className="font-mono text-[9px] uppercase text-ink/45">
                  Bạn chọn:{" "}
                  {r.pickedEras.map((idx) => ERAS[idx].label).join(" + ")}
                </p>
                <p className="font-mono text-[9px] uppercase text-blood mt-1">
                  Đáp án: {ERAS[primary].label} + {ERAS[secondary].label}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
