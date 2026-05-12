from langchain_chroma import Chroma
from langchain_core.documents import Document
from LLM import embeddings
import uuid

vector_store = Chroma(
    collection_name="ocr_prescriptions",
    embedding_function=embeddings,
    persist_directory="./chroma_db"
)

def addOcrDoc(ocrData: dict, email: str):
    doc = Document(
        page_content=ocrData["raw_text"],
        metadata={
            "source": "ocr_upload",
            "word_count": ocrData["word_count"],
            "user_email": email
        }
    )

    vector_store.add_documents(
        documents=[doc],
        ids=[str(uuid.uuid4())]
    )

def getUserRetriever(email: str):
    return vector_store.as_retriever(
    search_kwargs={
        "k": 5,
        "filter": {
            "user_email": email
        }
    },
    
)

def deleteOCRData(email: str):
    vector_store.delete(
        where={
            "user_email": email
        }
    )