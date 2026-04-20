"use client";

import React from "react";
import styles from "./Header.module.css";

interface HeaderProps {
  onHistoryToggle: () => void;
  historyCount: number;
}

export default function Header({ onHistoryToggle, historyCount }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <div className={styles.logo}>
          <div className={styles.logoIcon}>
            <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
              <defs>
                <linearGradient id="logoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#7c3aed" />
                  <stop offset="100%" stopColor="#06b6d4" />
                </linearGradient>
              </defs>
              <circle cx="14" cy="14" r="12" stroke="url(#logoGrad)" strokeWidth="2" fill="none" />
              <path
                d="M10 10 L14 7 L18 10 L18 16 L14 19 L10 16Z"
                fill="url(#logoGrad)"
                opacity="0.8"
              />
              <circle cx="14" cy="13" r="2.5" fill="#fff" opacity="0.9" />
            </svg>
          </div>
          <div className={styles.logoText}>
            <span className={styles.logoTitle}>Research Agent</span>
            <span className={styles.logoBadge}>AI-Powered</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className={styles.nav}>
          <button className={styles.navButton} onClick={onHistoryToggle}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>History</span>
            {historyCount > 0 && (
              <span className={styles.badge}>{historyCount}</span>
            )}
          </button>
          <a
            href="https://github.com/hasnainyaqub/research-agent"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.navLink}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
        </nav>
      </div>
    </header>
  );
}
