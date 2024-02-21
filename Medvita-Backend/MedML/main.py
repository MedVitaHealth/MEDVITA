from fastapi import FastAPI, UploadFile, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from uvicorn import run

import os

from controllers.Video.process_video_controller import process_video
from controllers.Audio.process_audio_controller import process_audio
from controllers.Recommender.yoga_recommender_controller import recommend_yoga_pose, get_recommendations
from controllers.Chat.sexual_chatbot_controller import chatbot

from data.models.Benefits import Benefits
from data.models.Query import Query

app = FastAPI()

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# route to upload audio files
@app.post("/uploadfiles/")
async def create_upload_files(audiofile: UploadFile):
    return await process_audio(audiofile)


# route to recommend yoga poses
@app.post("/yoga")
async def yoga_reccomendation(data: Benefits):
    data = data.dict()
    first = data['first']
    second = data['second']
    return await recommend_yoga_pose(first, second)


# route to get yoga recommendations
@app.get("/get_yoga_recommendations")
async def get_yoga_recommendations():
    return await get_recommendations()


@app.post("/get_suggestion_from_chatbot")
async def get_suggestion(query: Query):
    data = query.dict()
    query = data['query']
    return await chatbot(query)



# A WebSocket endpoint to receive and send video frames
@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    return await process_video(websocket)
        


if __name__ == "__main__":
    try:
        port = int(os.environ.get("PORT", 8000))  # Retrieve PORT or default to 4000
    except ValueError:  # Handle invalid PORT values
        print("Invalid PORT environment variable. Using default port 4000.")
        port = 4000
    run(app, host="127.0.0.1", port=port)