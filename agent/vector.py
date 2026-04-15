from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import uuid

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/gemini-embedding-2-preview"
)

vector_store = Chroma(
    collection_name="ocr_prescriptions",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

def addOcrDoc(text: str):
    doc = Document(
        page_content=text,
        metadata={
            "source": "ocr_upload"
        }
    )

    vector_store.add_documents(
        documents=[doc],
        ids=[str(uuid.uuid4())]
    )

retriever = vector_store.as_retriever(
    search_kwargs={"k": 5}
)