<![CDATA[<div align="center">

# 🎨 Research Agent — Frontend

### Modern Next.js Research Report Interface

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)

A premium dark-themed UI with glassmorphism, SSE streaming, real-time agent pipeline visualization, and full Markdown report rendering.

</div>

---

## ✨ Features

- **Real-time Agent Pipeline** — Animated 4-step progress visualization with SSE streaming
- **Research Form** — Topic input with example suggestion chips
- **Report Viewer** — Full Markdown rendering with auto-generated Table of Contents
- **History Panel** — Slide-out drawer with localStorage persistence (up to 50 entries)
- **Copy & Download** — One-click copy to clipboard or download as `.md`
- **Dark Theme** — Premium glassmorphism design with gradient accents
- **Responsive** — Mobile-first layout

---

## 📁 Project Structure

```
frontend/
├── Dockerfile              # Multi-stage production build
├── package.json            # Dependencies & scripts
├── next.config.ts          # Next.js configuration
├── tsconfig.json           # TypeScript configuration
├── postcss.config.mjs      # PostCSS + Tailwind
│
├── public/                 # Static assets (SVGs, favicon)
│
└── src/
    ├── app/
    │   ├── layout.tsx      # Root layout + SEO metadata
    │   ├── page.tsx        # Main page (orchestrates all components)
    │   ├── globals.css     # Global styles + CSS custom properties
    │   └── page.module.css # Page-specific styles
    │
    ├── components/
    │   ├── Header.tsx      # App header with logo + history toggle
    │   ├── Footer.tsx      # Tech badges + attribution
    │   ├── ResearchForm.tsx # Topic input + example chips
    │   ├── AgentPipeline.tsx # Animated 4-step agent progress
    │   ├── ReportViewer.tsx  # Markdown report + ToC + toolbar
    │   └── HistoryPanel.tsx  # Slide-out history drawer
    │
    ├── hooks/
    │   └── useResearch.ts  # Core state machine (SSE, history, lifecycle)
    │
    └── lib/
        └── api.ts          # API client (SSE parser, sync fallback)
```

---

## 🧩 Key Components

| Component | Description |
|-----------|-------------|
| **Header** | Logo, AI-Powered badge, history toggle with count, GitHub link |
| **ResearchForm** | Search input with focus animations, 6 example topic chips, cancel support |
| **AgentPipeline** | 4-step horizontal pipeline: pending → active (spinner) → done (check) |
| **ReportViewer** | ReactMarkdown + remark-gfm, auto-ToC from headings, word count, copy/download |
| **HistoryPanel** | Slide-out drawer, relative timestamps, delete individual or clear all |
| **Footer** | Developer credit + LangGraph/FastAPI/Next.js/Groq tech badges |

---

## 🚀 Setup

### Prerequisites
- Node.js 18+
- Backend running on `http://localhost:8000`

### Development

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `NEXT_PUBLIC_API_URL` | `http://localhost:8001` | Backend API base URL |

Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 🐳 Docker

```bash
docker build -t research-agent-frontend .
docker run -d -p 3000:3000 research-agent-frontend
```

---

## 🔌 API Integration

The frontend connects to the backend via:

- **`POST /research/stream`** — SSE for real-time progress (primary)
- **`POST /research`** — Synchronous fallback
- **`GET /`** — Health check

The `useResearch` hook manages the full lifecycle:
1. Sends topic → starts SSE stream
2. Updates `currentStep` as each agent progresses
3. Receives final report → saves to localStorage history
4. Supports cancel, retry, and history reload

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` 16 | React framework |
| `react` 19 | UI library |
| `react-markdown` | Markdown rendering |
| `react-syntax-highlighter` | Code block highlighting |
| `remark-gfm` | GitHub-flavored Markdown |
| `tailwindcss` 4 | Utility-first CSS |
| `typescript` 5 | Type safety |

---

## 👨‍💻 Author

**Hasnain Yaqoob** — [hasnainyaqoob.site](https://hasnainyaqoob.site) · [GitHub](https://github.com/hasnainyaqub)
]]>
