from fastapi import FastAPI
from dotenv import load_dotenv
import os

load_dotenv()

from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.endpoints import router as api_router
# from app.core.database import init_db

app = FastAPI(title="ChronoSphere API", version="1.0.0")

# CORS Configuration
origins = [
    "http://localhost:5173",  # Vite default
    "http://localhost:3000",
]

allowed_origins_env = os.getenv("ALLOWED_ORIGINS")
if allowed_origins_env:
    # Add any origins supplied via comma-separated environment variable
    origins.extend([origin.strip() for origin in allowed_origins_env.split(",") if origin.strip()])


app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    # Initialize DB tables - Disabled for now
    # await init_db()
    pass

@app.get("/")
def read_root():
    return {"message": "Welcome to ChronoSphere API"}

app.include_router(api_router, prefix="/api/v1")
