"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Generate random lines
const generateLines = (count: number) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: i,
    top: Math.random() * 100, // %
    left: Math.random() * 100, // %
    width: Math.random() * 20 + 5, // % length
    height: Math.random() * 0.2 + 0.1, // px thickness (horizontal) or vice versa
    isVertical: Math.random() > 0.8, // Mostly horizontal glitches
    delay: Math.random() * 5,
    duration: Math.random() * 0.5 + 0.1,
  }));
};

export function NeonChaos() {
  const [lines, setLines] = useState<any[]>([]);

  useEffect(() => {
    setLines(generateLines(15));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none mix-blend-screen">
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className="absolute bg-[#ccff00]"
          style={{
            top: `${line.top}%`,
            left: `${line.left}%`,
            width: line.isVertical ? "1px" : `${line.width}%`,
            height: line.isVertical ? `${line.width}%` : "1px",
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 0],
            x: line.isVertical ? 0 : [-50, 50], // Horizontal drift
            y: line.isVertical ? [-50, 50] : 0, // Vertical drift
          }}
          transition={{
            duration: line.duration,
            repeat: Infinity,
            repeatDelay: Math.random() * 3 + 1, // Random intervals
            delay: line.delay,
            ease: "easeInOut",
          }}
        />
      ))}
      
      {/* Occasional Full-Screen Glitch Overlay */}
      <motion.div 
         className="absolute inset-0 bg-[#ccff00]/5 pointer-events-none"
         animate={{ opacity: [0, 0, 0, 0.1, 0] }}
         transition={{ duration: 10, repeat: Infinity, times: [0, 0.9, 0.92, 0.95, 1] }}
      />
    </div>
  );
}
