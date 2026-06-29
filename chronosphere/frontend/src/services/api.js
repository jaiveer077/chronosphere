import axios from 'axios';

let baseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
if (baseUrl.endsWith('/')) {
    baseUrl = baseUrl.slice(0, -1);
}
if (!baseUrl.endsWith('/api/v1')) {
    baseUrl = `${baseUrl}/api/v1`;
}
const API_BASE_URL = baseUrl;


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
