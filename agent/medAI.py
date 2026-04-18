from vector import getUserRetriever
from LLM import model

def talkToMedAI(userId, question):
    userRetriever = getUserRetriever(userId)
    
    docs = userRetriever.invoke(question)

    context = "\n\n".join([doc.page_content for doc in docs])

    prompt = f"""
    You are a medical assistant.

    Use ONLY the context below to answer the question.
    If the answer is not in the context, say "I don't know".

    Context:
    {context}

    Question:
    {question}
    """

    response = model.invoke(prompt)

    return {
        "answer": response.content,
        "sources": [
            {
                "content": doc.page_content,
                "metadata": doc.metadata
            }
            for doc in docs
        ]
    }
