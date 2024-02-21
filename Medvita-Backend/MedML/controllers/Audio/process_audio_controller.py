from fastapi import UploadFile

from controllers.Audio.utils.mfcc import extract_mfcc
from controllers.Audio.utils.resize import resize_mfcc

from keras.models import load_model

import os
import sys
from pathlib import Path


async def process_audio(audiofile: UploadFile):
    model_dir = "models/SERModel.h5"
    model = load_model(model_dir)
    UPLOAD_PATH = Path() / "uploads" # Path to save the uploaded file

    try:
        data = await audiofile.read() # Read the file
        save_to = UPLOAD_PATH / audiofile.filename # Save the file to the path

        if not os.path.exists(UPLOAD_PATH): # Create the directory if it doesn't exist
            os.makedirs(UPLOAD_PATH)

        try:
            with open(save_to, "wb") as f: # Save the file
                f.write(data)
                print("File saved to", save_to)
        except IOError as e:
            print(f"Error saving file: {e}")
            return {"error": "Error saving file"}

        try:
            mfcc = extract_mfcc(save_to) # extract mfcc
            X = resize_mfcc(mfcc) # resize
        except Exception as e:
            print(f"Error processing file [extracting / resizing mfcc]: {e}")
            return {"error": "Error processing file"}

        os.remove(save_to) #delete the file

        try:
            out = model.predict(X) # predict
        except Exception as e:
            print(f"Error predicting emotion: {e}")
            return {"error": "Error predicting emotion"}

        index = out.argmax() # get the index of the highest value

        emotions = ['angry', 'disgust', 'fear', 'happy', 'neutral', 'ps', 'sad'] 
        emotion = emotions[index]

        return {"out": emotion}

    except Exception as e:
        print(f"Unexpected error: {e}")
        return {"error": "Unexpected error"}