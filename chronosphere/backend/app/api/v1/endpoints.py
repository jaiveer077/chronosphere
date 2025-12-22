from fastapi import APIRouter, HTTPException
from app.schemas.generation import GenerationRequest, GenerationResponse
from app.services.ai_orchestrator import generate_historical_view

router = APIRouter()

@router.post("/generate", response_model=GenerationResponse)
async def generate_view(request: GenerationRequest):
    """
    Generates a historical view for a given location and year.
    1. Checks cache/DB for existing generation. (Disabled for now)
    2. If not found, calls AI services.
    3. Saves result to DB. (Disabled for now)
    """
    try:
        # Call AI Orchestrator
        result = await generate_historical_view(
            request.latitude, 
            request.longitude, 
            request.year,
            request.prompt_modifier
        )
        
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
