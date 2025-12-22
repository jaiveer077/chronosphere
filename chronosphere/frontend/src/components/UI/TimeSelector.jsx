import React, { useState } from 'react';
import { Calendar, Clock } from 'lucide-react';

const TimeSelector = ({ selectedYear, onYearChange }) => {
    return (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/70 backdrop-blur-md p-4 rounded-xl border border-white/20 z-10 flex items-center gap-4 text-white">
            <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="font-mono text-sm uppercase tracking-wider">Temporal Anchor</span>
            </div>

            <div className="h-8 w-[1px] bg-white/20"></div>

            <div className="flex items-center gap-2">
                <input
                    type="range"
                    min="1000"
                    max="2100"
                    value={selectedYear}
                    onChange={(e) => onYearChange(parseInt(e.target.value))}
                    className="w-64 accent-blue-500"
                />
                <span className="text-2xl font-bold font-mono text-blue-400 min-w-[80px]">
                    {selectedYear}
                </span>
            </div>
        </div>
    );
};

export default TimeSelector;
