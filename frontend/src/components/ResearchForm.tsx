"use client";

import React, { useState } from "react";
import styles from "./ResearchForm.module.css";

const EXAMPLE_TOPICS = [
  "Future of AI Agents",
  "LLM Applications in Healthcare",
  "Quantum Computing Breakthroughs 2026",
  "Multi-Agent Systems Architecture",
  "AI in Climate Change Solutions",
  "Autonomous Vehicles Technology",
];

interface ResearchFormProps {
  topic: string;
  onTopicChange: (t: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
  onCancel: () => void;
}

export default function ResearchForm({
  topic,
  onTopicChange,
  onSubmit,
  isLoading,
  onCancel,
}: ResearchFormProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && topic.trim()) {
      onSubmit();
    }
  };

  return (
    <div className={styles.wrapper}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={`${styles.inputWrapper} ${isFocused ? styles.focused : ""}`}>
          <div className={styles.inputIcon}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter a research topic..."
            value={topic}
            onChange={(e) => onTopicChange(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            disabled={isLoading}
            autoComplete="off"
            id="research-topic-input"
          />
          {topic && !isLoading && (
            <button
              type="button"
              className={styles.clearBtn}
              onClick={() => onTopicChange("")}
              aria-label="Clear topic"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.actions}>
          {isLoading ? (
            <button
              type="button"
              className={`${styles.submitBtn} ${styles.cancelBtn}`}
              onClick={onCancel}
              id="cancel-research-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
              Cancel
            </button>
          ) : (
            <button
              type="submit"
              className={styles.submitBtn}
              disabled={!topic.trim()}
              id="start-research-btn"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
              </svg>
              Generate Report
            </button>
          )}
        </div>
      </form>

      {/* Example Topics */}
      {!isLoading && (
        <div className={styles.examples}>
          <span className={styles.examplesLabel}>Try:</span>
          <div className={styles.chips}>
            {EXAMPLE_TOPICS.map((ex) => (
              <button
                key={ex}
                type="button"
                className={styles.chip}
                onClick={() => onTopicChange(ex)}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
