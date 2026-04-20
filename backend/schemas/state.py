from typing import TypedDict, List

class ResearchState(TypedDict):

    topic: str
    research_data: str
    analysis: str
    report: str
    final_report: str
    messages: List[str]