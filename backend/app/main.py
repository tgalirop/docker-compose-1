from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Literal
from sqlalchemy.orm import Session
from .database import SessionLocal, engine, Base
from . import crud
import os

# Δημιουργία πινάκων αν δεν υπάρχουν
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Click Tracker API")

origins = [os.getenv("CORS_ORIGINS", "http://localhost:5173")]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class ClickIn(BaseModel):
    button: Literal["A", "B"]

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/api/clicks")
def create_click(payload: ClickIn, db: Session = Depends(get_db)):
    try:
        click = crud.add_click(db, payload.button)
        return {"id": click.id, "button": click.button, "created_at": str(click.created_at)}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/counts")
def get_counts(db: Session = Depends(get_db)):
    return crud.get_counts(db)

@app.delete("/api/clicks/clear")
def clear_clicks(db: Session = Depends(get_db)):
    crud.clear_clicks(db)
    return {"message": "All clicks have been cleared."}

