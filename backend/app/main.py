from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend connection (Vite default port is 5173)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # you can restrict this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class SubmitPayload(BaseModel):
    spoken: int
    dice: list[int]
    time_taken_ms: int


@app.post("/submit")
def submit(payload: SubmitPayload):
    correct_sum = sum(payload.dice)
    is_correct = payload.spoken == correct_sum

    return {
        "correct": is_correct,
        "total": correct_sum,
        "reaction_time": payload.time_taken_ms,
        "message": "✅ Correct!"
        if is_correct
        else f"❌ You said {payload.spoken}, correct was {correct_sum}",
    }




@app.get("/health")
def health():
    return {"status": "ok"}
