from LLM import model
from langchain_core.messages import HumanMessage

def extractTextFromImage(imageUrl: str) -> dict:
    message = HumanMessage(
        content=[
            {"type": "text", "text": """You are a medical prescription and medicine label analyzer. Your job is to extract and interpret information from the image provided.

EXTRACTION TASK:
Extract all readable text from the prescription or medicine label exactly as written. Include:
- Medicine name(s) and dosage
- Doctor's instructions
- Frequency and duration
- Warnings or side effects mentioned
- Doctor/pharmacy details if visible

INTERPRETATION TASK:
After extracting, provide the following even if NOT explicitly written on the prescription:

1. **Diet & Food Recommendations**: Based on the medicine(s) identified, suggest:
   - Foods that aid faster recovery
   - Foods to AVOID (that may interfere with the medicine)
   - Hydration advice

2. **Lifestyle Tips**: Rest, activity level, sleep recommendations relevant to the condition implied by the prescription.

3. **General Recovery Advice**: Based on the medicine type (antibiotic, painkiller, antacid, etc.), give recovery tips.

EDGE CASES — Handle gracefully:
- If the image is blurry or text is partially visible: Extract what you can and mention what was unclear.
- If it's not a prescription/medicine label: Politely say so and describe what the image actually contains.
- If the medicine name is unrecognizable: Say so but still try to infer from dosage or instructions.
- If it's handwritten and hard to read: Do your best and flag uncertain parts with [unclear].
- If no food/lifestyle info can be inferred: Give general recovery advice (hydration, rest, nutrition).
- If the prescription is in another language: Translate and then analyze.
- If image is completely unreadable: Ask the user to upload a clearer image.

Always respond in a helpful, friendly tone as a knowledgeable health assistant (not a doctor). Remind the user to consult their doctor for personalized advice."""},
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

