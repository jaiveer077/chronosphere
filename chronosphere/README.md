# ChronoSphere – AI-powered Temporal Earth Visualization Platform

## 1. Project Overview
ChronoSphere is a web-based platform that allows users to explore the Earth in 3D and visualize how specific locations looked in the past or might look in the future. It leverages **CesiumJS** for high-fidelity geospatial rendering and generative AI (**Stable Diffusion** + **LLMs**) to synthesize historically grounded images based on location data, time period, and geographic context.

### Technical Justification
- **Frontend (React + Vite):** Chosen for high-performance Client-Side Rendering (CSR). CesiumJS is a heavy WebGL library; Server-Side Rendering (SSR) with Next.js often introduces complexity with `window` objects and WebGL contexts. Vite offers a lightning-fast dev server and optimized build for SPAs.
- **Backend (FastAPI):** Chosen over Node.js for its native support for asynchronous operations (critical for handling long-running AI API calls) and its seamless integration with the Python data/AI ecosystem. Pydantic models ensure strict API contracts.
- **Database (PostgreSQL + PostGIS):** Standard for geospatial data storage. Allows efficient querying of "nearby" previously generated images.
- **Caching (Redis):** Essential for caching expensive AI generation results and frequent API queries.

## 2. System Architecture

```mermaid
graph TD
    User[User Browser] -->|HTTPS| CDN[CDN / Static Assets]
    User -->|API Calls| API[FastAPI Backend]
    
    subgraph "Frontend (React + Vite)"
        Cesium[CesiumJS Viewer]
        UI[React UI Overlay]
        State[Zustand Store]
    end
    
    subgraph "Backend Infrastructure"
        API -->|Read/Write| DB[(PostgreSQL + PostGIS)]
        API -->|Cache Hit/Miss| Redis[(Redis Cache)]
        API -->|Queue Job| Worker[Background Worker (Optional for Scale)]
    end
    
    subgraph "AI Services Layer"
        API -->|Context Prompting| LLM[LLM Service (Gemini/GPT)]
        API -->|Image Gen| SD[Stable Diffusion API]
        LLM -->|Structured Prompt| SD
    end
    
    subgraph "External Data"
        Cesium -->|3D Tiles/Imagery| Ion[Cesium Ion]
    end
```

## 3. API Contracts

### `POST /api/v1/generate`
Triggers a new generation task.
**Request:**
```json
{
  "latitude": 48.8566,
  "longitude": 2.3522,
  "year": 1889,
  "prompt_modifier": "rainy day" // optional
}
```
**Response:**
```json
{
  "task_id": "uuid-string",
  "status": "processing",
  "estimated_time": 15
}
```

### `GET /api/v1/result/{task_id}`
Polls for the result of a generation task.
**Response:**
```json
{
  "status": "completed", // or "processing", "failed"
  "image_url": "https://storage.cloud.com/path/to/image.png",
  "description": "A view of Paris in 1889 showing the newly constructed Eiffel Tower...",
  "metadata": { ... }
}
```

### `GET /api/v1/history`
Fetches previously generated images near a location (for the map markers).
**Query Params:** `lat`, `lng`, `radius`
**Response:**
```json
[
  {
    "id": 1,
    "lat": 48.8566,
    "lng": 2.3522,
    "year": 1889,
    "thumbnail_url": "..."
  }
]
```

## 4. Manual Setup Steps (Required)
1.  **Cesium Ion Token:** You MUST sign up at [cesium.com](https://cesium.com/ion/) and get a default access token. Paste it in `frontend/.env`.
2.  **AI API Keys:** Get keys for OpenAI/Gemini and StabilityAI (or your preferred SD provider). Add to `backend/.env`.
3.  **Database:** Ensure Docker is running and start the stack with `docker-compose up -d`.
