from fastapi import FastAPI, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

import models
from database import SessionLocal, engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Property Search API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
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

class PropertyResponse(BaseModel):
    id: int
    title: str
    description: str
    city: str
    property_type: str
    price: float
    bedrooms: int
    bathrooms: int
    image_url: str

    class Config:
        from_attributes = True

@app.get("/api/properties", response_model=List[PropertyResponse])
def get_properties(
    city: Optional[str] = None,
    property_type: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    db: Session = Depends(get_db)
):
    query = db.query(models.Property)
    if city:
        query = query.filter(models.Property.city == city)
    if property_type:
        query = query.filter(models.Property.property_type == property_type)
    if min_price is not None:
        query = query.filter(models.Property.price >= min_price)
    if max_price is not None:
        query = query.filter(models.Property.price <= max_price)
        
    return query.all()