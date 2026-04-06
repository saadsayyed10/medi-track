from fastapi import FastAPI

from customTypes import HealthIssues, Allergies
from healthIssue import healthIssueAPI
from allergy import allergyAPI

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