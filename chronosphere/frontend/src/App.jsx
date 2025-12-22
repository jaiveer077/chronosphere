import React, { useState } from 'react';
import CesiumViewer from './components/Globe/CesiumViewer';
import TimeSelector from './components/UI/TimeSelector';
import InfoPanel from './components/UI/InfoPanel';
import { generateImage } from './services/api';

function App() {
    const [selectedYear, setSelectedYear] = useState(2024);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedImage, setGeneratedImage] = useState(null);

    const handleLocationSelect = (loc) => {
        setSelectedLocation(loc);
        setGeneratedImage(null); // Reset on new location
    };

    const handleGenerate = async () => {
        if (!selectedLocation) return;

        setIsGenerating(true);
        try {
            // Call the backend API
            const result = await generateImage(selectedLocation.lat, selectedLocation.lng, selectedYear);
            setGeneratedImage(result);
        } catch (error) {
            console.error("Generation failed:", error);
            alert("Failed to generate image. Check backend connection.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-black">
            <CesiumViewer onLocationSelect={handleLocationSelect} />

            <TimeSelector
                selectedYear={selectedYear}
                onYearChange={setSelectedYear}
            />

            <InfoPanel
                location={selectedLocation}
                year={selectedYear}
                onGenerate={handleGenerate}
                isGenerating={isGenerating}
                generatedImage={generatedImage}
            />

            {/* Background/Overlay Gradients for aesthetics */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0"></div>
        </div>
    );
}

export default App;
