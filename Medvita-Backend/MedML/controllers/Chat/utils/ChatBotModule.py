from langchain.chains import ConversationalRetrievalChain
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_community.embeddings import HuggingFaceEmbeddings
from langchain_community.llms import CTransformers
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory



class ChatBot:
    def __init__(self):
        #load the pdf files from the path
        loader = DirectoryLoader('data/Books', glob="*.pdf", loader_cls=PyPDFLoader)
        documents = loader.load()

        #split text into chunks
        self.text_splitter  = RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50)
        self.text_chunks = self.text_splitter.split_documents(documents)

        #create embeddings
        self.embeddings = HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2",
                                        model_kwargs={'device':"cpu"})

        #vectorstore
        self.vector_store = FAISS.from_documents(self.text_chunks, self.embeddings)

        #create llm
        self.llm = CTransformers(model="models/llama-2-7b.ggmlv3.q2_K.bin", model_type="llama",
                            config={'max_new_tokens':128,'temperature':0.01})

        # memory
        self.memory = ConversationBufferMemory(memory_key="chat_history", return_messages=True)

        # create the chain
        self.chain = ConversationalRetrievalChain.from_llm(llm=self.llm,chain_type='stuff',
                                                    retriever=self.vector_store.as_retriever(search_kwargs={"k":2}),
                                                    memory=self.memory)
        
        print("Chat Bot Module is initialized")
