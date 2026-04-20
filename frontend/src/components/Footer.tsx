"use client";

import React from "react";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.credit}>
            Built by <a href="https://github.com/hasnainyaqub" target="_blank" rel="noopener noreferrer">Hasnain Yaqub</a>
          </span>
        </div>
        <div className={styles.right}>
          <span className={styles.badge}>LangGraph</span>
          <span className={styles.badge}>FastAPI</span>
          <span className={styles.badge}>Next.js</span>
          <span className={styles.badge}>Groq</span>
        </div>
      </div>
    </footer>
  );
}
