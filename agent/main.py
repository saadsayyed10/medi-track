from fastapi import FastAPI

from customTypes import HealthIssues, Allergies, UploadPrescription
from healthIssue import healthIssueAPI
from allergy import allergyAPI
from ocr import extractTextFromImage
from vector import retriever, addOcrDoc

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
    if data.imageUrl.startswith("http"):
        extractedText = extractTextFromImage(data.imageUrl)

        # Storing in vector DB
        addOcrDoc(extractedText)
    
    res = retriever.invoke(extractedText)
    
    return {
        "extracted_text": extractedText,
        "retrieved_docs": [
            {
                "content": doc.page_content,
                "metadata": doc.metadata
            }
            for doc in res
        ]
    }
    