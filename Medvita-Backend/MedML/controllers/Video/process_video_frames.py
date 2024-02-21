import cv2
import numpy as np
import pandas as pd
import tensorflow as tf
from controllers.Video.utils.DrawModule import Draw
from controllers.Video.utils.ExpectedKeypointsModule import ExpectedKeypoints


draw = Draw()
expected_keypoints = ExpectedKeypoints()


async def process_video_frame(data, yoga, interpreter, input_details, output_details): 
    # Convert the binary data to a numpy array
    np_data = np.frombuffer(data, dtype=np.uint8) 
    
    frame = cv2.imdecode(np_data, cv2.IMREAD_COLOR) # Decode the image data
    frame = cv2.resize(frame, (192,192)) #resize the image


    input_data = np.expand_dims(frame, axis=0) # Convert the image to RGB
    input_data = np.float32(input_data) # Convert to float32


    # Perform inference
    interpreter.set_tensor(input_details[0]['index'], input_data)
    interpreter.invoke()


    #Extract keypoints and scores
    keypoints_with_scores = interpreter.get_tensor(output_details[0]['index'])
    keypoints_with_scores = np.squeeze(keypoints_with_scores)


    # Compare the keypoints with the expected keypoints
    if np.any(np.abs(keypoints_with_scores - expected_keypoints.expected_keypoints[yoga]) <= 0.0001):
        cv2.putText(frame, "Success", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)


    # Rendering 
    try :
        await draw.draw_connections(frame, keypoints_with_scores, 0.4)
        await draw.draw_keypoints(frame, keypoints_with_scores, 0.4)
    except Exception as e:
        print(e)


    # Encode the processed image back into JPEG format
    _, jpeg = cv2.imencode('.jpg', frame)
    if jpeg is not None:
        return jpeg.tobytes()
    else:
        print("Error encoding image")
        return None