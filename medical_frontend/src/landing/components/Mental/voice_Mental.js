import React from "react";
import { useState,useRef,useContext } from "react";
import transition  from "./transition";
import "./voice.css"
import { useHttpClient } from "../../../shared/components/hooks/http-hook";
import { AuthContext } from '../../../shared/context/auth-context';
import voice from "../../../images/voice-bg.png"
import record from "../../../images/record.gif"
import record2 from "../../../images/record2.gif"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faMicrophone, faUser,faCircleStop} from '@fortawesome/free-solid-svg-icons';
import alert from "../../../images/alert.png"

const Voice_Mental = () => {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const auth = useContext(AuthContext);
    const audioChunk = useRef([]);
    const [recording, setRecording] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
    const [isImageVisible, setImageVisible] = useState(false);
    const mediaRecorderRef = useRef(null);
    const startRecording = async() => { 
        setImageVisible(true);
        const stream= await navigator.mediaDevices.getUserMedia({audio: true});
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        mediaRecorder.ondataavailable=(e)=>{
            if (e.data.size>0){
                audioChunk.current.push(e.data);
            }
        }

        mediaRecorder.onstop =async (e) => {
            const audioBlob = new Blob(audioChunk.current, {type: 'audio/wav'});
            const audioUrl = URL.createObjectURL(audioBlob);
            setRecording(prev => [...prev, audioUrl]);
            console.log(audioUrl);
            const formData = new FormData();
            formData.append('audiofile', audioBlob);
            console.log(formData);
            try {
                const response=await sendRequest ('https://med-ai-api.onrender.com/uploadfiles', 
                'POST',
                formData,
                // {
                //     Authorization: `Bearer ${auth.token}`
                // }
                )
                console.log(response);

                
            } catch (err) {
                console.log(err);
            }
        }
        mediaRecorderRef.current = mediaRecorder;
       
        // // Send a POST request to the API
        // fetch('https://your-api-url.com', {
        // method: 'POST',
        // body: formData
        // })
        // .then(response => response.json())
        // .then(data => console.log(data))
        // .catch(error => console.error(error));
         }
    const stopRecording = () => { 
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            setImageVisible(false);
            mediaRecorderRef.current.stop();
            console.log(recording);
            // console.log(audioChunk.current);
        }
    console.log(recording);
    }
    const onClose = () => {
        setIsVisible(false);
    }
    return (
        <div
        style={{
            backgroundImage: `url(${voice})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
        
        }}>
        {isImageVisible && <img className="record2img" src={record2} alt="description"/>}
            {isVisible && (
        <div className="alert relative rounded-lg border border-gray-200 shadow-lg">
                <button onClick={onClose}className="absolute -end-1 -top-1 rounded-full border border-gray-300 bg-gray-100 p-1">
                    <span className="sr-only">Close</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                    />
                    </svg>
                </button>

                <div className="flex items-center gap-4 p-4">
                <div>
                <img src={alert}
                    alt="alert"
                />
                </div>
            </div>
        </div>
            )}
        
            
        <div className="parent-div button-container flex flex-wrap justify-center gap-6 ">
            <button onClick={startRecording}
                class="center-div group relative inline-block overflow-hidden border border-black px-8 py-3 focus:outline-none focus:ring-red-300">
                
                <span
                className="absolute inset-x-0 bottom-0 h-[2px] bg-red-300 bg-opacity-50 transition-all group-hover:h-full group-active:bg-red-300"
                ></span>
                <span
                className="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                >
                <FontAwesomeIcon icon={faMicrophone} size="3x" style={{color: "#dd9a7e"}} />
                </span>
            </button>

            <button onClick={stopRecording}
                class="center-div2 group relative inline-block overflow-hidden border border-black px-8 py-3 focus:outline-none focus:ring-red-300">
                <span
                class="absolute inset-x-0 bottom-0 h-[2px] bg-red-300 bg-opacity-50 transition-all group-hover:h-full group-active:bg-red-300"
                ></span>

                <span
                class="relative text-sm font-medium text-indigo-600 transition-colors group-hover:text-white"
                >
                    <FontAwesomeIcon icon={faCircleStop}size="3x" style={{color: "#dd9a7e"}} />
                </span>
            </button>
        </div>

        {recording.length > 0 && (
        <div className="chat1 space-y-4 inline-block rounded-3xl shadow-md p-4 absolute bottom-10 right-5">
            <details
            className="group   bg-opacity-50 p-6 cursor-pointer"
            open
            >
            <summary className="flex items-center justify-between gap-1.5">
                <span className="shrink-0 rounded-full p-1.5 text-gray-900 sm:p-3">
                {recording.map((recUrl, index) => {
                    return (
                    <div key={index} className="flex flex-col">
                        <audio controls src={recUrl} className="mb-2 controls" />
                        {/* <a href={recUrl} download={`recording${index}.wav`} className="text-sm text-blue-500 underline">
                        Download Recording
                        </a> */}
                    </div>
                    );
                })}
                </span>
            </summary>
            </details>
        </div>
        )}
        </div>
    );
}
export default transition(Voice_Mental);
