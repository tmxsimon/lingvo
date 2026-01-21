from contextlib import asynccontextmanager
from fastapi import FastAPI
from db import init_db
from dictionary.router import router as dictionary_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    init_db()
    yield
    pass

app = FastAPI(lifespan=lifespan)

routers = [dictionary_router]
for router in routers:
    app.include_router(router)

@app.get("/")
async def index():
    return {"message": "Hello world!"}