from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Weaviate
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers.ensemble import EnsembleRetriever
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
# from config import * 


DATA_DIR_PATH = "C:\Users\atrij\OneDrive\Desktop\7_AI_Financial_Advisor\data"
CHUNK_SIZE = 500
CHUNK_OVERLAP = 200
EMBEDDER = "BAAI/bge-base-en-v1.5"
DEVICE = "cpu"
PROMPT_TEMPLATE = '''
You are my menstrual health and hygiene advisor. You are great at providing tips on menstrual health, hygiene , menstrual phases, changes in body of woman and menstruation in general with your knowledge in menstruation.
With the information being provided try to answer the question. 
If you cant answer the question based on the information either say you cant find an answer or unable to find an answer.
So try to understand in depth about the context and answer only based on the information provided. Dont generate irrelevant answers

Context: {context}
Question: {question}
Do provide only helpful answers

Helpful answer:
'''
INP_VARS = ['context', 'question']
CHAIN_TYPE = "stuff"
SEARCH_KWARGS = {'k': 2}
MODEL_CKPT = "mistral-7b-openorca.Q4_K_S.gguf"
MODEL_TYPE = "llama"
MAX_NEW_TOKENS = 512
TEMPERATURE = 0.3
# WEAVIATE_API_KEY = 'BxHXpnO5Dw9zb8F60Bp6uDqK3MHUONf4EXJm'


import weaviate

import os
from dotenv import find_dotenv, load_dotenv
load_dotenv(find_dotenv())

def retriever_creation():

    # weaviate_api_key = os.getenv()
    # auth_config = weaviate.AuthApiKey(api_key=weaviate_api_key)
    # weaviate_client = weaviate.Client(
    #         # url="https://mistral-fin-adv-z164fs4s.weaviate.network",
    #         url="https://menstruation-bot-2xp9abqm.weaviate.network",
    #         auth_client_secret=auth_config
    #     )
    
    weaviate_client = weaviate.Client(
    url="https://menstruation-bot-2xp9abqm.weaviate.network",  # Replace with your endpoint
    auth_client_secret=weaviate.auth.AuthApiKey('BxHXpnO5Dw9zb8F60Bp6uDqK3MHUONf4EXJm')# Replace w/ your Weaviate instance API key
    )
    
    
    dir_loader = DirectoryLoader(
                            DATA_DIR_PATH,
                            glob='*.pdf',
                            loader_cls=PyPDFLoader
                        )
    docs = dir_loader.load()
    print("PDFs Loaded")
    
    txt_splitter = RecursiveCharacterTextSplitter(
                            chunk_size=CHUNK_SIZE, 
                            chunk_overlap=CHUNK_OVERLAP
                        )
    inp_txt = txt_splitter.split_documents(docs)
    print("Data Chunks Created")

    hfembeddings = HuggingFaceEmbeddings(
                            model_name=EMBEDDER, 
                            model_kwargs={'device': 'cpu'}
                        )

    weaviate_vectorstore = Weaviate.from_documents(inp_txt, hfembeddings, client=weaviate_client, by_text=False)
    weaviate_retriever = weaviate_vectorstore.as_retriever(search_kwargs={"k":2})
    bm25_retriever = BM25Retriever.from_documents(inp_txt)
    ensemble_retriever = EnsembleRetriever(retrievers=[weaviate_retriever, bm25_retriever], weights=[0.5, 0.5])
    print("Vector Store Creation Completed")
    return ensemble_retriever
