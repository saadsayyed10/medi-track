from dotenv import load_dotenv

load_dotenv()

# Instead of ChatGoogleGenerativeAI, use ChatOpenAI if google models fail
from langchain_openai import ChatOpenAI

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings

# LLM model initialized via gemini
model = ChatGoogleGenerativeAI(
        model="gemini-2.5-flash-lite",
        temperature=0.7,
)

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-001"
)


# LLM model initialized via OpenRouter
backupModel = ChatOpenAI(
    model="stepfun/step-3.5-flash:free",
    temperature=0.7,
)