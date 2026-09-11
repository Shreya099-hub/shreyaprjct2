from sqlalchemy import Column, Integer, String, Float
from database import Base

class Property(Base):
    __tablename__ = "properties"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(String)
    city = Column(String, index=True)
    property_type = Column(String, index=True) # "Rent" or "Buy"
    price = Column(Float, index=True)
    bedrooms = Column(Integer)
    bathrooms = Column(Integer)
    image_url = Column(String)