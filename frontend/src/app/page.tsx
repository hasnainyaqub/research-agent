"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ResearchForm from "@/components/ResearchForm";
import AgentPipeline from "@/components/AgentPipeline";
import ReportViewer from "@/components/ReportViewer";
import HistoryPanel from "@/components/HistoryPanel";
import { useResearch } from "@/hooks/useResearch";
import styles from "./page.module.css";

export default function HomePage() {
  const [historyOpen, setHistoryOpen] = useState(false);

  const {
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
  } = useResearch();

  const showHero = currentStep === "idle" && !report;

  return (
    <div className={styles.page}>
      <Header
        onHistoryToggle={() => setHistoryOpen((v) => !v)}
        historyCount={history.length}
      />

      <main className={styles.main}>
        {/* Hero Section */}
        {showHero && (
          <section className={styles.hero}>
            <div className={styles.heroGlow} />
            <div className={styles.heroContent}>
              <div className={styles.heroBadge}>
                <span className={styles.heroBadgeDot} />
                Multi-Agent AI Research System
              </div>
              <h1 className={styles.heroTitle}>
                Research any topic with{" "}
                <span className={styles.heroAccent}>AI agents</span>
              </h1>
              <p className={styles.heroSubtitle}>
                Generate comprehensive, publication-ready research reports in minutes.
                Four specialized AI agents work together to search, analyze, write,
                and review — delivering 3,000–5,000 word reports on any subject.
              </p>
            </div>
          </section>
        )}

        {/* Research Form */}
        <section className={styles.formSection}>
          <ResearchForm
            topic={topic}
            onTopicChange={setTopic}
            onSubmit={startResearch}
            isLoading={isLoading}
            onCancel={cancelResearch}
          />
        </section>

        {/* Agent Pipeline */}
        {currentStep !== "idle" && (
          <section className={styles.pipelineSection}>
            <AgentPipeline currentStep={currentStep} />
          </section>
        )}

        {/* Error Display */}
        {error && currentStep === "error" && (
          <section className={styles.errorSection}>
            <div className={styles.errorCard}>
              <div className={styles.errorIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </div>
              <div className={styles.errorText}>
                <h3>Something went wrong</h3>
                <p>{error}</p>
              </div>
              <button className={styles.retryBtn} onClick={startResearch}>
                Try Again
              </button>
            </div>
          </section>
        )}

        {/* Report Viewer */}
        {report && (
          <section className={styles.reportSection}>
            <ReportViewer
              report={report}
              topic={topic}
              onNewResearch={clearReport}
            />
          </section>
        )}
      </main>

      <Footer />

      {/* History Panel */}
      <HistoryPanel
        isOpen={historyOpen}
        onClose={() => setHistoryOpen(false)}
        history={history}
        onLoad={loadFromHistory}
        onDelete={deleteFromHistory}
        onClearAll={clearHistory}
      />
    </div>
  );
}
