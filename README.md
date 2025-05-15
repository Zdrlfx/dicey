# 🎲 Voice-Based Dice Game (FastAPI Backend)

This project is a **voice-controlled dice game** where players verbally answer simple math challenges. The server randomly generates a few dice values, and the player says the total sum out loud. The app checks if the spoken answer matches the correct sum and responds accordingly.

It is built with **FastAPI** and optionally supports a React frontend. Voice input is handled via the **Web Speech API** on the frontend. The backend is fully containerized with Docker and includes automated testing and CI via GitHub Actions.

---

## 🧠 What the Project Does

- 🎲 **Dice Generation**: Server randomly generates dice values (e.g., `[2, 5, 1]`)
- 🎙️ **Voice Input**: Frontend captures the user’s spoken total (e.g., “eight”)
- 🧮 **Validation**: Backend checks if the spoken input equals the sum
- ⏱️ **Reaction Time**: Records how fast the user responded
- ✅ **Result Message**: Responds with a "Correct" or "Wrong" message and the actual total

---

## ▶️ How to Run

### 🐍 Option A: Run Locally (FastAPI only)

> Make sure you have Python 3.11+ and pip installed.

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # On Windows
# OR
source venv/bin/activate   # On Mac/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload
