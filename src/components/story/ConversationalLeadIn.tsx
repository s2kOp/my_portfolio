"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function ConversationalLeadIn() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Phases for text appearance - Compressed for 150vh
  // 0.0 - 0.15 : Beat 1
  // 0.2 - 0.35 : Beat 2
  // 0.4 - 0.55 : Beat 3
  // 0.6 - 0.85 : Beat 4 (Bridge)

  const beat1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15], [0, 1, 1]);
  const beat1Y = useTransform(scrollYProgress, [0, 0.1], [20, 0]);

  const beat2Opacity = useTransform(scrollYProgress, [0.2, 0.3, 0.35], [0, 1, 1]);
  const beat2Y = useTransform(scrollYProgress, [0.2, 0.3], [20, 0]);

  const beat3Opacity = useTransform(scrollYProgress, [0.4, 0.5, 0.55], [0, 1, 1]);
  const beat3Y = useTransform(scrollYProgress, [0.4, 0.5], [20, 0]);

  const beat4Opacity = useTransform(scrollYProgress, [0.6, 0.75, 0.85], [0, 1, 1]);
  const beat4Y = useTransform(scrollYProgress, [0.6, 0.75], [20, 0]);

  return (
    <section ref={containerRef} className="relative h-[150vh] bg-transparent">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="relative max-w-2xl px-8 flex flex-col items-center justify-center text-center gap-8 md:gap-12">
            
            {/* Beat 1 */}
            <motion.p 
                style={{ opacity: beat1Opacity, y: beat1Y }}
                className="text-2xl md:text-4xl text-zinc-200 font-medium"
            >
                Also, I touch grass. Regularly.
            </motion.p>

            {/* Beat 2 */}
            <motion.p 
                style={{ opacity: beat2Opacity, y: beat2Y }}
                className="text-xl md:text-3xl text-zinc-400 font-normal leading-relaxed"
            >
                Football, athletics, badminton, swimming — and the list goes on. <br/> (Not exaggerating.)
            </motion.p>

             {/* Beat 3 */}
             <motion.p 
                style={{ opacity: beat3Opacity, y: beat3Y }}
                className="text-xl md:text-3xl text-zinc-400 font-normal"
            >
                And long treks when I need a reset.
            </motion.p>

             {/* Beat 4 (Bridge) */}
             <motion.div 
                style={{ opacity: beat4Opacity, y: beat4Y }}
                className="pt-8"
            >
                <p className="text-xl md:text-3xl text-white font-semibold">
                    I didn’t keep receipts for all of it. <br/> But here’s a few…
                </p>
            </motion.div>

        </div>
      </div>
    </section>
  );
}
