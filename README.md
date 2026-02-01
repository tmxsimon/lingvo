# lingvo

Lingvo — an all-in-one language learning platform

# Setup Instructions

## Backend

### Open a terminal and go to the backend folder

cd backend

### Create and activate a virtual environment

python -m venv .venv

source .venv/bin/activate

### Install dependencies

pip install -r requirements.txt

### Go to src

cd src

### Run the backend server

uvicorn main:app --reload

## Frontend

### Open a new terminal and go to the frontend folder

cd frontend

### Install dependencies

npm install

### Run the frontend dev server

npm run dev
