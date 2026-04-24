<![CDATA[<div align="center">

# 🔬 Research Agent — Backend

### FastAPI + LangGraph Multi-Agent Research Pipeline

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![LangGraph](https://img.shields.io/badge/LangGraph-1C3C3C?style=for-the-badge&logo=langchain&logoColor=white)](https://langchain-ai.github.io/langgraph/)

</div>

---

## 📖 Table of Contents

- [Architecture](#-architecture)
- [Agent Pipeline](#-agent-pipeline)
- [Project Structure](#-project-structure)
- [Setup](#-setup)
- [Docker Deployment](#-docker-deployment)
- [API Reference](#-api-reference)
- [State Schema](#-state-schema)
- [Configuration](#-configuration)
- [Author](#-author)

---

## 🏗 Architecture

The backend is a **LangGraph StateGraph** orchestrating four agents in a linear pipeline. Each agent receives shared state, performs its task, and passes results downstream. The FastAPI layer exposes both synchronous and SSE-streaming endpoints.

```
FastAPI Server (api/main.py)
    │
    ▼
LangGraph StateGraph (graph/research_graph.py)
    │
    ├──▶ Research Agent ──▶ Analyst Agent ──▶ Writer Agent ──▶ Reviewer Agent ──▶ END
    │     (Tavily Search)    (Groq LLM)       (Groq LLM)       (Groq LLM)
```

---

## 🤖 Agent Pipeline

| Step | Agent | Model | Temperature | Purpose |
|------|-------|-------|-------------|---------|
| 1 | **Research** | `llama-3.3-70b-versatile` | 0.3 | Web search via Tavily, data collection |
| 2 | **Analyst** | `openai/gpt-oss-120b` | 0.2 | Structured insights from raw data |
| 3 | **Writer** | `llama-3.3-70b-versatile` | 0.5 | 5,000-word report with sections |
| 4 | **Reviewer** | `openai/gpt-oss-120b` | 0.2 | Polish clarity, grammar, structure |

---

## 📁 Project Structure

```
backend/
├── Dockerfile              # Multi-stage production build
├── docker-compose.yml      # Standalone orchestration
├── requirements.txt        # Python dependencies
├── LICENSE.txt             # MIT License
│
├── api/
│   └── main.py             # FastAPI app, CORS, routes, SSE
│
├── agents/
│   ├── research_agent.py   # Step 1: Web search + collection
│   ├── analyst_agent.py    # Step 2: Analysis + structuring
│   ├── writer_agent.py     # Step 3: Report composition
│   └── reviewer_agent.py   # Step 4: Quality review
│
├── graph/
│   └── research_graph.py   # LangGraph StateGraph definition
│
├── schemas/
│   └── state.py            # ResearchState TypedDict
│
├── config/
│   └── settings.py         # Environment variable loading
│
└── tools/
    └── search_tool.py      # Tavily search wrapper
```

---

## 🚀 Setup

```bash
cd backend

# Create virtual environment
python -m venv .venv
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Create .env
echo "GROQ_API_KEY=gsk_your_key" > .env
echo "TAVILY_API_KEY=tvly-your_key" >> .env

# Start server
uvicorn api.main:app --host 0.0.0.0 --port 8000 --reload
```

---

## 🐳 Docker Deployment

```bash
# Build
docker build -t research-agent-backend .

# Run
docker run -d -p 8000:8000 --env-file .env research-agent-backend
```

**Image details:** Multi-stage build, non-root user, health checks, ~250MB.

---

## 📡 API Reference

### `GET /` — Health Check

```json
{ "message": "Autonomous Research Agent" }
```

### `POST /research` — Synchronous

```json
// Request
{ "topic": "Future of AI Agents" }

// Response
{ "status": "success", "topic": "...", "report": "# Full Report..." }
```

### `POST /research/stream` — SSE Streaming

Streams progress events through each agent step:

```
data: {"step": "research", "status": "running"}
data: {"step": "research", "status": "done"}
data: {"step": "analysis", "status": "running"}
...
data: {"step": "complete", "status": "done", "report": "..."}
```

---

## 📋 State Schema

```python
class ResearchState(TypedDict):
    topic: str            # Research topic
    research_data: str    # Raw web search data
    analysis: str         # Structured insights
    report: str           # Draft report
    final_report: str     # Polished report
    messages: List[str]   # Agent messages
```

---

## ⚙️ Configuration

| Variable | Required | Description |
|----------|----------|-------------|
| `GROQ_API_KEY` | ✅ | Groq API key for LLM inference |
| `TAVILY_API_KEY` | ✅ | Tavily API key for web search |

---

## 👨‍💻 Author

**Hasnain Yaqoob** — [hasnainyaqoob.site](https://hasnainyaqoob.site) · [GitHub](https://github.com/hasnainyaqub)
]]>