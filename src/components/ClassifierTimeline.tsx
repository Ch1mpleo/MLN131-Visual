import { motion } from "motion/react";
import { ERAS } from "@/data/democracyErasData";
import { cn } from "@/lib/utils";
import type { ClassifyResult } from "@/hooks/useGeminiClassifier";

/** Timeline strip colors — aligned with course infographic */
const ERA_STRIP: Record<number, string> = {
  0: "bg-stone-400",
  1: "bg-amber-500",
  2: "bg-slate-500",
  3: "bg-emerald-600",
  4: "bg-blood",
  5: "bg-blood",
};

function eraCenterPercent(index: number): number {
  if (ERAS.length <= 1) return 50;
  return (index / (ERAS.length - 1)) * 100;
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
};

export default function ClassifierTimeline({ result, showMarker = false }: Props) {
  const hasResult = showMarker && result != null;
  const markerLeft = hasResult && result ? weightedPosition(result) : 50;

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

  return (
    <div className="w-full">
      {/* Era labels + nodes */}
      <div className="relative grid grid-cols-6 gap-1 md:gap-0 mb-2">
        {ERAS.map((era, i) => {
          const isPrimary = hasResult && i === primary;
          const isSecondary = hasResult && i === secondary;
          const inRange =
            hasResult && i >= rangeMin && i <= rangeMax && rangeMin !== rangeMax;

          return (
            <div
              key={era.id}
              className="flex flex-col items-center text-center px-0.5"
            >
              <motion.div
                className={cn(
                  "mb-2 flex h-10 w-10 md:h-12 md:w-12 items-center justify-center border-2 font-headline text-sm md:text-base transition-colors",
                  ERA_STRIP[i],
                  isPrimary
                    ? "border-ink text-cream shadow-[4px_4px_0_#1A1A1A] scale-110 z-10"
                    : isSecondary
                      ? "border-ink text-cream shadow-[3px_3px_0_#1A1A1A] opacity-90"
                      : inRange
                        ? "border-ink/60 text-cream opacity-70"
                        : hasResult
                          ? "border-ink/20 opacity-35"
                          : "border-ink text-cream opacity-80",
                )}
                animate={
                  isPrimary
                    ? { scale: [1, 1.08, 1.05] }
                    : { scale: 1 }
                }
                transition={{ duration: 0.4 }}
              >
                {i + 1}
              </motion.div>
              <span
                className={cn(
                  "font-headline text-[9px] md:text-[10px] uppercase leading-tight tracking-tight",
                  isPrimary || isSecondary
                    ? "text-ink"
                    : hasResult
                      ? "text-ink/35"
                      : "text-ink/70",
                )}
              >
                {era.label.split(" ").slice(0, 3).join(" ")}
              </span>
              <span
                className={cn(
                  "mt-0.5 hidden font-mono text-[8px] uppercase tracking-[0.12em] sm:block",
                  isPrimary || isSecondary ? "text-blood" : "text-ink/40",
                )}
              >
                {era.text.split(" ").slice(0, 2).join(" ")}
              </span>
            </div>
          );
        })}
      </div>

      {/* Track */}
      <div className="relative mx-2 md:mx-5 h-4 md:h-5">
        <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-ink/15" />
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 border-t-2 border-dashed border-ink/25" />

        {/* Inactive era ticks */}
        {ERAS.map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-ink/25"
            style={{ left: `${eraCenterPercent(i)}%` }}
          />
        ))}

        {/* Highlighted span between primary & secondary */}
        {hasResult && result && rangeMin !== rangeMax && (() => {
          const leftEra = rangeMin;
          const leftPct =
            result.primary_era === leftEra
              ? result.primary_pct
              : (result.secondary_pct ?? 0);
          const rightPct =
            result.primary_era === rangeMax
              ? result.primary_pct
              : (result.secondary_pct ?? 0);
          return (
          <motion.div
            className="absolute top-1/2 h-2 -translate-y-1/2 overflow-hidden border border-ink"
            style={{
              left: `${rangeLeft}%`,
              width: `${rangeRight - rangeLeft}%`,
            }}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div
              className="absolute inset-y-0 left-0 bg-blood"
              style={{ width: `${leftPct}%` }}
            />
            <div
              className="absolute inset-y-0 right-0 bg-ink/70"
              style={{ width: `${rightPct}%` }}
            />
          </motion.div>
          );
        })()}

        {/* Single-era fill */}
        {hasResult && result && rangeMin === rangeMax && primary >= 0 && (
          <motion.div
            className="absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-blood shadow-[2px_2px_0_#1A1A1A]"
            style={{ left: `${markerLeft}%` }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 280, damping: 20 }}
          />
        )}

        {/* Split marker + label on line */}
        {hasResult &&
          result &&
          result.secondary_era !== null &&
          result.secondary_pct !== null && (
            <>
              <motion.div
                className="absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${markerLeft}%` }}
                initial={{ scale: 0, y: 8 }}
                animate={{ scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <div className="flex flex-col items-center">
                  <div className="border-2 border-ink bg-flagYellow px-2 py-0.5 font-mono text-[10px] md:text-xs font-bold uppercase tracking-wide whitespace-nowrap shadow-[2px_2px_0_#1A1A1A]">
                    {result.primary_pct}/{result.secondary_pct}
                  </div>
                  <div className="h-0 w-0 border-x-[6px] border-x-transparent border-t-[6px] border-t-ink" />
                  <div className="h-4 w-1 bg-ink" />
                </div>
              </motion.div>
            </>
          )}

        {/* 100% label above single-era marker */}
        {hasResult &&
          result &&
          result.secondary_era === null &&
          primary >= 0 && (
            <motion.div
              className="absolute -top-7 -translate-x-1/2 font-mono text-[10px] font-bold uppercase tracking-wider text-blood"
              style={{ left: `${markerLeft}%` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              100%
            </motion.div>
          )}
      </div>

      {/* Legend under track when split */}
      {hasResult && result && result.secondary_era !== null && (
        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4 md:gap-8"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
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
      <span className={cn("h-3 w-3 border border-ink", color)} />
      <div>
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/55">
          {role}
        </span>
        <p className="font-headline text-xs uppercase text-ink">
          {label}{" "}
          <span className="text-blood">{pct}%</span>
        </p>
      </div>
    </div>
  );
}
