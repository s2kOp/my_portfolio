"use client";

import { useEffect, useRef } from "react";
import { createNoise3D } from "simplex-noise";

interface Props {
  className?: string;
  opacity?: number;
  primaryColor?: string;
  secondaryColor?: string;
}

export function HypnoticCircles({ 
  className = "", 
  opacity = 0.3, 
  primaryColor = "#ccff00", 
  secondaryColor = "#ffffff" 
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let animationId: number;
    let time = 0;
    
    // Initialize Noise
    const noise3D = createNoise3D();

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const centerX = width / 2;
      const centerY = height / 2;
      const maxRadius = Math.max(width, height) * 0.8;
      
      // Draw concentric topographic lines
      // We draw ~15 rings
      for (let i = 0; i < 15; i++) {
        const radiusBase = (i + 1) * (maxRadius / 12);
        
        ctx.beginPath();
        const segments = 100; // Resolution of the circle
        
        for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2;
            
            // Noise parameters
            // x, y mapped from angle
            const xOff = Math.cos(angle) * 1.5; // Noise freq
            const yOff = Math.sin(angle) * 1.5;
            
            // Wobble calculation varies by ring index (i) and time
            const noiseVal = noise3D(xOff, yOff, time * 0.05 + i * 0.1);
            
            // Distortion amount increases with radius
            const distortion = noiseVal * 40 * (1 + i * 0.1);
            
            const r = radiusBase + distortion;
            const px = centerX + Math.cos(angle) * r;
            const py = centerY + Math.sin(angle) * r;
            
            if (j === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        
        ctx.closePath();
        
        // Alternating styles with dynamic colors
        ctx.lineWidth = 1.5;
        if (i % 3 === 0) {
             ctx.globalAlpha = opacity;
             ctx.strokeStyle = primaryColor;
        } else {
             ctx.globalAlpha = opacity * 0.3;
             ctx.strokeStyle = secondaryColor;
        }
        ctx.stroke();
        ctx.globalAlpha = 1; // Reset alpha
      }

      time += 0.005; // Slow organic flow
      animationId = requestAnimationFrame(draw);
    };

    window.addEventListener("resize", resize);
    resize();
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationId);
    };
  }, [opacity, primaryColor, secondaryColor]);

  return <canvas ref={canvasRef} className={`block ${className}`} />;
}
