import React from 'react';
import { Loader2 } from 'lucide-react';
const InfoPanel = ({ location, year, onGenerate, isGenerating, generatedImage }) => {
    if (!location) return null;
    return (
        <div className="m-4 w-96 bg-black/80 backdrop-blur-lg border border-white/10 rounded-xl p-6 text-white z-10 shadow-2xl">
            <h2 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                Coordinates Locked
            </h2>
            <div className="grid grid-cols-2 gap-4 mb-6 text-sm text-gray-300 font-mono">
                <div>
                    <span className="block text-gray-500 text-xs">LATITUDE</span>
                    {location.lat.toFixed(4)}
                </div>
                <div>
                    <span className="block text-gray-500 text-xs">LONGITUDE</span>
                    {location.lng.toFixed(4)}
                </div>
                <div className="col-span-2">
                    <span className="block text-gray-500 text-xs">TARGET ERA</span>
                    <span className="text-lg text-white">{year}</span>
                </div>
            </div>
            {generatedImage ? (
                <div className="mb-4 animate-in fade-in duration-500">
                    <img
                        src={generatedImage.url}
                        alt="Generated History"
                        className="w-full h-48 object-cover rounded-lg border border-white/20 mb-2"
                    />
                    <p className="text-xs text-gray-400 italic">
                        "{generatedImage.description}"
                    </p>
                </div>
            ) : (
                <div className="h-48 border-2 border-dashed border-white/10 rounded-lg flex items-center justify-center mb-4 text-gray-500 text-sm">
                    Select location & time to visualize
                </div>
            )}
            <button
                onClick={onGenerate}
                disabled={isGenerating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
            >
                {isGenerating ? (
                    <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Reconstructing Timeline...
                    </>
                ) : (
                    "Generate Visualization"
                )}
            </button>
        </div>
    );
};
export default InfoPanel;