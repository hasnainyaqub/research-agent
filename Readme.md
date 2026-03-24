# 🤖 Autonomous Research Agent

> A production-level autonomous research system built with **LangGraph**, **FastAPI**, and **LLMs** — automatically researches a topic, analyzes sources, writes a long-form report, and reviews the output.

---

## ✨ Features

- 🧠 **Multi-Agent Architecture** powered by LangGraph
- 🌐 **Internet Search Integration** via Tavily API
- 📝 **Long-Form Research Reports** (3,000 – 5,000 words)
- 💾 **Memory Support** across agent steps
- ⚡ **FastAPI Backend** for clean REST endpoints
- 🏗️ **Modular & Scalable Architecture**
- 🔒 **Environment Variable Configuration**
- 🛡️ **Production-Ready Error Handling**

---

## 🏛️ Architecture

```
User
 ↓
Research Agent     →  Searches the internet & collects sources
 ↓
Analyst Agent      →  Analyzes data & creates structured insights
 ↓
Writer Agent       →  Writes a full 3,000–5,000 word report
 ↓
Reviewer Agent     →  Improves clarity, grammar & structure
 ↓
Final Research Report
```

---

## 🤖 Agents

### 1. 🔍 Research Agent
- Searches the internet for relevant information
- Collects and filters high-quality sources
- Extracts key information for downstream agents

### 2. 📊 Analyst Agent
- Analyzes collected research data
- Identifies patterns and key insights
- Creates structured summaries for the writer

### 3. ✍️ Writer Agent
- Writes a full long-form research report
- Targets 3,000 – 5,000 words
- Produces a structured, readable format

### 4. 🔎 Reviewer Agent
- Improves clarity and readability
- Fixes grammar and style issues
- Enhances overall structure and flow

---

## 📁 Project Structure

```
research-agent/
│
├── agents/
│   ├── research_agent.py       # Internet search & source collection
│   ├── analyst_agent.py        # Data analysis & insight extraction
│   ├── writer_agent.py         # Long-form report generation
│   └── reviewer_agent.py       # Quality review & improvements
│
├── graph/
│   └── research_graph.py       # LangGraph workflow definition
│
├── tools/
│   └── search_tool.py          # Tavily search integration
│
├── api/
│   └── main.py                 # FastAPI application & routes
│
├── config/
│   └── settings.py             # App configuration & constants
│
├── schemas/
│   └── state.py                # LangGraph state schema
│
├── requirements.txt
├── .env
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **LangGraph** | Multi-agent workflow orchestration |
| **FastAPI** | REST API backend |
| **LangChain** | LLM integrations & tooling |
| **Groq / OpenAI** | LLM inference |
| **Tavily Search API** | Internet search |
| **Python** | Core language |

---

## 🚀 Installation

**1. Clone the repository**

```bash
git clone https://github.com/hasnainyaqub/research-agent.git
cd research-agent
```

**2. Install dependencies**

```bash
pip install -r requirements.txt
```

**3. Configure environment variables**

Create a `.env` file in the root directory:

```env
GROQ_API_KEY=your_groq_api_key
TAVILY_API_KEY=your_tavily_api_key
```

**4. Start the server**

```bash
uvicorn api.main:app --reload
```

The server will be available at:

```
http://localhost:8000
```

---

## 📡 API Endpoints

### `GET /` — Health Check

```bash
curl http://localhost:8000/
```

**Response:**

```json
{
  "message": "Autonomous Research Agent"
}
```

---

### `POST /research` — Generate Research Report

```bash
curl -X POST http://localhost:8000/research \
  -H "Content-Type: application/json" \
  -d '{"topic": "Future of AI Agents"}'
```

**Request Body:**

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
  "report": "Generated Research Report..."
}
```

---

## ⚙️ How It Works

```
Step 1  →  User sends a research topic via POST /research
Step 2  →  Research Agent searches the internet for relevant sources
Step 3  →  Analyst Agent analyzes and structures the findings
Step 4  →  Writer Agent generates a 3,000–5,000 word report
Step 5  →  Reviewer Agent improves clarity, grammar, and structure
Step 6  →  Final polished research report is returned
```

---

## 🧪 Example Topics

```
Future of AI Agents
LLM Applications in Healthcare
Agentic AI Systems
Multi-Agent Systems
AI in Education
```

---

## 🔮 Future Improvements

- [ ] Vector Database integration
- [ ] RAG-based memory
- [ ] Streaming responses
- [ ] Async agent execution
- [ ] UI Dashboard
- [ ] PDF Export
- [ ] Database storage for past reports

---

## 💼 Use Cases

- 🔬 Research automation
- 📣 Content generation
- 📈 Market research
- 🎓 Academic research
- 🤖 AI-powered assistants
- 🧠 Knowledge automation

---

## 🤝 Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you'd like to change.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 👤 Author

**Hasnain Yaqub**  
*AI Engineer | LangGraph | Agentic AI | LLM Applications*