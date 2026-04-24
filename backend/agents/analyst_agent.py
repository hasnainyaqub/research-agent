from langchain_groq import ChatGroq

llm = ChatGroq(
    model="openai/gpt-oss-120b",
    temperature=0.2,
    max_tokens=5000
)

def analyst_agent(state):

    research = state["research_data"]

    prompt = f"""

    Analyze the research data:

    {research}

    Create structured insights
    """

    result = llm.invoke(prompt)

    return {
        "analysis": result.content
    }