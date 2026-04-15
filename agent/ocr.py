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
    return response.content