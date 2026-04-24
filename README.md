<![CDATA[<div align="center">

# 🔬 Autonomous Research Agent

### AI-Powered Multi-Agent Research Report Generator

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-Agent_Framework-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain-ai.github.io/langgraph/)
[![Docker](https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](./backend/LICENSE.txt)

Generate comprehensive, publication-ready **3,000–5,000 word** research reports on **any topic** in minutes.  
Four specialized AI agents collaborate in a LangGraph pipeline — searching, analyzing, writing, and reviewing.

[**Live Demo**](#) · [**Backend Docs**](./backend/Readme.md) · [**Frontend Docs**](./frontend/README.md) · [**Portfolio**](https://hasnainyaqoob.site)

---

</div>

## 📖 Table of Contents

- [Overview](#-overview)
- [Architecture](#-architecture)
- [Agent Pipeline](#-agent-pipeline)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Getting Started](#-getting-started)
  - [Environment Variables](#1-environment-variables)
  - [Run with Docker (Recommended)](#2-run-with-docker-recommended)
  - [Run Locally (Without Docker)](#3-run-locally-without-docker)
- [API Reference](#-api-reference)
- [Screenshots](#-screenshots)
- [Configuration](#-configuration)
- [Contributing](#-contributing)
- [License](#-license)
- [Author](#-author)

---

## 🧠 Overview

**Research Agent** is a full-stack autonomous research system that leverages **multi-agent AI architecture** to generate in-depth, structured research reports. Enter any topic, and the system will:

1. **Search** the internet for the latest information using Tavily
2. **Analyze** the gathered data to extract structured insights
3. **Write** a comprehensive 5,000-word research report
4. **Review** and polish the final output for clarity, grammar, and structure

The entire pipeline runs as a **LangGraph state machine**, with real-time **Server-Sent Events (SSE)** streaming progress updates to a premium **Next.js** frontend.

---

## 🏗 Architecture

```
┌──────────────────────────────────────────────────────────┐
│                      FRONTEND                            │
│              Next.js 16 + React 19                       │
│     ┌─────────────────────────────────────────────┐      │
│     │  Research Form → Agent Pipeline → Report    │      │
│     │  History Panel │ ToC │ Copy/Download         │      │
│     └─────────────────┬───────────────────────────┘      │
│                       │ SSE Stream (POST)                │
│                       ▼                                  │
├──────────────────────────────────────────────────────────┤
│                      BACKEND                             │
│                FastAPI + Uvicorn                          │
│     ┌─────────────────────────────────────────────┐      │
│     │             LangGraph Pipeline              │      │
│     │                                             │      │
│     │  ┌──────────┐   ┌──────────┐   ┌─────────┐ │      │
│     │  │ Research  │──▶│ Analyst  │──▶│  Writer │ │      │
│     │  │  Agent    │   │  Agent   │   │  Agent  │ │      │
│     │  └──────────┘   └──────────┘   └────┬────┘ │      │
│     │                                     │      │      │
│     │                              ┌──────▼────┐ │      │
│     │                              │ Reviewer  │ │      │
│     │                              │   Agent   │ │      │
│     │                              └───────────┘ │      │
│     └─────────────────────────────────────────────┘      │
│                       │                                  │
│              ┌────────┴────────┐                         │
│              ▼                 ▼                         │
│     ┌──────────────┐  ┌──────────────┐                   │
│     │  Groq LLMs   │  │ Tavily Search│                   │
│     │ (Llama 3.3)  │  │   (Web API)  │                   │
│     └──────────────┘  └──────────────┘                   │
└──────────────────────────────────────────────────────────┘
```

---

## 🤖 Agent Pipeline

| Step | Agent | Model | Purpose |
|------|-------|-------|---------|
| 1️⃣ | **Research Agent** | `llama-3.3-70b-versatile` | Searches the web via Tavily and collects relevant information |
| 2️⃣ | **Analyst Agent** | `openai/gpt-oss-120b` | Analyzes raw research data into structured insights |
| 3️⃣ | **Writer Agent** | `llama-3.3-70b-versatile` | Composes a full 5,000-word report with sections, intro, and conclusion |
| 4️⃣ | **Reviewer Agent** | `openai/gpt-oss-120b` | Polishes clarity, grammar, and structural coherence |

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|-----------|---------|
| **Python 3.11+** | Runtime |
| **FastAPI** | REST API & SSE streaming |
| **LangGraph** | Multi-agent orchestration (state machine) |
| **LangChain + Groq** | LLM integration (Llama 3.3, GPT-OSS) |
| **Tavily** | Real-time internet search |
| **Uvicorn** | ASGI server |
| **Pydantic** | Data validation |

### Frontend
| Technology | Purpose |
|-----------|---------|
| **Next.js 16** | React framework (App Router) |
| **React 19** | UI library |
| **TypeScript** | Type safety |
| **Tailwind CSS 4** | Styling |
| **React Markdown** | Report rendering |
| **remark-gfm** | GitHub-flavored Markdown support |

### Infrastructure
| Technology | Purpose |
|-----------|---------|
| **Docker** | Containerization |
| **Docker Compose** | Multi-service orchestration |
| **Multi-stage builds** | Optimized image sizes |
| **Non-root containers** | Security best practices |

---

## 📁 Project Structure

```
Research_Agent/
├── docker-compose.yml          # Full-stack orchestration
├── .env                        # Shared environment variables (git-ignored)
├── .dockerignore               # Docker build exclusions
├── README.md                   # ← You are here
│
├── backend/
│   ├── Dockerfile              # Multi-stage Python build
│   ├── requirements.txt        # Python dependencies
│   ├── LICENSE.txt             # MIT License
│   ├── Readme.md               # Backend documentation
│   │
│   ├── api/
│   │   └── main.py             # FastAPI app, routes, SSE streaming
│   │
│   ├── agents/
│   │   ├── research_agent.py   # Web search + data collection
│   │   ├── analyst_agent.py    # Data analysis + insights
│   │   ├── writer_agent.py     # Report composition
│   │   └── reviewer_agent.py   # Quality review + polish
│   │
│   ├── graph/
│   │   └── research_graph.py   # LangGraph state machine definition
│   │
│   ├── schemas/
│   │   └── state.py            # TypedDict state schema
│   │
│   ├── config/
│   │   └── settings.py         # Environment configuration
│   │
│   └── tools/
│       └── search_tool.py      # Tavily web search integration
│
└── frontend/
    ├── Dockerfile              # Multi-stage Node.js build
    ├── package.json            # Node.js dependencies
    ├── next.config.ts          # Next.js configuration
    ├── tsconfig.json           # TypeScript configuration
    ├── README.md               # Frontend documentation
    │
    ├── public/                 # Static assets
    │
    └── src/
        ├── app/
        │   ├── layout.tsx      # Root layout + metadata
        │   ├── page.tsx        # Main research page
        │   ├── globals.css     # Global styles
        │   └── page.module.css # Page-specific styles
        │
        ├── components/
        │   ├── Header.tsx      # App header + navigation
        │   ├── Footer.tsx      # Footer with tech badges
        │   ├── ResearchForm.tsx # Topic input + example chips
        │   ├── AgentPipeline.tsx# Animated 4-step progress
        │   ├── ReportViewer.tsx # Markdown report + ToC
        │   └── HistoryPanel.tsx # Slide-out history drawer
        │
        ├── hooks/
        │   └── useResearch.ts  # Research state machine hook
        │
        └── lib/
            └── api.ts          # API client + SSE parser
```

---

## ✅ Prerequisites

- **Docker** & **Docker Compose** (recommended)
- OR for local development:
  - **Python 3.11+**
  - **Node.js 18+** & **npm**
- **API Keys:**
  - [Groq API Key](https://console.groq.com/) — LLM inference
  - [Tavily API Key](https://tavily.com/) — Web search

---

## 🚀 Getting Started

### 1. Environment Variables

Create a `.env` file in the **project root**:

```env
GROQ_API_KEY=gsk_your_groq_api_key_here
TAVILY_API_KEY=tvly-your_tavily_api_key_here
```

### 2. Run with Docker (Recommended)

```bash
# Clone the repository
git clone https://github.com/hasnainyaqub/research-agent.git
cd research-agent

# Start both services
docker compose up --build

# Or run in detached mode
docker compose up --build -d
```

| Service | URL |
|---------|-----|
| **Frontend** | [http://localhost:3000](http://localhost:3000) |
| **Backend API** | [http://localhost:8000](http://localhost:8000) |

```bash
# View logs
docker compose logs -f

# Stop services
docker compose down

# Rebuild after code changes
docker compose up --build
```

### 3. Run Locally (Without Docker)

#### Backend

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📡 API Reference

### `GET /`

Health check endpoint.

**Response:**
```json
{
  "message": "Autonomous Research Agent"
}
```

### `POST /research`

Synchronous research endpoint — waits for the full pipeline to complete.

**Request:**
```json
{
  "topic": "Future of AI Agents"
}
```

**Response:**
```json
{
  "status": "success",
  "topic": "Future of AI Agents",
  "report": "# Full Research Report\n\n..."
}
```

### `POST /research/stream`

Server-Sent Events endpoint — streams real-time progress through each agent step.

**Request:**
```json
{
  "topic": "Quantum Computing Breakthroughs"
}
```

**SSE Events:**
```
data: {"step": "research", "status": "running"}
data: {"step": "research", "status": "done"}
data: {"step": "analysis", "status": "running"}
data: {"step": "analysis", "status": "done"}
data: {"step": "writing", "status": "running"}
data: {"step": "writing", "status": "done"}
data: {"step": "review", "status": "running"}
data: {"step": "review", "status": "done"}
data: {"step": "complete", "status": "done", "report": "# Report..."}
```

---

## ⚙️ Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ | Groq API key for LLM inference |
| `TAVILY_API_KEY` | ✅ | Tavily API key for web search |
| `NEXT_PUBLIC_API_URL` | ❌ | Backend API URL (default: `http://localhost:8000`) |

### Model Configuration

Models are configured per-agent in `backend/agents/`:

| Agent | File | Default Model |
|-------|------|---------------|
| Research | `research_agent.py` | `llama-3.3-70b-versatile` |
| Analyst | `analyst_agent.py` | `openai/gpt-oss-120b` |
| Writer | `writer_agent.py` | `llama-3.3-70b-versatile` |
| Reviewer | `reviewer_agent.py` | `openai/gpt-oss-120b` |

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](./backend/LICENSE.txt) file for details.

---

## 👨‍💻 Author

<div align="center">

**Hasnain Yaqoob**

[![Portfolio](https://img.shields.io/badge/Portfolio-hasnainyaqoob.site-7c3aed?style=for-the-badge&logo=google-chrome&logoColor=white)](https://hasnainyaqoob.site)
[![GitHub](https://img.shields.io/badge/GitHub-hasnainyaqub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/hasnainyaqub)

</div>

---

<div align="center">

⭐ **Star this repository if you find it useful!** ⭐

</div>
]]>
