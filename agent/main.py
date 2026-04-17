from fastapi import FastAPI

from customTypes import HealthIssues, Allergies, UploadPrescription, TalkToMedAI
from healthIssue import healthIssueAPI
from allergy import allergyAPI
from ocr import extractTextFromImage
from vector import getUserRetriever, addOcrDoc
from medAI import talkToMedAI

app = FastAPI()

@app.post("/api/ai/health-issues")
async def extractHealthIssues(data: HealthIssues):
    # This is now a dictionary: {"summarization": "...", "keywords": [...]}
    result_data = healthIssueAPI(data.name, data.healthIssue)
    print(f"Health issues of {data.name}:\n{result_data}")
    
    return result_data

@app.post("/api/ai/allergies")
async def extractHealthIssues(data: Allergies):
    # This is now a dictionary: {"summarization": "...", "keywords": [...]}
    result_data = allergyAPI(data.name, data.allergies)
    print(f"Allergies of {data.name}:\n{result_data}")
    
    return result_data

@app.post("/api/ai/upload-prescription")
async def uploadPrescriptionOCR(data: UploadPrescription):
    if not data.imageUrl.startswith("http"):
        return {"error": "Invalid Image URL"}
    
    ocrData = extractTextFromImage(data.imageUrl)

        # Storing in vector DB
    addOcrDoc(ocrData, data.email)
    
    userRetriever = getUserRetriever(data.email)
    res = userRetriever.invoke(ocrData["raw_text"])
    
    return {
        "status": "success",
        "ocr": ocrData,
        "retrieval": {
            "count": len(res),
            "documents": [
                {
                    "content": doc.page_content,
                    "metadata": doc.metadata
                }
                for doc in res
            ]
        }
    }

@app.post("/api/ai/chat")
async def chatWithMedAI(data: TalkToMedAI):
    res = talkToMedAI(data.email, data.question)
    return res
    
    