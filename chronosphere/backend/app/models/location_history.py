from sqlalchemy import Column, Integer, String, Float, DateTime, Text
from geoalchemy2 import Geometry
from app.core.database import Base
from datetime import datetime

class LocationHistory(Base):
    __tablename__ = "location_history"

    id = Column(Integer, primary_key=True, index=True)
    latitude = Column(Float, nullable=False)
    longitude = Column(Float, nullable=False)
    year = Column(Integer, nullable=False)
    
    # PostGIS Geometry for efficient spatial queries
    geom = Column(Geometry('POINT', srid=4326))
    
    image_url = Column(String, nullable=False)
    description = Column(Text, nullable=True)
    prompt_used = Column(Text, nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
