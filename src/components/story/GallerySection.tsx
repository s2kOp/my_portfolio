"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import { useState, useEffect } from "react";

const CARDS = [
  { id: "trek", title: "TREK", media: "https://ik.imagekit.io/s2kOp/trek.jpg?updatedAt=1769090420977"},
  { id: "football", title: "FOOTBALL", media: "https://ik.imagekit.io/s2kOp/football.jpg?updatedAt=1769090468967" },
  { id: "athletics", title: "ATHLETICS", media: "https://ik.imagekit.io/s2kOp/athletics.jpg?updatedAt=1769090436756"},
  { id: "events", title: "EVENTS", media: "https://ik.imagekit.io/s2kOp/events.jpg?updatedAt=1769090452180"},
];

export function GallerySection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Simple check for mobile on mount/resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile(); // initial
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full pt-10 pb-40 bg-transparent overflow-hidden flex flex-col items-center justify-center min-h-[80vh]">
      

      <div className="relative h-[500px] w-full max-w-6xl flex items-center justify-center">
        {CARDS.map((card, index) => {
           // Calculate fan spread
           const total = CARDS.length;
           const centerInfo = (total - 1) / 2;
           const offset = index - centerInfo; 
           
           // Responsive values
           const rotation = offset * (isMobile ? 8 : 12); // Slightly less rotation on mobile
           const spreadFactor = isMobile ? 40 : 120; // Much tighter spread on mobile
           const xOffset = offset * spreadFactor; 
           
           const isHovered = hoveredIndex === index;
           const isAnyHovered = hoveredIndex !== null;

           return (
              <motion.div
                key={card.id}
                className={clsx(
                    "absolute w-[260px] md:w-[320px] aspect-[2/3] rounded-2xl shadow-2xl border border-zinc-800 bg-zinc-900 overflow-hidden cursor-pointer transition-all duration-500 ease-out origin-bottom",
                    isHovered ? "z-50 border-[#ccff00]" : "z-10 hover:border-zinc-600"
                )}
                style={{
                    // Base positioning
                    left: "50%",
                    x: "-50%", // Center the element itself
                }}
                initial={{ 
                    x: `calc(-50% + ${xOffset}px)`, 
                    rotate: rotation,
                    y: Math.abs(offset) * 20 
                }}
                animate={{
                    x: isHovered ? `calc(-50% + ${xOffset * (isMobile ? 1.2 : 1.5)}px)` : `calc(-50% + ${xOffset}px)`, // Keep spread consistent or slightly wider on hover
                    rotate: isHovered ? 0 : rotation, // Straighten on hover
                    y: isHovered ? -100 : Math.abs(offset) * 30, // Lift up on hover, arch down normally
                    scale: isHovered ? 1.15 : 1,
                    filter: isAnyHovered && !isHovered ? "blur(3px) brightness(0.4)" : "none" // Focus effect
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                  {/* Media */}
                  <div className="absolute inset-0 w-full h-full">
                            <img 
                                src={card.media} 
                                alt={card.title}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100"
                            />
                        
                  </div>
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60" />

                  {/* Title */}
                  <div className="absolute bottom-6 left-6 right-6">
                      <h3 className={clsx(
                          "text-2xl font-black italic tracking-tighter text-white transition-colors uppercase",
                          isHovered ? "text-[#ccff00]" : "text-zinc-400"
                      )}>
                          {card.title}
                      </h3>
                  </div>

              </motion.div>
           );
        })}
      </div>

    </section>
  );
}
// Removed single GalleryCard component in favor of the fan loop logic above
