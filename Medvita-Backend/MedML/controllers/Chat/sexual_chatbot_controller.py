from controllers.Chat.utils.session import conversation_chat

async def chatbot(query: str):
    return await conversation_chat(query)