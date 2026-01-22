"use client";

import { createContext, ReactNode, useEffect } from "react";
import { useMotionValue, useSpring, MotionValue } from "framer-motion";

interface CursorContextType {
  x: MotionValue<number>;
  y: MotionValue<number>;
  active: boolean; // Tracks if cursor is in window
}

export const CursorContext = createContext<CursorContextType | null>(null);

interface CursorProviderProps {
  children: ReactNode;
}

export function CursorProvider({ children }: CursorProviderProps) {
  // Raw mouse position (normalized -1 to 1)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth physics-based position
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      // Normalize to -1 to 1
      const normalizedX = (clientX / innerWidth) * 2 - 1;
      const normalizedY = (clientY / innerHeight) * 2 - 1;

      mouseX.set(normalizedX);
      mouseY.set(normalizedY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <CursorContext.Provider value={{ x: smoothX, y: smoothY, active: true }}>
      {children}
    </CursorContext.Provider>
  );
}
