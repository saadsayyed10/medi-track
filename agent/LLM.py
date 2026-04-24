from dotenv import load_dotenv

load_dotenv()

# Instead of ChatGoogleGenerativeAI, use ChatOpenAI
from langchain_openai import ChatOpenAI
from langchain_google_genai import ChatGoogleGenerativeAI

# LLM model initialized via gemini
model = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash-lite",
        temperature=0.7,
)

# LLM model initialized via OpenRouter
backupModel = ChatOpenAI(
    model="stepfun/step-3.5-flash:free",
    temperature=0.7,
)