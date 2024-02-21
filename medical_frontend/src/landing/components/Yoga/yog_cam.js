import React,{useState,useRef, useEffect} from "react";
import { useLocation } from "react-router-dom";
import "./yoga.css"
import ws from 'ws';
import Webcam from 'react-webcam';
import cam from "../../../images/cam.png"
import LoadingSpinner from "../../../shared/components/UIElements/LoadingSpinner";
import Yoga from "./yoga";
import YogaBeni from "./YogaBeni";
import YogaVideo from "./Yogavideo";
const Yog_cam = () => {
  let location = useLocation();
  let yogaName = location.state.yogaName;
  let yogaNames = "";
  if (yogaName === "Downward Dog") {
    yogaNames = "downward_dog";
  }
  if (yogaName === "Cobra") {
    yogaNames = "cobra";
  }
  if (yogaName === "Tree Pose") {
    yogaNames = "tree";
  }
  if (yogaName === "Chair Pose") {
    yogaNames = "chair";
  }
  if (yogaName === "Shoulder Stand") {
    yogaNames = "shoulder_stand";
  }
  if (yogaName === "Warrior Pose") {
    yogaNames = "warrior_pose";
  }
  if (yogaName === "Triangle Pose") {
    yogaNames = "triangle_pose";
  }
  if (yogaName === "Cat Pose") {
    yogaNames = "cat_pose";
  }
  if (yogaName === "Bridge Pose") {
    yogaNames = "bridge_pose";
  }
  if (yogaName === "Standing Forward Bend") {
    yogaNames = "standing_forward_bend";
  }
  if (yogaName === "Puppy Pose") {
    yogaNames = "puppy_pose";
  }
  if (yogaName === "Plough Pose") {
    yogaNames = "plough_pose";
  }
  const [connection, setConnection] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const canvasRef = useRef(null);
    const webcamRef = useRef(null)
    useEffect(() => {
        const canvas = canvasRef.current;
        const video = webcamRef.current.video;
        const ctx = canvas.getContext('2d');
        canvas.width = video.width;
        canvas.height = video.height;
        navigator.mediaDevices.getUserMedia({ video: true })
        .then((stream) => {
            video.srcObject = stream;

            // Create a WebSocket connection
            const ws = new WebSocket(process.env.REACT_APP_API_URL);
            // When the connection is open
            ws.addEventListener('open', () => {
              setIsLoading(false);
                console.log('WebSocket connection established');
                ws.send(yogaNames)
                setConnection(true);
                video.addEventListener('play', () => {
                  const canvasx = document.createElement('canvas');
                  const contextx = canvasx.getContext('2d');
                  canvasx.width = video.width;
                  canvasx.height = video.height;
  
                  setInterval(() => {
                      contextx.drawImage(video, 0, 0, canvasx.width, canvasx.height);
                      const imageData = canvasx.toDataURL('image/jpeg', 0.6); // Convert frame to base64
                      
                      fetch(imageData)
                          .then(res => res.blob())
                          .then(blob => ws.send(blob)); // Send the blob to the server
                  }, 400); // Adjust the interval as needed
              });
            });

            // When the connection is closed
            ws.addEventListener('close', () => {
                console.log('WebSocket connection closed');
          
            });
            // When a new frame is available from the webcam
            

            ws.onmessage = function(event) {
                var blob = event.data;
                if (!blob.type) {
                    blob = new Blob([blob], { type: 'image/jpeg' });
                }

                // Create an object URL from the Blob
                var url = URL.createObjectURL(blob);

                var img = new Image();
                img.onload = function() {
                    // Draw the image onto the canvas
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = url;
            };
        })
        .catch((error) => {
            console.error('Error accessing webcam:', error);
        });
}, []);
    return (
        <>
        <section
        style={{
            backgroundImage: `url(${cam})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
        
        }}>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
       
        <div style={{
        fontSize: '2rem', 
        fontWeight: '800', 
        textAlign: 'center',
        padding: '20px',
        }} 
        className="fontStyle font h-full w-full rounded-lg bg-green-100 bg-opacity-20 lg:col-span-2 d-flex justify-content-center align-items-center p-3">
        START YOUR YOGA SESSION
        {isLoading && <LoadingSpinner asOverlay/>}
        <Webcam 
        className="visi absolute w-full h-full p-4  mb-4 rounded-lg pb-8 "
        width='100%'
        height='60%'
        id="webcam"
        visibility="false"
        ref={webcamRef}
        /> 
         <canvas
          className="w-full h-full p-4  mb-4 rounded-lg pb-8"
          ref={canvasRef}
          width='100%'
          height='90%'
          id="canvas"
        />
        
        </div>
        <div className=" h-full w-full rounded-lg bg-gray-200 bg-green-100 bg-opacity-20">
           <YogaVideo yoga={yogaName} />
        </div>
        </div>
        </section>
        <section 
        style={{
            backgroundImage: `url(${cam})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
        
        }}className="text-black">
        <YogaBeni yoga={yogaName} />
      </section>
      </>
             
    )
}
export default Yog_cam
