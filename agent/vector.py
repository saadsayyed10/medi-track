from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document
import os
import uuid

embeddings = GoogleGenerativeAIEmbeddings(
    model="models/text-embedding-004"
)

db_location = "./chroma_db"
add_document = not os.path.exists(db_location)

vector_store = Chroma(
    collection_name = "ocr_prescriptions",
    embedding_function = embeddings,
    persist_directory = db_location
)

if add_document:
    vector_store.add_documents(documents=documents, ids=ids)

def addOcrDoc(text: str):
    doc = Document(
        page_content=text,
        metadata= {
            "source": "ocr_upload"
        }
    )

    vector_store.add_documents(
        documents=[doc],
        ids=[str(uuid.uuid4())]
    )

retriever = vector_store.as_retriever(
    search_kwargs = {
        "k": 5
    }
)