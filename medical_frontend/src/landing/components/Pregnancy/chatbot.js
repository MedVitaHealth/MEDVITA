import React, { useState, useEffect } from 'react';
import "./pregnency.css"
import pregbg from "../../../images/pregbg.png"
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { MainContainer, ChatContainer, MessageList, Message, MessageInput, TypingIndicator } from '@chatscope/chat-ui-kit-react';
const Chatbot = () => {
  const API_KEY = process.env.REACT_APP_API_KEY;
    // const API_KEY="abcd"
    const systemMessage = { //  Explain things like you're talking to a software professional with 5 years of experience.
        "role": "system", "content": "Explain things like you're talking to a pregnent lady."
      }
    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm PregGPT! Ask me anything!",
          sentTime: "just now",
          sender: "ChatGPT"
        }
      ]);
      const [isTyping, setIsTyping] = useState(false);

  const handleSend = async (message) => {
    const newMessage = {
      message,
      direction: 'outgoing',
      sender: "user"
    };

    const newMessages = [...messages, newMessage];
    
    setMessages(newMessages);

    setIsTyping(true);
    await processMessageToChatGPT(newMessages);
  };

  async function processMessageToChatGPT(chatMessages) { 


    let apiMessages = chatMessages.map((messageObject) => {
      let role = "";
      if (messageObject.sender === "PregGPT") {
        role = "assistant";
      } else {
        role = "user";
      }
      return { role: role, content: messageObject.message}
    });

    const apiRequestBody = {
      "model": "gpt-3.5-turbo",
      "messages": [
        systemMessage, 
        ...apiMessages 
      ]
    }

    await fetch("https://api.openai.com/v1/chat/completions", 
    {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiRequestBody)
    }).then((data) => {
      return data.json();
    }).then((data) => {
      console.log(data);
      setMessages([...chatMessages, {
        message: data.choices[0].message.content,
        sender: "PregGPT"
      }]);
      setIsTyping(false);
    });
  }

    return (
        <div>
          <div style={{ backgroundImage: `url(${pregbg})` ,position:"relative", height: "100vh", width: "130vh"  }}>
        <MainContainer className='chatcont'  >
          <ChatContainer style={{ fontFamily: 'Arial, sans-serif' }} >      
            <MessageList className="chatbox" style={{ backgroundImage: `url(${pregbg})` }}
              scrollBehavior="smooth" 
              typingIndicator={isTyping ? <TypingIndicator content="ChatGPT is typing" /> : null}
            >
              {messages.map((message, i) => {
                // console.log(message)
                return <Message  key={i} model={message} />
              })}
            </MessageList>
            <MessageInput  placeholder="Type message here" onSend={handleSend} />        
          </ChatContainer>
        </MainContainer>
      </div>
        </div>
    );
}
export default Chatbot;