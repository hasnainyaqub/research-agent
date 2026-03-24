from fastapi import FastAPI
from pydantic import BaseModel
from graph.research_graph import create_graph

app = FastAPI()

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