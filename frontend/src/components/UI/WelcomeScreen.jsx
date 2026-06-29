import React from 'react';
import { motion } from 'framer-motion';

const WelcomeScreen = ({ onStart }) => {
    return (
        <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1.5, ease: "easeInOut" } }}
        >
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/40 via-black to-black" />

            {/* Animated Rings/Orbits */}
            <motion.div
                className="absolute w-[50vw] h-[50vw] min-w-[600px] min-h-[600px] border border-blue-500/10 rounded-full"
                animate={{ rotate: 360, scale: [1, 1.05, 1] }}
                transition={{
                    rotate: { duration: 60, repeat: Infinity, ease: "linear" },
                    scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
            />
            <motion.div
                className="absolute w-[35vw] h-[35vw] min-w-[400px] min-h-[400px] border border-purple-500/10 rounded-full border-dashed"
                animate={{ rotate: -360 }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            />

            {/* Floating Particles (Simulated with divs) */}
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full"
                    initial={{
                        x: Math.random() * window.innerWidth,
                        y: Math.random() * window.innerHeight,
                        opacity: Math.random()
                    }}
                    animate={{
                        y: [null, Math.random() * -100],
                        opacity: [null, 0]
                    }}
                    transition={{
                        duration: Math.random() * 5 + 5,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}

            {/* Main Content */}
            <div className="relative z-10 text-center space-y-12">
                <div className="overflow-hidden">
                    <motion.h1
                        className="text-6xl md:text-9xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-purple-300 to-blue-300 drop-shadow-[0_0_30px_rgba(59,130,246,0.5)]"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        CHRONOSPHERE
                    </motion.h1>
                </div>

                <motion.p
                    className="text-xl md:text-2xl text-blue-200/60 tracking-[0.5em] uppercase font-light"
                    initial={{ opacity: 0, letterSpacing: "0em" }}
                    animate={{ opacity: 1, letterSpacing: "0.5em" }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                >
                    Explore Time & Space
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1.8 }}
                >
                    <button
                        onClick={onStart}
                        className="group relative px-12 py-4 bg-transparent overflow-hidden rounded-full cursor-pointer"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-600 to-purple-600 opacity-20 group-hover:opacity-40 transition-opacity duration-500 blur-md" />
                        <div className="absolute inset-0 w-full h-full border border-blue-500/30 rounded-full group-hover:border-blue-400/80 transition-colors duration-500" />
                        <span className="relative text-lg font-medium tracking-widest text-blue-100 group-hover:text-white transition-colors flex items-center gap-3">
                            INITIALIZE SYSTEM
                            <motion.span
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                →
                            </motion.span>
                        </span>
                    </button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default WelcomeScreen;
