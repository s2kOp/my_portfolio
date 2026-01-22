"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ConversationalBio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Animation Ranges (Compressed for 250vh height) ---
  const beat1Raw = useTransform(scrollYProgress, [0.02, 0.15], [0, 1]);
  const beat1Y = useTransform(scrollYProgress, [0.02, 0.15], [20, 0]);

  const beat2Raw = useTransform(scrollYProgress, [0.12, 0.25], [0, 1]);
  const beat2Y = useTransform(scrollYProgress, [0.12, 0.25], [30, 0]); 

  const beat3Raw = useTransform(scrollYProgress, [0.22, 0.35], [0, 1]);
  const beat3X = useTransform(scrollYProgress, [0.22, 0.35], [-20, 0]); 

  const beat4Raw = useTransform(scrollYProgress, [0.35, 0.48], [0, 1]);
  
  const beat5Raw = useTransform(scrollYProgress, [0.45, 0.60], [0, 1]);
  
  const beat6Raw = useTransform(scrollYProgress, [0.60, 0.80], [0, 1]); // Resume
  
  // Fade to black at the very end
  const endBlackout = useTransform(scrollYProgress, [0.95, 1], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 md:p-20 z-30">
        
        {/* COMPACT GAP SPACING so it won't overflow screen */}
        <div className="max-w-4xl w-full flex flex-col gap-6 md:gap-8 relative z-10">

            {/* --- BEAT 1: INTRO --- */}
            <motion.div style={{ opacity: beat1Raw, y: beat1Y }} className="flex flex-col gap-2">
                <p className="text-lg md:text-2xl text-gray-400 font-light">
                    Since you're here..
                </p>
            </motion.div>

            {/* --- BEAT 2: ACADEMIC --- */}
            <motion.div 
                style={{ opacity: beat2Raw, y: beat2Y }} 
                className="flex flex-col gap-1 md:gap-2 self-end text-right"
            >
                <p className="text-xl md:text-4xl text-white font-medium neon-text">
                    I'm Rohit,
                </p>
                <p className="text-base md:text-xl text-gray-400">
                    Final year <span className="text-[#ccff00]">AIML</span> student at <span className="text-white">SCTCE</span>.
                </p>
            </motion.div>

            {/* --- BEAT 3: ROLES (The Ladder) --- */}
             <motion.div 
                style={{ opacity: beat3Raw, x: beat3X }} 
                className="flex flex-col items-center justify-end h-[160px] md:h-[180px]" 
            >
               {/* Top: Junior Associate */}
               <motion.div 
                  style={{ opacity: useTransform(scrollYProgress, [0.30, 0.32], [0, 1]) }}
                  className="mb-2 text-center"
               >
                   <p className="text-xl md:text-3xl font-bold text-white">
                      Junior Associate <span className="text-sm text-gray-500 font-normal block md:inline">(since Jan 2026)</span>
                   </p>
               </motion.div>

               {/* Ladder Line: Grows from Height 0 to 60px */}
               <motion.div 
                   style={{ height: useTransform(scrollYProgress, [0.25, 0.30], ["0px", "60px"]) }}
                   className="w-[2px] bg-[#ccff00] shadow-[0_0_10px_#ccff00]"
               />

               {/* Bottom: IG Lead */}
               <div className="mt-2 text-center">
                  <p className="text-xl md:text-3xl font-bold text-white">
                      IG LEAD <span className="text-sm text-gray-500 font-normal block md:inline">(since Aug 2025)</span>
                  </p>
                  <p className="text-[#ccff00] text-sm tracking-widest mt-1">AT MULEARN</p>
               </div>
            </motion.div>

             {/* --- BEAT 4: PERSONALITY --- */}
             <motion.div 
                style={{ opacity: beat4Raw }} 
                className="self-center text-center flex flex-col gap-2 mt-4"
            >
                 <p className="text-2xl md:text-4xl text-white">
                     I like building things.
                 </p>
                 <p className="text-xl md:text-3xl text-gray-400">
                     I like being outdoors just as much.
                 </p>
                 <span className="text-sm md:text-base text-gray-600 uppercase tracking-widest mt-2">
                     Sitting still isn’t really my thing.
                 </span>
            </motion.div>

            {/* --- BEAT 5: HUMOR --- */}
            <motion.div 
                style={{ opacity: beat5Raw }} 
                className="flex flex-col gap-2 md:pl-20 border-l-2 border-[#333] pl-6 mt-4"
            >
                 <p className="text-xl md:text-3xl text-white italic">
                     “I usually learn by doing.”
                 </p>
                 <p className="text-lg md:text-2xl text-gray-500">
                     Sometimes by breaking things first.
                 </p>
            </motion.div>

            {/* --- BEAT 6: RESUME CTA --- */}
            <motion.div 
                style={{ opacity: beat6Raw }} 
                className="relative mt-12 md:mt-0 md:absolute self-end md:bottom-0 md:right-0 z-50 text-right"
            >
                <div className="flex flex-col items-end gap-2">
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">
                        Paper evidence helps sometimes
                    </p>
                    <a 
                        href="https://ik.imagekit.io/s2kOp/Rohit_R_Nair_January_2026.pdf"
                        download 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 text-white hover:text-[#ccff00] transition-colors cursor-pointer"
                    >
                        <span className="text-lg font-bold">VIEW RESUME</span>
                        <span className="block h-[2px] w-8 bg-current group-hover:w-12 transition-all" />
                    </a>
                </div>
            </motion.div>

        </div>

        {/* --- END BLACKOUT OVERLAY --- */}
        <motion.div 
            style={{ opacity: endBlackout }}
            className="absolute inset-0 bg-black z-[100] pointer-events-none"
        />

      </div>
    </section>
  );
}
