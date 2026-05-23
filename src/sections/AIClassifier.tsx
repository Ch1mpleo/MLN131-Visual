import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import SectionHeader from "@/components/ui/SectionHeader";
import StampTag from "@/components/ui/StampTag";
import ClassifierTimeline from "@/components/ClassifierTimeline";
import {
  useGeminiClassifier,
  type ClassifyResult,
} from "@/hooks/useGeminiClassifier";
import { navigate } from "@/lib/router";

type ViewState = "idle" | "loading" | "result";

function VerdictPanel({ result }: { result: ClassifyResult }) {
  return (
    <div className="h-full border-2 border-ink bg-cream shadow-[6px_6px_0_#1A1A1A] flex flex-col">
      <div className="border-b-2 border-ink bg-bone px-5 py-4 md:px-6 shrink-0">
        <StampTag tone="red" className="mb-3 text-[9px]">
          Phán quyết
        </StampTag>
        <h3 className="headline text-xl md:text-2xl lg:text-3xl uppercase leading-tight text-ink">
          {result.verdict_title}
        </h3>
        <p className="mt-2 serif text-sm md:text-base text-ink/85 leading-snug max-w-3xl">
          {result.verdict_summary}
        </p>
      </div>

      <div className="flex-1 p-5 md:p-6">
        <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-ink/55 mb-3">
          Dấu hiệu nhận diện
        </p>
        <ul className="space-y-2.5">
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
  );
}

function RightPanelPlaceholder() {
  return (
    <div className="h-full min-h-[280px] flex items-center justify-center border-2 border-dashed border-ink/25 bg-bone/40 p-8">
      <p className="serif italic text-center text-ink/45 text-base max-w-xs">
        Kết quả phân loại sẽ hiển thị tại đây sau khi bạn gửi mô tả.
      </p>
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

        <div className="flex flex-col gap-8">
          {/* Timeline — full width above */}
          <div className="border-2 border-ink bg-bone px-3 py-8 sm:px-6 md:px-10 md:py-12 shadow-[8px_8px_0_#D32F2F]">
            <div className="mb-6 md:mb-8 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-xs md:text-sm uppercase tracking-[0.25em] text-ink/60">
                ▣ Trục lịch sử · 6 giai đoạn
              </p>
              {showTimelineMarker && (
                <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-blood animate-pulse">
                  Vị trí đã xác định
                </span>
              )}
            </div>

            <ClassifierTimeline
              size="large"
              result={result}
              showMarker={showTimelineMarker}
            />

            {view === "idle" && !error && (
              <p className="mt-6 text-center serif italic text-ink/45 text-sm">
                Nhập mô tả bên dưới — điểm đánh dấu sẽ căn đúng trên trục.
              </p>
            )}
          </div>

          {/* Input left · Verdict right */}
          <div className="grid gap-6 lg:grid-cols-[minmax(0,3fr)_minmax(0,7fr)] lg:gap-8 lg:items-stretch">
            <div className="border-2 border-ink bg-bone p-5 md:p-7 shadow-[8px_8px_0_#1A1A1A] flex flex-col">
              <div className="mb-4 font-mono text-xs uppercase tracking-[0.3em] text-ink/60">
                ▣ Hồ sơ mô tả
              </div>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={loading}
                placeholder="Ví dụ: Người dân bầu cử tự do nhưng chỉ những ai sở hữu đất đai mới được ứng cử..."
                rows={8}
                className="flex-1 w-full min-h-[12rem] resize-none border-2 border-ink bg-cream px-4 py-3 serif text-lg text-ink placeholder:text-ink/40 focus:outline-none focus:ring-2 focus:ring-blood disabled:opacity-60"
              />
              {error && (
                <p className="mt-3 font-mono text-sm text-blood">{error}</p>
              )}
              <div className="mt-5 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={loading || !input.trim()}
                  className="bg-blood text-cream px-6 py-3 font-headline uppercase tracking-wide shadow-[4px_4px_0_#1A1A1A] hover:-translate-y-0.5 transition-transform disabled:opacity-50"
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

            <div className="min-h-[280px]">
              <AnimatePresence mode="wait">
                {view === "loading" && (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full min-h-[280px] flex items-center justify-center border-2 border-ink bg-ink text-cream p-8"
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
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <VerdictPanel result={result} />
                  </motion.div>
                )}

                {view === "idle" && (
                  <motion.div
                    key="placeholder"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="h-full"
                  >
                    <RightPanelPlaceholder />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
