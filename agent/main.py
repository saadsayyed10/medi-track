from fastapi import FastAPI
from pydantic import BaseModel

from healthIssue import healthIssueAPI

app = FastAPI()

class HealthIssues(BaseModel):
    name: str
    healthIssue: str

@app.post("/api/ai/health-issues")
async def extractHealthIssues(data: HealthIssues):
    # This is now a dictionary: {"summarization": "...", "keywords": [...]}
    result_data = healthIssueAPI(data.name, data.healthIssue)
    
    return result_data