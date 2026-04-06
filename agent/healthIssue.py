from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser # Add this

load_dotenv()

model = ChatGoogleGenerativeAI(
    model="gemini-2.5-flash-lite",
    temperature=0.7
)

# 1. Updated Template to demand JSON
template = """
### ROLE
You are a medical data extraction specialist. 

### TASK
Analyze the user's description and extract health concerns.
Return the output STRICTLY as a JSON object with the following keys:
- "summarization": A clean summary under 50 words and use provided patient's name.
- "keywords": A lowercase list of specific conditions or symptoms.

### HEALTH ISSUE to PROCESS:
{healthIssues}

### PATIENT NAME:
{name}

### JSON OUTPUT:
"""

def healthIssueAPI(name, healthIssues):
    prompt = ChatPromptTemplate.from_template(template)
    
    # 2. Add the JsonOutputParser to the chain
    parser = JsonOutputParser()
    chain = prompt | model | parser

    # This now returns a DICTIONARY, not a string
    result = chain.invoke({"name": name, "healthIssues": healthIssues})
    return result