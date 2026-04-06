# Import Libraries
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# Import custom files
from LLM import model # Import backupModel if model doesn't work
from templates import allergyTemplate

def allergyAPI(name, allergies):
    prompt = ChatPromptTemplate.from_template(allergyTemplate)
    
    # 2. Add the JsonOutputParser to the chain
    parser = JsonOutputParser()
    chain = prompt | model | parser # Import backupModel if model doesn't work

    # This now returns a DICTIONARY, not a string
    result = chain.invoke({"name": name, "allergies": allergies})
    return result