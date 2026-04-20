from langchain_groq import ChatGroq
from tools.search_tool import search_internet

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0.3
)

def research_agent(state):

    topic = state["topic"]

    search_results = search_internet(topic)

    prompt = f"""

    Research Topic: {topic}

    Search Results:
    {search_results}

    Collect important information.
    """

    result = llm.invoke(prompt)

    return {
        "research_data": result.content
    }