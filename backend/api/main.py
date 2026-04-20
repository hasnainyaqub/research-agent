from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from pydantic import BaseModel
from graph.research_graph import create_graph
import json
import time

app = FastAPI()

# CORS — allow Next.js dev server and production origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

graph = create_graph()

class ResearchRequest(BaseModel):
    topic: str


@app.get("/")
def home():
    return {
        "message": "Autonomous Research Agent"
    }


@app.post("/research")
def research(request: ResearchRequest):

    try:

        result = graph.invoke({
            "topic": request.topic,
            "research_data": "",
            "analysis": "",
            "report": "",
            "final_report": "",
            "messages": []
        })

        return {
            "status": "success",
            "topic": request.topic,
            "report": result["final_report"]
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }


def _sse_event(data: dict) -> str:
    """Format a dict as an SSE event string."""
    return f"data: {json.dumps(data)}\n\n"


@app.post("/research/stream")
def research_stream(request: ResearchRequest):
    """
    Server-Sent Events endpoint that streams progress through each agent step.
    Events emitted:
      - { step: "research",  status: "running" | "done" }
      - { step: "analysis",  status: "running" | "done" }
      - { step: "writing",   status: "running" | "done" }
      - { step: "review",    status: "running" | "done" }
      - { step: "complete",  status: "done", report: "..." }
      - { step: "error",     status: "error", message: "..." }
    """

    def event_generator():
        try:
            state = {
                "topic": request.topic,
                "research_data": "",
                "analysis": "",
                "report": "",
                "final_report": "",
                "messages": []
            }

            # Step 1 — Research Agent
            yield _sse_event({"step": "research", "status": "running"})
            from agents.research_agent import research_agent
            updates = research_agent(state)
            state.update(updates)
            yield _sse_event({"step": "research", "status": "done"})

            # Step 2 — Analyst Agent
            yield _sse_event({"step": "analysis", "status": "running"})
            from agents.analyst_agent import analyst_agent
            updates = analyst_agent(state)
            state.update(updates)
            yield _sse_event({"step": "analysis", "status": "done"})

            # Step 3 — Writer Agent
            yield _sse_event({"step": "writing", "status": "running"})
            from agents.writer_agent import writer_agent
            updates = writer_agent(state)
            state.update(updates)
            yield _sse_event({"step": "writing", "status": "done"})

            # Step 4 — Reviewer Agent
            yield _sse_event({"step": "review", "status": "running"})
            from agents.reviewer_agent import reviewer_agent
            updates = reviewer_agent(state)
            state.update(updates)
            yield _sse_event({"step": "review", "status": "done"})

            # Final — send the completed report
            yield _sse_event({
                "step": "complete",
                "status": "done",
                "report": state["final_report"]
            })

        except Exception as e:
            yield _sse_event({
                "step": "error",
                "status": "error",
                "message": str(e)
            })

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        }
    )