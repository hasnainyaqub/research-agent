from langgraph.graph import StateGraph, END
from schemas.state import ResearchState

from agents.research_agent import research_agent
from agents.analyst_agent import analyst_agent
from agents.writer_agent import writer_agent
from agents.reviewer_agent import reviewer_agent


def create_graph():

    workflow = StateGraph(ResearchState)

    workflow.add_node("research", research_agent)
    workflow.add_node("analysis", analyst_agent)
    workflow.add_node("writer", writer_agent)
    workflow.add_node("reviewer", reviewer_agent)

    workflow.set_entry_point("research")

    workflow.add_edge("research", "analysis")
    workflow.add_edge("analysis", "writer")
    workflow.add_edge("writer", "reviewer")
    workflow.add_edge("reviewer", END)

    graph = workflow.compile()

    return graph