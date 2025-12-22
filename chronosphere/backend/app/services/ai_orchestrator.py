import asyncio
import os
import httpx
import urllib.parse
from app.schemas.generation import GenerationResponse

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-001:generateContent?key={GEMINI_API_KEY}"




async def generate_historical_view(lat: float, lng: float, year: int, modifier: str = None) -> GenerationResponse:
    """
    Orchestrates the AI generation process:
    1. Reverse Geocoding (Lat/Lng -> Place Name/Context) - Skipped for now, using Lat/Lng directly
    2. LLM Prompt Engineering (Context + Year -> Visual Description) using Gemini
    3. Image Generation (Description -> Image) using Pollinations.ai
    """
    
    prompt = f"Describe the historical appearance of the location at latitude {lat}, longitude {lng} in the year {year}. "
    if modifier:
        prompt += f"Focus on: {modifier}. "
    prompt += "Provide a concise, visual description suitable for image generation, under 50 words."

    description = f"A simulated view of the location at {lat}, {lng} in the year {year}."
    
    if GEMINI_API_KEY:
        try:
            async with httpx.AsyncClient() as client:
                payload = {
                    "contents": [{
                        "parts": [{"text": prompt}]
                    }]
                }
                response = await client.post(GEMINI_URL, json=payload, timeout=10.0)
                if response.status_code == 200:
                    data = response.json()
                    if "candidates" in data and data["candidates"]:
                        description = data["candidates"][0]["content"]["parts"][0]["text"]
                else:
                    print(f"Gemini API Error: {response.status_code} - {response.text}")
        except Exception as e:
            print(f"Gemini Generation Error: {e}")

    # Generate Image URL using Pollinations.ai (Free, no key needed)
    # We encode the description to be URL safe
    encoded_prompt = urllib.parse.quote(description)
    image_url = f"https://image.pollinations.ai/prompt/{encoded_prompt}"

    return GenerationResponse(
        url=image_url,
        description=description,
        year=year,
        lat=lat,
        lng=lng
    )
