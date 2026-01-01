import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import CesiumViewer from './components/Globe/CesiumViewer';
import TimeSelector from './components/UI/TimeSelector';
import InfoPanel from './components/UI/InfoPanel';
import WelcomeScreen from './components/UI/WelcomeScreen';
import { generateImage } from './services/api';

function App() {
    const [showWelcome, setShowWelcome] = useState(true);
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
            <AnimatePresence mode="wait">
                {showWelcome && (
                    <WelcomeScreen onStart={() => setShowWelcome(false)} />
                )}
            </AnimatePresence>

            {/* Main App Content - Always mounted to load Cesium, but fades in */}
            <motion.div
                className="absolute inset-0 w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: !showWelcome ? 1 : 0 }}
                transition={{ duration: 1.5, delay: 0.5 }}
            >
                <CesiumViewer onLocationSelect={handleLocationSelect} />

                {/* UI Elements slide in */}
                <AnimatePresence>
                    {!showWelcome && (
                        <>
                            <motion.div
                                initial={{ y: 100, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
                            >
                                <TimeSelector
                                    selectedYear={selectedYear}
                                    onYearChange={setSelectedYear}
                                />
                            </motion.div>

                            <motion.div
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                                className="absolute top-0 right-0 h-full z-20 pointer-events-none"
                            >
                                {/* InfoPanel wrapper to handle positioning if needed, 
                                    though InfoPanel likely has its own positioning. 
                                    Let's check InfoPanel styles or wrap it properly. 
                                    Assuming InfoPanel is fixed/absolute, we might need to adjust it 
                                    or wrap it in a relative container that matches its expected position.
                                */}
                                <div className="pointer-events-auto h-full">
                                    <InfoPanel
                                        location={selectedLocation}
                                        year={selectedYear}
                                        onGenerate={handleGenerate}
                                        isGenerating={isGenerating}
                                        generatedImage={generatedImage}
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Background/Overlay Gradients for aesthetics */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-0"></div>
            </motion.div>
        </div>
    );
}

export default App;
