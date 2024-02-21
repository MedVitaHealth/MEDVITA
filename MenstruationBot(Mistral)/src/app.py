# from finbot import FinBotCreator
from langchain.prompts import PromptTemplate
from langchain_community.llms import CTransformers
from langchain.chains import RetrievalQA

# from dotenv import find_dotenv, load_dotenv
# load_dotenv(find_dotenv())


from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.vectorstores import Weaviate
from langchain_community.retrievers import BM25Retriever
from langchain.retrievers.ensemble import EnsembleRetriever
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter




DATA_DIR_PATH = "C:\\Users\\atrij\\OneDrive\\Desktop\\7_AI_Financial_Advisor\\data"
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







# from ensemble_retriever import retriever_creation

import streamlit as st
from streamlit_chat import message
st.session_state.clicked=True
@st.cache_resource(show_spinner=True)









class FinBotCreator:

    def __init__(self):
        self.prompt_temp = PROMPT_TEMPLATE
        self.input_variables = INP_VARS
        self.chain_type = CHAIN_TYPE
        self.search_kwargs = SEARCH_KWARGS
        self.embedder = EMBEDDER
        self.model_ckpt = MODEL_CKPT
        self.model_type = MODEL_TYPE
        self.max_new_tokens = MAX_NEW_TOKENS
        self.temperature = TEMPERATURE

    def create_custom_prompt(self):
        custom_prompt_temp = PromptTemplate(template=self.prompt_temp,
                            input_variables=self.input_variables)
        return custom_prompt_temp
    
    def load_llm(self):
        llm = CTransformers(
                model = self.model_ckpt,
                model_type=self.model_type,
                max_new_tokens = self.max_new_tokens,
                temperature = self.temperature
            )
        return llm
    
    def load_retriever(self):
        return retriever_creation()

    def create_bot(self, custom_prompt, retriever, llm):
        retrieval_qa_chain = RetrievalQA.from_chain_type(
                                llm=llm,
                                chain_type=self.chain_type,
                                retriever= retriever,
                                return_source_documents=True,
                                chain_type_kwargs={"prompt": custom_prompt}
                            )
        return retrieval_qa_chain
    
    def create_finbot(self):
        self.custom_prompt = self.create_custom_prompt()
        self.retriever = self.load_retriever()
        self.llm = self.load_llm()
        self.bot = self.create_bot(self.custom_prompt, self.retriever, self.llm)
        return self.bot







def create_finbot():
    finbotcreator = FinBotCreator()
    finbot = finbotcreator.create_finbot()
    return finbot
finbot = create_finbot()

def infer_finbot(prompt):
    model_out = finbot(prompt)
    answer = model_out['result']
    return answer

def display_conversation(history):
    for i in range(len(history["assistant"])):
        message(history["user"][i], is_user=True, key=str(i) + "_user")
        message(history["assistant"][i],key=str(i))

def main():

    st.title("Financial Advisor: A Financial Nerd 📚🤖")
    st.subheader("A bot created using Langchain 🦜 to run on cpu making your financial management process easier")

    user_input = st.text_input("Enter your query")

    if "assistant" not in st.session_state:
        st.session_state["assistant"] = ["I am ready to help you"]
    if "user" not in st.session_state:
        st.session_state["user"] = ["Hey there!"]
                
    if st.session_state.clicked:
        if st.button("Answer"):

            answer = infer_finbot({'query': user_input})
            st.session_state["user"].append(user_input)
            st.session_state["assistant"].append(answer)

            if st.session_state["assistant"]:
                display_conversation(st.session_state)

if __name__ == "__main__":
    main()
    
    