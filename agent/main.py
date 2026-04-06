from dotenv import load_dotenv
load_dotenv()

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate

model = ChatGoogleGenerativeAI(
    model = "gemini-2.5-flash-lite",
    temperature=0.7
)

template = """
### ROLE
You are a medical data extraction specialist. Your task is to analyze user descriptions of health issues and extract specific conditions, symptoms, or behavioral challenges.

### TASK
- Identify and extract all health-related concerns from the input.
- 1. Convert these concerns into a clean, summarization under 50 words.
- 2. Convert these concerns into a clean, lowercase list of keywords.
- Output ONLY a summarization text and TypeScript/JavaScript style array

### EXAMPLES
Input: "I am suffering through a laziness problem due to ADHD and I am not being able to focus to PTSD as I have failed earlier a lot of time."
Output: Summarization: This patient is suffering with a lack of discipline due to attention deficit problems and is scared to due trauma from past failures.
Array: ["Attention Deficit Hyperactivity Disorder", "PTSD", "Procrastination"] 

### HEALTH ISSUE to PROCESS:
{healthIssue}

### KEYWORD ARRAY:
"""

prompt = ChatPromptTemplate.from_template(template)
chain = prompt | model

result = chain.invoke({"healthIssue": "I cannot stick to one though because I am Bipolar, and I am trying to fix stillness but I cannot due to Attention Deficit problems."})

print(result.content)