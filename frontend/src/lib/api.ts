const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

/* ---------- Types ---------- */
export interface ResearchEvent {
  step: "research" | "analysis" | "writing" | "review" | "complete" | "error";
  status: "running" | "done" | "error";
  report?: string;
  message?: string;
}

export interface ResearchResult {
  status: "success" | "error";
  topic: string;
  report?: string;
  message?: string;
}

/* ---------- Health Check ---------- */
export async function getHealth(): Promise<boolean> {
  try {
    const res = await fetch(`${API_BASE}/`);
    return res.ok;
  } catch {
    return false;
  }
}

/* ---------- SSE Streaming Research ---------- */
export function startResearchStream(
  topic: string,
  onEvent: (event: ResearchEvent) => void,
  onError: (error: string) => void,
  onDone: () => void
): AbortController {
  const controller = new AbortController();

  (async () => {
    try {
      const res = await fetch(`${API_BASE}/research/stream`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
        signal: controller.signal,
      });

      if (!res.ok) {
        onError(`Server responded with ${res.status}`);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        onError("No response body");
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (trimmed.startsWith("data: ")) {
            try {
              const data: ResearchEvent = JSON.parse(trimmed.slice(6));
              onEvent(data);

              if (data.step === "error") {
                onError(data.message || "Unknown error");
                return;
              }
            } catch {
              // skip malformed SSE lines
            }
          }
        }
      }

      onDone();
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") return;
      onError(err instanceof Error ? err.message : "Connection failed");
    }
  })();

  return controller;
}

/* ---------- Synchronous Research (fallback) ---------- */
export async function startResearch(topic: string): Promise<ResearchResult> {
  const res = await fetch(`${API_BASE}/research`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    throw new Error(`Server responded with ${res.status}`);
  }

  return res.json();
}
