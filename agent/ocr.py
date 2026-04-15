from LLM import model
from langchain_core.messages import HumanMessage

def extractTextFromImage(imageUrl: str) -> str:
    message = HumanMessage(
        content=[
            {"type": "text", "text": "Extract all readable text from this medical prescription or medicine label."},
            {
                "type": "image_url",
                "image_url": imageUrl,
            },
        ]
    )

    response = model.invoke([message])

    # ✅ Handle both cases
    if isinstance(response.content, str):
        return response.content
    
    elif isinstance(response.content, list):
        return " ".join(
            item.get("text", "")
            for item in response.content
            if item.get("type") == "text"
        )

    return str(response.content)