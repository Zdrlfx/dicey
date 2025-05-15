# 1. Base Python image
FROM python:3.10-slim-bullseye

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy dependency list
COPY requirements.txt .

# 4. Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# 5. Copy all app files
COPY . .

# 6. Run FastAPI using uvicorn, with PORT from .env
CMD ["sh", "-c", "uvicorn app.main:app --host 0.0.0.0 --port $PORT"]
