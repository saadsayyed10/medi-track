# Import Libraries
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# Import custom files
from LLM import model # Import backupModel if model doesn't work
from templates import healthIssueTemplate

def healthIssueAPI(name, healthIssues):
    prompt = ChatPromptTemplate.from_template(healthIssueTemplate)
    
    # 2. Add the JsonOutputParser to the chain
    parser = JsonOutputParser()
    chain = prompt | model | parser # Use backupModel if model doesn't work

    # This now returns a DICTIONARY, not a string
    result = chain.invoke({"name": name, "healthIssues": healthIssues})
    return result