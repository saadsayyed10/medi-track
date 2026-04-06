from dotenv import load_dotenv

load_dotenv()

# Instead of ChatGoogleGenerativeAI, use ChatOpenAI
from langchain_openai import ChatOpenAI

# LLM model initialized via OpenRouter
model = ChatOpenAI(
    model="stepfun/step-3.5-flash:free",
    temperature=0.7,
)