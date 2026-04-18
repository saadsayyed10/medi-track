from LLM import model
from langchain_core.messages import HumanMessage

def extractTextFromImage(imageUrl: str) -> dict:
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

    # Normalize into ONE variable
    if isinstance(response.content, str):
        text = response.content
    
    elif isinstance(response.content, list):
        text = " ".join(
            item.get("text", "")
            for item in response.content
            if item.get("type") == "text"
        )
    else:
        text = str(response.content)

    # ALWAYS return dict
    return {
        "raw_text": text,
        "lines": [line.strip() for line in text.split("\n") if line.strip()],
        "word_count": len(text.split())
    }

