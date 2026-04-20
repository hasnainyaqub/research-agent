"use client";

import React from "react";
import styles from "./AgentPipeline.module.css";
import { AgentStep } from "@/hooks/useResearch";

interface PipelineStep {
  key: AgentStep;
  label: string;
  icon: string;
  description: string;
}

const STEPS: PipelineStep[] = [
  { key: "research", label: "Research", icon: "🔍", description: "Searching the internet" },
  { key: "analysis", label: "Analysis", icon: "📊", description: "Analyzing findings" },
  { key: "writing", label: "Writing", icon: "✍️", description: "Generating report" },
  { key: "review", label: "Review", icon: "🔎", description: "Polishing output" },
];

const STEP_ORDER: AgentStep[] = ["research", "analysis", "writing", "review", "complete"];

function getStepStatus(stepKey: AgentStep, currentStep: AgentStep): "pending" | "active" | "done" {
  const currentIdx = STEP_ORDER.indexOf(currentStep);
  const stepIdx = STEP_ORDER.indexOf(stepKey);

  if (currentStep === "idle" || currentStep === "error") return "pending";
  if (currentStep === "complete") return "done";
  if (stepIdx < currentIdx) return "done";
  if (stepIdx === currentIdx) return "active";
  return "pending";
}

interface AgentPipelineProps {
  currentStep: AgentStep;
}

export default function AgentPipeline({ currentStep }: AgentPipelineProps) {
  if (currentStep === "idle") return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.pipeline}>
        {STEPS.map((step, idx) => {
          const status = getStepStatus(step.key, currentStep);
          return (
            <React.Fragment key={step.key}>
              {/* Connector line */}
              {idx > 0 && (
                <div className={`${styles.connector} ${status === "done" || status === "active" ? styles.connectorActive : ""}`}>
                  <div className={styles.connectorLine} />
                </div>
              )}

              {/* Step node */}
              <div className={`${styles.step} ${styles[status]}`}>
                <div className={styles.stepCircle}>
                  {status === "done" ? (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : status === "active" ? (
                    <div className={styles.spinner} />
                  ) : (
                    <span className={styles.stepIcon}>{step.icon}</span>
                  )}
                </div>
                <div className={styles.stepInfo}>
                  <span className={styles.stepLabel}>{step.label}</span>
                  {status === "active" && (
                    <span className={styles.stepDesc}>
                      {step.description}
                      <span className={styles.dots}>
                        <span>.</span><span>.</span><span>.</span>
                      </span>
                    </span>
                  )}
                  {status === "done" && (
                    <span className={styles.stepDone}>Complete</span>
                  )}
                </div>
              </div>
            </React.Fragment>
          );
        })}
      </div>

      {/* Error state */}
      {currentStep === "error" && (
        <div className={styles.errorBanner}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
          <span>An error occurred during processing</span>
        </div>
      )}

      {/* Complete state */}
      {currentStep === "complete" && (
        <div className={styles.completeBanner}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
          </svg>
          <span>Research report generated successfully!</span>
        </div>
      )}
    </div>
  );
}
