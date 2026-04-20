import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Research Agent — AI-Powered Research Reports",
  description:
    "Generate comprehensive 3,000–5,000 word research reports on any topic using a multi-agent AI pipeline. Powered by LangGraph, FastAPI, and Groq.",
  keywords: ["AI", "research", "agent", "LangGraph", "report generator", "autonomous"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
