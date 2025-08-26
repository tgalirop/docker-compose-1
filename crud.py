from sqlalchemy.orm import Session
from sqlalchemy import func
from .models import Click

def add_click(db: Session, button: str) -> Click:
    click = Click(button=button)
    db.add(click)
    db.commit()
    db.refresh(click)
    return click

def get_counts(db: Session) -> dict:
    rows = db.query(Click.button, func.count(Click.id)).group_by(Click.button).all()
    counts = {btn: cnt for btn, cnt in rows}
    for k in ("A", "B"):
        counts.setdefault(k, 0)
    return counts

def clear_clicks(db: Session) -> None:
    db.query(Click).delete()
    db.commit()

