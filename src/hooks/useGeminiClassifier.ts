import { useCallback, useState } from "react";
import {
  ERAS,
  pickTwoRandomEraIndices,
  type DemocracyEra,
} from "@/data/democracyErasData";

const GEMINI_MODEL = "gemini-3.5-flash";
const API_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

export type ClassifyResult = {
  primary_era: number;
  primary_pct: number;
  secondary_era: number | null;
  secondary_pct: number | null;
  verdict_title: string;
  verdict_summary: string;
  key_signals: string[];
  indicators: string[];
};

export type ScenarioResult = {
  description: string;
  era_a: number;
  era_b: number;
  pct_a: number;
  pct_b: number;
  explanation: string;
};

const ERA_TAXONOMY = ERAS.map(
  (e, i) =>
    `[${i}] ${e.text} — ${e.label}: ${e.features.slice(0, 2).join("; ")}`,
).join("\n");

const SYSTEM_CONTEXT = `Bạn là chuyên gia lý luận chính trị Việt Nam, phân loại mô tả xã hội/chế độ theo 6 giai đoạn phát triển dân chủ (chỉ số 0–5):

${ERA_TAXONOMY}

Quy tắc:
- Phân tích theo đặc trưng cấu trúc (quyền lực, bầu cử, giai cấp, tư hữu/tập thể, nhà nước), không chỉ từ khóa.
- Mô tả có thể là thật, giả định, hoặc không đầy đủ.
- primary_era + secondary_era là chỉ số 0–5; phần trăm hai era phải cộng = 100 nếu có secondary.
- Trả lời bằng tiếng Việt.`;

function getApiKey(): string {
  const key = import.meta.env.VITE_GEMINI_API_KEY;
  if (!key?.trim()) {
    throw new Error(
      "Thiếu VITE_GEMINI_API_KEY. Tạo file .env với khóa API Gemini.",
    );
  }
  return key.trim();
}

function extractJson(text: string): unknown {
  const trimmed = text.trim();
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1].trim() : trimmed;
  return JSON.parse(raw);
}

function clampEra(n: unknown): number {
  const v = typeof n === "number" ? Math.round(n) : parseInt(String(n), 10);
  if (Number.isNaN(v) || v < 0 || v > 5) return 0;
  return v;
}

function clampPct(n: unknown, fallback = 100): number {
  const v = typeof n === "number" ? n : parseInt(String(n), 10);
  if (Number.isNaN(v)) return fallback;
  return Math.min(100, Math.max(0, Math.round(v)));
}

async function callGemini(
  systemInstruction: string,
  userPrompt: string,
): Promise<string> {
  const key = getApiKey();
  const url = `${API_BASE}/${GEMINI_MODEL}:generateContent?key=${key}`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: systemInstruction }] },
      contents: [{ role: "user", parts: [{ text: userPrompt }] }],
      generationConfig: {
        temperature: 0.7,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Gemini API lỗi (${res.status}): ${errBody.slice(0, 200)}`);
  }

  const data = (await res.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("Gemini không trả về nội dung.");
  return text;
}

function parseClassifyResult(raw: unknown): ClassifyResult {
  const o = raw as Record<string, unknown>;
  const primary_era = clampEra(o.primary_era);
  let primary_pct = clampPct(o.primary_pct, 100);
  let secondary_era =
    o.secondary_era === null || o.secondary_era === undefined
      ? null
      : clampEra(o.secondary_era);
  let secondary_pct =
    o.secondary_pct === null || o.secondary_pct === undefined
      ? null
      : clampPct(o.secondary_pct, 0);

  if (secondary_era !== null && secondary_era === primary_era) {
    secondary_era = null;
    secondary_pct = null;
  }

  if (secondary_era === null) {
    primary_pct = 100;
    secondary_pct = null;
  } else if (secondary_pct !== null) {
    const sum = primary_pct + secondary_pct;
    if (sum !== 100 && sum > 0) {
      primary_pct = Math.round((primary_pct / sum) * 100);
      secondary_pct = 100 - primary_pct;
    }
  }

  const legacyReasoning = String(o.reasoning ?? "").trim();
  const verdict_title = String(o.verdict_title ?? "").trim();
  const verdict_summary = String(o.verdict_summary ?? "").trim();
  const key_signals = Array.isArray(o.key_signals)
    ? o.key_signals.map(String).slice(0, 3)
    : [];

  return {
    primary_era,
    primary_pct,
    secondary_era,
    secondary_pct,
    verdict_title:
      verdict_title ||
      (primary_era >= 0 && primary_era <= 5
        ? `Thuộc ${ERAS[primary_era].label}`
        : "Kết quả phân loại"),
    verdict_summary:
      verdict_summary ||
      legacyReasoning.slice(0, 160) ||
      "Mô tả khớp đặc trưng cấu trúc của giai đoạn được chọn.",
    key_signals:
      key_signals.length > 0
        ? key_signals
        : legacyReasoning
          ? [legacyReasoning.slice(0, 120)]
          : [],
    indicators: Array.isArray(o.indicators)
      ? o.indicators.map(String).slice(0, 5)
      : [],
  };
}

function parseScenarioResult(
  raw: unknown,
  eraA: number,
  eraB: number,
): ScenarioResult {
  const o = raw as Record<string, unknown>;
  let pct_a = clampPct(o.pct_a, 60);
  let pct_b = clampPct(o.pct_b, 40);
  const sum = pct_a + pct_b;
  if (sum !== 100 && sum > 0) {
    pct_a = Math.round((pct_a / sum) * 100);
    pct_b = 100 - pct_a;
  }

  return {
    description: String(o.description ?? "").trim(),
    era_a: eraA,
    era_b: eraB,
    pct_a,
    pct_b,
    explanation: String(o.explanation ?? ""),
  };
}

export function useGeminiClassifier() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => setError(null), []);

  const classify = useCallback(async (userText: string): Promise<ClassifyResult> => {
    setLoading(true);
    setError(null);
    try {
      const text = await callGemini(
        SYSTEM_CONTEXT,
        `Phân loại mô tả sau. Trả JSON (NGẮN GỌN, không viết đoạn dài):
{
  "primary_era":0-5,
  "primary_pct":number,
  "secondary_era":0-5|null,
  "secondary_pct":number|null,
  "verdict_title":"tối đa 8 từ — tiêu đề kết luận",
  "verdict_summary":"ĐÚNG 1 câu ≤ 25 từ — kết luận chính",
  "key_signals":["tối đa 3 gạch đầu dòng, mỗi mục ≤ 12 từ"],
  "indicators":["tối đa 4 từ khóa ngắn"]
}

Mô tả:
"""
${userText.trim()}
"""`,
      );
      return parseClassifyResult(extractJson(text));
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Lỗi phân loại.";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  const generateScenario = useCallback(async (): Promise<ScenarioResult> => {
    setLoading(true);
    setError(null);
    try {
      const [eraA, eraB] = pickTwoRandomEraIndices();
      const eraAData = ERAS[eraA] as DemocracyEra;
      const eraBData = ERAS[eraB] as DemocracyEra;

      const text = await callGemini(
        SYSTEM_CONTEXT,
        `Tạo một mô tả xã hội/chế độ MƠ HỒ (2–4 câu tiếng Việt), trộn đặc trưng của HAI giai đoạn:
- Giai đoạn A [${eraA}]: ${eraAData.text} — ${eraAData.label}
- Giai đoạn B [${eraB}]: ${eraBData.text} — ${eraBData.label}

Không nêu tên giai đoạn trong mô tả. Chia tỷ lệ pct_a + pct_b = 100 (ví dụ 65/35, 70/30).
Trả JSON:
{"description":"...","pct_a":number,"pct_b":number,"explanation":"giải thích ngắn tại sao mơ hồ"}`,
      );

      const parsed = parseScenarioResult(extractJson(text), eraA, eraB);
      if (!parsed.description) {
        throw new Error("AI không tạo được mô tả.");
      }
      return parsed;
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Lỗi tạo thách thức.";
      setError(msg);
      throw e;
    } finally {
      setLoading(false);
    }
  }, []);

  return { classify, generateScenario, loading, error, clearError };
}
