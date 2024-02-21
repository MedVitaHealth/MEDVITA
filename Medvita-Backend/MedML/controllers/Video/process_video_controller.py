from fastapi import WebSocket, WebSocketDisconnect
import tensorflow as tf
from controllers.Video.process_video_frames import process_video_frame

async def process_video(websocket: WebSocket):
    try:
        await websocket.accept() # Accept the WebSocket connection
        await websocket.send_text("Connected to the server. Send video frames.") # Send a message to the client
        print("Client connected.")

        yoga = await websocket.receive_text() # Receive a message from the client
        print(f"Yoga pose: {yoga}")

        model_dir = "models/3.tflite"
        interpreter = tf.lite.Interpreter(model_path=model_dir) # Load the movenet model
        interpreter.allocate_tensors() # Allocate tensors
        input_details = interpreter.get_input_details() # Get input details
        output_details = interpreter.get_output_details() # Get output details
        print("Model loaded and ready.")


        try:
            while True:
                # Receive a video frame as bytes from the client    
                data = await websocket.receive_bytes()
                if data:
                    try:
                        data = await process_video_frame(data, yoga, interpreter, input_details, output_details)
                        # data = await process_video(data, yoga, interpreter, input_details, output_details)
                    except Exception as e:
                        print(f"Error processing video frame: {e}")
                        break

                    # Send the processed frame back to the client
                    await websocket.send_bytes(data) # Process the video frame and return it as bytes
                else:
                    await websocket.send_bytes(data)

        except WebSocketDisconnect:
            print("Client disconnected.")
            await websocket.close(code=1000)
            

    except Exception as e:
        print(f"Unexpected error: {e}")
        await websocket.close(code=1011)