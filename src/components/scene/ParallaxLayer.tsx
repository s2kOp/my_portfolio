"use client";

import { motion, useTransform, MotionValue } from "framer-motion";
import { useCursor } from "@/hooks/use-cursor";
import { ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  sensitivity?: number; // Max pixel offset (e.g., 50 means -50 to 50)
  inverse?: boolean; // If true, moves opposite to cursor (standard for depth)
  className?: string; // Allow passing styling/positioning classes
}

export function ParallaxLayer({ 
  children, 
  sensitivity = 20, 
  inverse = true,
  className = ""
}: ParallaxLayerProps) {
  const { x, y } = useCursor();
  
  // Map normalized input (-1 to 1) to offset pixels
  const outputRange = inverse ? [-sensitivity, sensitivity] : [sensitivity, -sensitivity];
  
  const xOffset = useTransform(x, [-1, 1], outputRange);
  const yOffset = useTransform(y, [-1, 1], outputRange);

  return (
    <motion.div style={{ x: xOffset, y: yOffset }} className={className}>
      {children}
    </motion.div>
  );
}
