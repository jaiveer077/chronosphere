import React from 'react'
import ReactDOM from 'react-dom/client'
import { Ion } from 'cesium'
import App from './App.jsx'
import './styles/index.css'

// Set the Cesium Ion Token globally
if (import.meta.env.VITE_CESIUM_ION_TOKEN) {
    Ion.defaultAccessToken = import.meta.env.VITE_CESIUM_ION_TOKEN;
} else {
    console.warn("Cesium Ion Token is missing! Maps may not load correctly.");
}

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
