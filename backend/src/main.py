from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from src.dictionary.router import router as dictionary_router
from src.notes.router import router as notes_router
from src.languages.router import router as languages_router
from src.flippers.router import router as flippers_router

app = FastAPI()

app.mount("/uploads", StaticFiles(directory="src/uploads"), name="uploads")

routers = [dictionary_router, notes_router, languages_router, flippers_router]
for router in routers:
    app.include_router(router)

origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/")
async def index():
    return {"message": "Hello world!"}