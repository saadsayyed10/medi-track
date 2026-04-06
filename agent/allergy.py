# Import Libraries
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import JsonOutputParser

# Import custom files
from LLM import model
from templates import allergyTemplate

def allergyAPI(name, allergies):
    prompt = ChatPromptTemplate.from_template(allergyTemplate)
    
    # 2. Add the JsonOutputParser to the chain
    parser = JsonOutputParser()
    chain = prompt | model | parser

    # This now returns a DICTIONARY, not a string
    result = chain.invoke({"name": name, "allergies": allergies})
    return result