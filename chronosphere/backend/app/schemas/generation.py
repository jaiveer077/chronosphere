from pydantic import BaseModel
from typing import Optional

class GenerationRequest(BaseModel):
    latitude: float
    longitude: float
    year: int
    prompt_modifier: Optional[str] = None

class GenerationResponse(BaseModel):
    url: str
    description: str
    year: int
    lat: float
    lng: float
