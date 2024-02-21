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