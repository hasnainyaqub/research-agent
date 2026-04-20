from tavily import TavilyClient
from config.settings import settings

client = TavilyClient(api_key=settings.TAVILY_API_KEY)

def search_internet(query):

    response = client.search(
        query=query,
        search_depth="advanced",
        max_results=5
    )

    results = []

    for r in response["results"]:
        results.append(
            f"{r['title']}\n{r['content']}\n{r['url']}"
        )

    return "\n\n".join(results)