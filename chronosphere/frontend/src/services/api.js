import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001/api/v1';


export const generateImage = async (lat, lng, year) => {
    // In a real app, this would likely be a 2-step process:
    // 1. POST /generate -> returns task_id
    // 2. Poll GET /result/{task_id}
    // For MVP simplicity, we'll assume the backend waits (or we use a simple await here)

    const response = await axios.post(`${API_BASE_URL}/generate`, {
        latitude: lat,
        longitude: lng,
        year: year
    });

    return response.data;
};
