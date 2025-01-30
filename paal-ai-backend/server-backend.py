from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from interpreter import interpreter

# Configure the model directly
interpreter.llm.model = "gpt-4o-mini"
interpreter.llm.api_key = ""
interpreter.auto_run = True  # Ensure interpreter automatically runs without manual triggers

app = FastAPI()

# CORS setup for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows requests from all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"]  # Allows all headers
)

class Command(BaseModel):
    command: str

@app.post("/process-command")
def process_command(command: Command):
    try:
        # Example of handling complex responses:
        responses = interpreter.chat(command.command)
        # Assuming `responses` is a list of dicts or a string, we need to normalize it
        if isinstance(responses, str):
            responses = [{"type": "message", "content": responses}]
        # Ensure the response is a list of messages
        return JSONResponse(content={"messages": responses})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/chat")
def chat_endpoint(message: str):
    def event_stream():
        for result in interpreter.chat(message, stream=True):
            yield f"data: {result}\n\n"
    return StreamingResponse(event_stream(), media_type="text/event-stream")

@app.get("/history")
def history_endpoint():
    return interpreter.messages
