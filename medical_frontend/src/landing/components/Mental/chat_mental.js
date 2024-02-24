import React from "react";
import { useState,useRef,useContext } from "react";
import transition  from "./transition";
import "./voice.css"
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import voice from "../../../images/voice-bg.png"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faPaperPlane, faUser,faCircleStop} from '@fortawesome/free-solid-svg-icons';
import MessageInput from "./Message";
import MessageOutput from "./messageOut";

const Chat_Mental = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const [users, setUsers] = useState([]);
    const [responses, setResponses] = useState([]);
    const [inputText, setInputText] = useState('');

    const handleSend = () => {
        setUsers([...users, inputText]);
        setInputText(''); // clear the input field
    }
    // console.log(users);
    return (
        <div
        style={{
            backgroundImage: `url(${voice})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
        }}>

            <div className="flex justify-center">
                <label
                    className="mb-4 block overflow-hidden rounded-md border-2 border-gray-900 px-3 py-2 shadow-sm focus-within:border-gray-800 focus-within:ring-1 focus-within:ring-gray-800 fixed bottom-0 w-3/4"
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                    <input
                    type="text"
                    className="w-full bg-transparent focus:outline-none ml-2"
                    placeholder="Type a message"
                    value={inputText}
                    onChange={e => setInputText(e.target.value)}
                    />
                    <button onClick={handleSend}>
                    <FontAwesomeIcon icon={faPaperPlane} style={{ color: "#66400a" }} size="2x"/>
                    </button>
                </div>
                    
                
                </label>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div>
                    <MessageInput users={users}/>
                </div>
                <div>
                    <MessageOutput />
                </div>
            </div>
        </div>
    );
}
    
export default (Chat_Mental);
