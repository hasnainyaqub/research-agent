from langchain_groq import ChatGroq

llm = ChatGroq(
    model="openai/gpt-oss-20b",
    temperature=0.2
)

def reviewer_agent(state):

    report = state["report"]

    prompt = f"""

    Improve the following research report:

    {report}

    Fix:

    clarity  
    grammar  
    structure  
    """

    result = llm.invoke(prompt)

    return {
        "final_report": result.content
    }