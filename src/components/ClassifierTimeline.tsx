import { motion } from "motion/react";
import { ERAS } from "@/data/democracyErasData";
import { cn } from "@/lib/utils";
import type { ClassifyResult } from "@/hooks/useGeminiClassifier";

const ERA_COUNT = ERAS.length;

/** Timeline strip colors — aligned with course infographic */
const ERA_STRIP: Record<number, string> = {
  0: "bg-stone-400",
  1: "bg-amber-500",
  2: "bg-slate-500",
  3: "bg-emerald-600",
  4: "bg-blood",
  5: "bg-blood",
};

/** Center of era column i on a 6-column grid (matches CSS grid cell centers) */
function eraCenterPercent(index: number): number {
  return ((index + 0.5) / ERA_COUNT) * 100;
}

function weightedPosition(result: ClassifyResult): number {
  const p = eraCenterPercent(result.primary_era);
  if (
    result.secondary_era === null ||
    result.secondary_pct === null ||
    result.secondary_pct <= 0
  ) {
    return p;
  }
  const s = eraCenterPercent(result.secondary_era);
  return p * (result.primary_pct / 100) + s * (result.secondary_pct / 100);
}

type Props = {
  result?: ClassifyResult | null;
  showMarker?: boolean;
  size?: "default" | "large";
};

export default function ClassifierTimeline({
  result,
  showMarker = false,
  size = "default",
}: Props) {
  const large = size === "large";
  const hasResult = showMarker && result != null;

  const primary = result?.primary_era ?? -1;
  const secondary = result?.secondary_era ?? -1;

  const rangeMin =
    hasResult && result && result.secondary_era !== null
      ? Math.min(result.primary_era, result.secondary_era)
      : primary;
  const rangeMax =
    hasResult && result && result.secondary_era !== null
      ? Math.max(result.primary_era, result.secondary_era)
      : primary;

  const rangeLeft = eraCenterPercent(rangeMin);
  const rangeRight = eraCenterPercent(rangeMax);
  const markerLeft = hasResult && result ? weightedPosition(result) : 50;

  const leftPctInRange =
    hasResult && result && result.secondary_era !== null
      ? result.primary_era === rangeMin
        ? result.primary_pct
        : (result.secondary_pct ?? 0)
      : 100;

  return (
    <div className="w-full">
      {/* Unified 6-column grid: nodes + labels share columns with track below */}
      <div
        className={cn(
          "grid grid-cols-6",
          large ? "gap-x-1 sm:gap-x-2" : "gap-x-0.5 sm:gap-x-1",
        )}
      >
        {ERAS.map((era, i) => {
          const isPrimary = hasResult && i === primary;
          const isSecondary = hasResult && i === secondary;
          const inRange =
            hasResult && i >= rangeMin && i <= rangeMax && rangeMin !== rangeMax;

          return (
            <div
              key={era.id}
              className="flex flex-col items-center text-center justify-start"
            >
              <motion.div
                className={cn(
                  "flex shrink-0 items-center justify-center border-2 font-headline transition-colors",
                  large
                    ? "mb-3 h-14 w-14 sm:h-16 sm:w-16 md:h-[4.25rem] md:w-[4.25rem] text-lg md:text-2xl"
                    : "mb-2 h-10 w-10 md:h-11 md:w-11 text-sm md:text-base",
                  ERA_STRIP[i],
                  isPrimary
                    ? "border-ink text-cream shadow-[4px_4px_0_#1A1A1A] z-10"
                    : isSecondary
                      ? "border-ink text-cream shadow-[3px_3px_0_#1A1A1A]"
                      : inRange
                        ? "border-ink/60 text-cream opacity-75"
                        : hasResult
                          ? "border-ink/20 opacity-35"
                          : "border-ink text-cream",
                )}
                animate={isPrimary ? { scale: [1, 1.06, 1.04] } : { scale: 1 }}
                transition={{ duration: 0.35 }}
              >
                {i + 1}
              </motion.div>
              <span
                className={cn(
                  "font-headline uppercase leading-tight tracking-tight px-0.5",
                  large
                    ? "text-[9px] sm:text-[10px] md:text-xs min-h-[2.25rem] md:min-h-[2.5rem]"
                    : "text-[8px] sm:text-[9px]",
                  isPrimary || isSecondary
                    ? "text-ink"
                    : hasResult
                      ? "text-ink/35"
                      : "text-ink/70",
                )}
              >
                {large ? era.label : era.label.split(" ").slice(0, 3).join(" ")}
              </span>
              <span
                className={cn(
                  "mt-0.5 font-mono uppercase tracking-[0.1em] leading-tight",
                  large
                    ? "text-[8px] sm:text-[9px] md:text-[10px]"
                    : "text-[7px] sm:text-[8px]",
                  isPrimary || isSecondary ? "text-blood" : "text-ink/40",
                )}
              >
                {large ? era.text : era.text.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          );
        })}

        {/* Track — same grid, spans all columns */}
        <div
          className={cn(
            "col-span-6 relative w-full",
            large ? "mt-6 h-10 md:h-12" : "mt-4 h-7 md:h-8",
          )}
        >
          {/* Baseline */}
          <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/20" />
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-ink/20" />

          {/* Tick at each era center — aligned to grid columns */}
          {ERAS.map((_, i) => (
            <div
              key={`tick-${i}`}
              className="absolute top-1/2 z-[1] w-0.5 -translate-x-1/2 -translate-y-1/2 bg-ink/40"
              style={{
                left: `${eraCenterPercent(i)}%`,
                height: large ? "1rem" : "0.75rem",
              }}
            />
          ))}

          {/* Split range bar between two eras */}
          {hasResult && result && rangeMin !== rangeMax && (
            <motion.div
              className={cn(
                "absolute top-1/2 z-[2] -translate-y-1/2 overflow-hidden border border-ink",
                large ? "h-3 md:h-3.5" : "h-2",
              )}
              style={{
                left: `${rangeLeft}%`,
                width: `${rangeRight - rangeLeft}%`,
                transform: "translateY(-50%)",
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
            >
              <div
                className="absolute inset-y-0 left-0 bg-blood"
                style={{ width: `${leftPctInRange}%` }}
              />
              <div
                className="absolute inset-y-0 right-0 bg-ink/75"
                style={{ width: `${100 - leftPctInRange}%` }}
              />
            </motion.div>
          )}

          {/* Single-era dot */}
          {hasResult && result && rangeMin === rangeMax && primary >= 0 && (
            <motion.div
              className={cn(
                "absolute top-1/2 z-[3] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-blood shadow-[2px_2px_0_#1A1A1A]",
                large ? "h-5 w-5 md:h-6 md:w-6" : "h-3.5 w-3.5",
              )}
              style={{ left: `${markerLeft}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 280, damping: 20 }}
            />
          )}

          {/* Split marker — sits on weighted position along axis */}
          {hasResult &&
            result &&
            result.secondary_era !== null &&
            result.secondary_pct !== null && (
              <motion.div
                className="absolute top-1/2 z-[4] -translate-x-1/2"
                style={{ left: `${markerLeft}%` }}
                initial={{ scale: 0, y: 6 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="flex flex-col items-center -translate-y-full pb-0">
                  <div
                    className={cn(
                      "border-2 border-ink bg-flagYellow font-mono font-bold uppercase tracking-wide whitespace-nowrap shadow-[2px_2px_0_#1A1A1A]",
                      large
                        ? "px-3 py-1 text-xs md:text-sm"
                        : "px-2 py-0.5 text-[10px]",
                    )}
                  >
                    {result.primary_pct}/{result.secondary_pct}
                  </div>
                  <div className="h-0 w-0 border-x-[5px] border-x-transparent border-t-[5px] border-t-ink" />
                </div>
                <div
                  className={cn(
                    "absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-ink",
                    large ? "h-5 md:h-6" : "h-4",
                  )}
                />
              </motion.div>
            )}

          {/* 100% label */}
          {hasResult &&
            result &&
            result.secondary_era === null &&
            primary >= 0 && (
              <motion.div
                className={cn(
                  "absolute z-[4] -translate-x-1/2 font-mono font-bold uppercase tracking-wider text-blood whitespace-nowrap",
                  large ? "bottom-full mb-1 text-xs md:text-sm" : "bottom-full mb-0.5 text-[10px]",
                )}
                style={{ left: `${markerLeft}%` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                100%
              </motion.div>
            )}
        </div>
      </div>

      {hasResult && result && result.secondary_era !== null && (
        <motion.div
          className={cn(
            "flex flex-wrap justify-center",
            large ? "mt-8 gap-6 md:gap-10" : "mt-6 gap-4",
          )}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <LegendChip
            color="bg-blood"
            label={ERAS[result.primary_era].label}
            pct={result.primary_pct}
            role="Chủ đạo"
          />
          <LegendChip
            color="bg-ink/80"
            label={ERAS[result.secondary_era].label}
            pct={result.secondary_pct ?? 0}
            role="Phụ"
          />
        </motion.div>
      )}
    </div>
  );
}

function LegendChip({
  color,
  label,
  pct,
  role,
}: {
  color: string;
  label: string;
  pct: number;
  role: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={cn("h-3 w-3 border border-ink shrink-0", color)} />
      <div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
          {role}
        </span>
        <p className="font-headline text-xs md:text-sm uppercase text-ink">
          {label}{" "}
          <span className="text-blood">{pct}%</span>
        </p>
      </div>
    </div>
  );
}
