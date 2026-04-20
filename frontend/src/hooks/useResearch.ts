"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { startResearchStream, ResearchEvent } from "@/lib/api";

/* ---------- Types ---------- */
export type AgentStep = "idle" | "research" | "analysis" | "writing" | "review" | "complete" | "error";

export interface HistoryEntry {
  id: string;
  topic: string;
  report: string;
  timestamp: number;
  wordCount: number;
}

export interface UseResearchReturn {
  /* State */
  topic: string;
  setTopic: (t: string) => void;
  currentStep: AgentStep;
  report: string;
  error: string | null;
  isLoading: boolean;

  /* Actions */
  startResearch: () => void;
  cancelResearch: () => void;
  clearReport: () => void;

  /* History */
  history: HistoryEntry[];
  loadFromHistory: (entry: HistoryEntry) => void;
  deleteFromHistory: (id: string) => void;
  clearHistory: () => void;
}

/* ---------- Helpers ---------- */
const HISTORY_KEY = "research-agent-history";

function loadHistory(): HistoryEntry[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(HISTORY_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveHistory(entries: HistoryEntry[]) {
  localStorage.setItem(HISTORY_KEY, JSON.stringify(entries));
}

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/* ---------- Hook ---------- */
export function useResearch(): UseResearchReturn {
  const [topic, setTopic] = useState("");
  const [currentStep, setCurrentStep] = useState<AgentStep>("idle");
  const [report, setReport] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const abortRef = useRef<AbortController | null>(null);

  // Load history on mount
  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const isLoading = !["idle", "complete", "error"].includes(currentStep);

  const handleEvent = useCallback((event: ResearchEvent) => {
    if (event.status === "running") {
      setCurrentStep(event.step as AgentStep);
    } else if (event.step === "complete" && event.report) {
      setReport(event.report);
      setCurrentStep("complete");
    } else if (event.step === "error") {
      setError(event.message || "Unknown error");
      setCurrentStep("error");
    }
  }, []);

  const startResearch = useCallback(() => {
    if (!topic.trim()) return;

    // Reset state
    setReport("");
    setError(null);
    setCurrentStep("research");

    const controller = startResearchStream(
      topic.trim(),
      handleEvent,
      (errMsg) => {
        setError(errMsg);
        setCurrentStep("error");
      },
      () => {
        // Stream done — save to history if we have a report
        setCurrentStep((prev) => {
          // Only remain "complete" if we already set it via event
          return prev === "complete" ? prev : prev;
        });
      }
    );

    abortRef.current = controller;
  }, [topic, handleEvent]);

  // Save to history when report is ready
  useEffect(() => {
    if (currentStep === "complete" && report) {
      const entry: HistoryEntry = {
        id: Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        topic: topic.trim(),
        report,
        timestamp: Date.now(),
        wordCount: countWords(report),
      };
      setHistory((prev) => {
        const updated = [entry, ...prev].slice(0, 50); // keep last 50
        saveHistory(updated);
        return updated;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep, report]);

  const cancelResearch = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setCurrentStep("idle");
    setError(null);
  }, []);

  const clearReport = useCallback(() => {
    setReport("");
    setCurrentStep("idle");
    setError(null);
  }, []);

  const loadFromHistory = useCallback((entry: HistoryEntry) => {
    setTopic(entry.topic);
    setReport(entry.report);
    setCurrentStep("complete");
    setError(null);
  }, []);

  const deleteFromHistory = useCallback((id: string) => {
    setHistory((prev) => {
      const updated = prev.filter((e) => e.id !== id);
      saveHistory(updated);
      return updated;
    });
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  return {
    topic,
    setTopic,
    currentStep,
    report,
    error,
    isLoading,
    startResearch,
    cancelResearch,
    clearReport,
    history,
    loadFromHistory,
    deleteFromHistory,
    clearHistory,
  };
}
