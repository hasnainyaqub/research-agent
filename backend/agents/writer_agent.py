from langchain_groq import ChatGroq

llm = ChatGroq(
    model="llama-3.3-70b-versatile",
    temperature=0.5,
    max_tokens=5000
)

def writer_agent(state):

    topic = state["topic"]
    analysis = state["analysis"]

    prompt = f"""

    Write a 5000 word research report

    Topic: {topic}

    Analysis:
    {analysis}

    Requirements:

    Title
    Introduction
    Sections
    Conclusion
    References
    """

    result = llm.invoke(prompt)

    return {
        "report": result.content
    }