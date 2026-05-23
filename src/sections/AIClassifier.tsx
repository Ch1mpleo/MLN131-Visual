import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "@/components/ui/SectionHeader";
import StampTag from "@/components/ui/StampTag";
import ClassifierTimeline from "@/components/ClassifierTimeline";
import {
  useGeminiClassifier,
  type ClassifyResult,
} from "@/hooks/useGeminiClassifier";
import { ERAS } from "@/data/democracyErasData";
import { navigate } from "@/lib/router";

type ViewState = "idle" | "loading" | "result";

function VerdictPanel({ result }: { result: ClassifyResult }) {
  const primaryEra = ERAS[result.primary_era];

  return (
    <div className="border-2 border-ink bg-cream shadow-[6px_6px_0_#1A1A1A]">
      <div className="border-b-2 border-ink bg-bone px-5 py-4 md:px-6">
        <StampTag tone="red" className="mb-3 text-[9px]">
          Phán quyết
        </StampTag>
        <h3 className="headline text-2xl md:text-3xl uppercase leading-tight text-ink">
          {result.verdict_title}
        </h3>
        <p className="mt-2 serif text-base md:text-lg text-ink/85 leading-snug max-w-2xl">
          {result.verdict_summary}
        </p>
      </div>

      <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x-2 divide-ink">
        <div className="p-5 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 mb-3">
            Giai đoạn khớp nhất
          </p>
          <div className="border-2 border-blood bg-blood text-cream p-4 shadow-[3px_3px_0_#1A1A1A]">
            <p className="font-headline text-lg uppercase leading-tight">
              {primaryEra.label}
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.15em] text-cream/70 mt-1">
              {primaryEra.text} · {result.primary_pct}%
            </p>
          </div>
          {result.secondary_era !== null && result.secondary_pct !== null && (
            <div className="mt-3 border-2 border-ink bg-bone p-3">
              <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-ink/50 mb-1">
                Giai đoạn phụ
              </p>
              <p className="font-headline text-sm uppercase text-ink">
                {ERAS[result.secondary_era].label}{" "}
                <span className="text-blood">{result.secondary_pct}%</span>
              </p>
            </div>
          )}
        </div>

        <div className="p-5 md:p-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 mb-3">
            Dấu hiệu nhận diện
          </p>
          <ul className="space-y-2">
            {result.key_signals.map((signal, i) => (
              <li
                key={i}
                className="flex gap-3 border-l-2 border-blood pl-3 serif text-sm md:text-base text-ink/90 leading-snug"
              >
                <span className="font-headline text-blood shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{signal}</span>
              </li>
            ))}
          </ul>
          {result.indicators.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-1.5">
              {result.indicators.map((tag) => (
                <StampTag key={tag} tone="ink" className="text-[7px]">
                  {tag}
                </StampTag>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function AIClassifier() {
  const [view, setView] = useState<ViewState>("idle");
  const [input, setInput] = useState("");
  const [result, setResult] = useState<ClassifyResult | null>(null);
  const { classify, loading, error, clearError } = useGeminiClassifier();

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text || loading) return;
    clearError();
    setView("loading");
    setResult(null);
    try {
      const data = await classify(text);
      setResult(data);
      setView("result");
    } catch {
      setView("idle");
    }
  };

  const handleReset = () => {
    setView("idle");
    setResult(null);
    clearError();
  };

  const showTimelineMarker = view === "result" && result != null;

  return (
    <section id="classifier" className="relative bg-cream py-16 md:py-24">
      <div className="absolute inset-x-0 top-0 h-1 bg-blood" />

      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeader
          phase="AI"
          eyebrow="Phân loại tư tưởng"
          title="PHÂN LOẠI DÂN CHỦ"
          tagline="Mô tả bất kỳ xã hội, chế độ thật hay tưởng tượng — AI đặt vị trí trên trục lịch sử 6 giai đoạn."
          className="mb-10"
        />

        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="border-2 border-ink bg-bone p-6 md:p-8 shadow-[8px_8px_0_#1A1A1A]">
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
                ▣ Hồ sơ mô tả
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Ví dụ: Người dân bầu cử tự do nhưng chỉ những ai sở hữu đất đai mới được ứng cử..."
                rows={7}
                className="w-full resize-none border-2 border-ink bg-cream px-4 py-3 serif text-lg text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-blood disabled:opacity-60"
              />
              {error && (
                <p className="mt-3 font-mono text-sm text-blood">{error}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !input.trim()}
                  className="bg-blood text-cream px-6 py-3 font-headline uppercase tracking-wide shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform disabled:opacity-50 disabled:hover:translate-y-0"
                >
                  {loading ? "Đang phân tích…" : "Phân loại →"}
                </button>
                {view === "result" && (
                  <button
                    type="button"
                    onClick={handleReset}
                    className="border-2 border-ink px-5 py-3 font-mono text-sm uppercase tracking-[0.2em] hover:bg-ink hover:text-cream transition-colors"
                  >
                    Làm mới
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6">
            {/* Timeline — always visible */}
            <div className="border-2 border-ink bg-bone p-5 md:p-8 shadow-[6px_6px_0_#D32F2F]">
              <div className="mb-6 flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-xs uppercase tracking-[0.25em] text-ink/60">
                  ▣ Trục lịch sử · 6 giai đoạn
                </p>
                {showTimelineMarker && result && (
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-blood animate-pulse">
                    Vị trí đã xác định
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                {view === "loading" ? (
                  <motion.div
                    key="tl-loading"
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="opacity-50 pointer-events-none"
                  >
                    <ClassifierTimeline />
                  </motion.div>
                ) : (
                  <motion.div
                    key="tl-main"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <ClassifierTimeline
                      result={result}
                      showMarker={showTimelineMarker}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              {view === "idle" && !error && (
                <p className="mt-6 text-center serif italic text-ink/45 text-sm">
                  Nhập mô tả bên trái — điểm đánh dấu sẽ xuất hiện trên trục.
                </p>
              )}
            </div>

            <AnimatePresence mode="wait">
              {view === "loading" && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center justify-center border-2 border-ink bg-ink text-cream py-10 px-6"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex gap-1">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="h-2 w-2 bg-blood"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </div>
                    <p className="font-mono text-sm uppercase tracking-[0.3em]">
                      AI đang phân tích…
                    </p>
                  </div>
                </motion.div>
              )}

              {view === "result" && result && (
                <motion.div
                  key="verdict"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                >
                  <VerdictPanel result={result} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
