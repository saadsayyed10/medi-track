from pydantic import BaseModel

class HealthIssues(BaseModel):
    name: str
    healthIssue: str

class Allergies(BaseModel):
    name: str
    allergies: str

class UploadPrescription(BaseModel):
    imageUrl: str
    email: str

class TalkToMedAI(BaseModel):
    email: str
    question: str