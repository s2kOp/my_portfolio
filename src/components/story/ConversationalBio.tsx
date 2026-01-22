"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ConversationalBio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Animation Logic (Preserved but adapted) ---
  const beat1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.2], [0, 1, 0]);
  const beat2Opacity = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);
  const beat3Opacity = useTransform(scrollYProgress, [0.3, 0.4, 0.5], [0, 1, 0]);
  const beat4Opacity = useTransform(scrollYProgress, [0.45, 0.55, 0.65], [0, 1, 0]);
  const beat5Opacity = useTransform(scrollYProgress, [0.6, 0.7, 0.8], [0, 1, 0]);
  const beat6Opacity = useTransform(scrollYProgress, [0.75, 0.85, 1], [0, 1, 1]); // Stays visible
  
  const endBlackout = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative bg-transparent">
        
        {/* WE USE A SERIES OF STICKY LAYERS OR JUST SPACED CONTENT */}
        {/* Actually, let's stick to the sticky container but purely center EVERYTHING absolutely */}
        {/* And assume scroll drives the opacity cross-fades */}
        
        <div className="h-[500vh] relative">
            <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
                
                {/* GLOBAL BLACKOUT OVERLAY */}
                <motion.div 
                    style={{ opacity: endBlackout }}
                    className="absolute inset-0 bg-black z-[100] pointer-events-none"
                />

                <div className="relative w-full max-w-5xl px-6 md:px-12 flex items-center justify-center">

                    {/* --- BEAT 1: INTRO --- */}
                    <motion.div 
                        style={{ opacity: beat1Opacity }} 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                         <p className="text-2xl md:text-5xl text-gray-400 font-light text-center">
                            Since you're here..
                        </p>
                    </motion.div>

                    {/* --- BEAT 2: ACADEMIC --- */}
                    <motion.div 
                        style={{ opacity: beat2Opacity }} 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center gap-4"
                    >
                         <p className="text-4xl md:text-7xl text-white font-medium neon-text tracking-tight">
                            I'm Rohit
                        </p>
                        <p className="text-xl md:text-3xl text-gray-400 max-w-2xl">
                            Final year <span className="text-[#ccff00]">AIML</span> student at <span className="text-white">SCTCE</span>.
                        </p>
                    </motion.div>

                    {/* --- BEAT 3: ROLES --- */}
                    <motion.div 
                        style={{ opacity: beat3Opacity }} 
                        className="absolute inset-0 flex flex-col items-center justify-center gap-8"
                    >
                         <div className="text-center">
                            <p className="text-2xl md:text-4xl font-bold text-white">
                                Junior Associate
                            </p>
                            <p className="text-sm text-gray-500 mt-1">SINCE JAN 2026</p>
                         </div>
                         <div className="h-20 w-[2px] bg-[#ccff00] shadow-[0_0_15px_#ccff00]" />
                         <div className="text-center">
                            <p className="text-2xl md:text-4xl font-bold text-white">
                                IG LEAD
                            </p>
                            <p className="text-[#ccff00] tracking-widest text-sm mt-1">AT MULEARN</p>
                         </div>
                    </motion.div>

                    {/* --- BEAT 4: BUILDING --- */}
                    <motion.div 
                        style={{ opacity: beat4Opacity }} 
                        className="absolute inset-0 flex flex-col items-center justify-center text-center gap-6"
                    >
                         <p className="text-3xl md:text-6xl text-white font-bold">
                             I like building things.
                         </p>
                         <p className="text-2xl md:text-4xl text-gray-400">
                             I like being outdoors just as much.
                         </p>
                    </motion.div>

                     {/* --- BEAT 5: LEARNING --- */}
                     <motion.div 
                        style={{ opacity: beat5Opacity }} 
                        className="absolute inset-0 flex items-center justify-center text-center px-4"
                    >
                        <div className="border-l-4 border-[#ccff00] pl-6 md:pl-12 text-left max-w-3xl">
                             <p className="text-3xl md:text-5xl text-white italic leading-tight">
                                “I usually learn by doing.”
                            </p>
                            <p className="text-xl md:text-3xl text-gray-500 mt-4">
                                Sometimes by breaking things first.
                            </p>
                        </div>
                    </motion.div>

                    {/* --- BEAT 6: RESUME --- */}
                    <motion.div 
                        style={{ opacity: beat6Opacity }} 
                        className="absolute inset-0 flex items-center justify-center"
                    >
                         <div className="flex flex-col items-center gap-4">
                            <p className="text-sm text-gray-500 uppercase tracking-widest">
                                Paper evidence helps sometimes
                            </p>
                             <a 
                                href="https://ik.imagekit.io/s2kOp/Rohit_R_Nair_January_2026.pdf"
                                download 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="px-8 py-4 border border-[#ccff00] text-[#ccff00] hover:bg-[#ccff00] hover:text-black transition-all duration-300 text-xl font-bold tracking-wider"
                            >
                                VIEW RESUME
                            </a>
                        </div>
                    </motion.div>

                </div>
            </div>
        </div>
    </section>
  );
}
