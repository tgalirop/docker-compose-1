from sqlalchemy import Column, Integer, Text, DateTime, func
from .database import Base

class Click(Base):
    __tablename__ = "clicks"

    id = Column(Integer, primary_key=True, index=True)
    button = Column(Text, nullable=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
