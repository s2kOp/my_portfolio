"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ConversationalBio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // --- Scroll Progress Mapping for Beats ---
  // We divide the long scroll into segments for each beat.
  // Total Beats: 6
  // Range: 0 to 1
  
  // Helper to create fade in/stay/fade out (optional) or just fade in and stay.
  // The request says "Stays on screen as the next beat appears".
  // So we just need to fade them IN at specific points.

  const beat1Raw = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const beat1Y = useTransform(scrollYProgress, [0.05, 0.15], [20, 0]);

  const beat2Raw = useTransform(scrollYProgress, [0.20, 0.30], [0, 1]);
  const beat2Y = useTransform(scrollYProgress, [0.20, 0.30], [30, 0]); // From slightly lower

  const beat3Raw = useTransform(scrollYProgress, [0.35, 0.45], [0, 1]);
  const beat3X = useTransform(scrollYProgress, [0.35, 0.45], [-20, 0]); // From left

  const beat4Raw = useTransform(scrollYProgress, [0.50, 0.60], [0, 1]);
  
  const beat5Raw = useTransform(scrollYProgress, [0.65, 0.75], [0, 1]);
  
  const beat6Raw = useTransform(scrollYProgress, [0.80, 0.90], [0, 1]); // Resume

  // Fade to black at the very end to overlay the text before next section
  const endBlackout = useTransform(scrollYProgress, [0.92, 0.98], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center p-4 md:p-20 overflow-hidden">
        
        <div className="max-w-4xl w-full flex flex-col gap-8 md:gap-24 relative z-10">

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
                className="flex flex-col items-center justify-end h-[200px]" // Fixed height container for stability
            >
               {/* Top: Junior Associate */}
               <motion.div 
                  style={{ opacity: useTransform(scrollYProgress, [0.44, 0.45], [0, 1]) }}
                  className="mb-2 text-center"
               >
                   <p className="text-xl md:text-3xl font-bold text-white">
                      Junior Associate <span className="text-sm text-gray-500 font-normal block md:inline">(since Jan 2026)</span>
                   </p>
               </motion.div>

               {/* Ladder Line: Grows from Height 0 to 80px */}
               <motion.div 
                   style={{ height: useTransform(scrollYProgress, [0.40, 0.44], ["0px", "80px"]) }}
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
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none mix-blend-overlay"
            >
                {/* This one is more background/atmospheric or just centered big text */}
            </motion.div>
             <motion.div 
                style={{ opacity: beat4Raw }} 
                className="self-center text-center flex flex-col gap-2"
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
                className="flex flex-col gap-2 md:pl-20 border-l-2 border-[#333] pl-6"
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
                className="relative mt-8 md:mt-0 md:absolute self-end md:bottom-20 md:right-20 z-50 text-right"
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

            {/* --- END BLACKOUT OVERLAY REMOVED FROM HERE --- */}

        </div>

        {/* --- END BLACKOUT OVERLAY --- */}
        {/* Placed outside the max-w-4xl container to cover the entire screen */}
        <motion.div 
            style={{ opacity: endBlackout }}
            className="absolute inset-0 bg-black z-[100] pointer-events-none"
        />

      </div>
    </section>
  );
}
