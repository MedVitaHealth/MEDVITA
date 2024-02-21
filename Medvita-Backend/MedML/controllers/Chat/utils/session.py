import streamlit as st
from streamlit_chat import message

from controllers.Chat.utils.ChatBotModule import ChatBot

chatBot = ChatBot()


async def initialize_session_state():
    if 'history' not in st.session_state:
        st.session_state['history'] = []

    if 'generated' not in st.session_state:
        st.session_state['generated'] = ["Hello! Ask me anything about 🤗"]

    if 'past' not in st.session_state:
        st.session_state['past'] = ["Hey! 👋"]



async def conversation_chat(query: str):
    await initialize_session_state()
    result = chatBot.chain({
        "question": query,
        "chat_history": []
        })
    # st.session_state['history'].append((query, result["answer"]))
    return result["answer"]




# async def display_chat_history():
#     reply_container = st.container()
#     container = st.container()

#     with container:
#         with st.form(key='my_form', clear_on_submit=True):
#             user_input = st.text_input("Question:", placeholder="Ask about your Mental Health", key='input')
#             submit_button = st.form_submit_button(label='Send')

#         if submit_button and user_input:
#             output = conversation_chat(user_input)

#             st.session_state['past'].append(user_input)
#             st.session_state['generated'].append(output)

#     if st.session_state['generated']:
#         with reply_container:
#             for i in range(len(st.session_state['generated'])):
#                 message(st.session_state["past"][i], is_user=True, key=str(i) + '_user', avatar_style="thumbs")
#                 message(st.session_state["generated"][i], key=str(i), avatar_style="fun-emoji")