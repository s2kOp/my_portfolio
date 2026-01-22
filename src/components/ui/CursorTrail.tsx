"use client";

import { useEffect, useRef } from "react";

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<{ x: number; y: number; age: number }[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle resize
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Init

    // Track mouse
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation Loop
    let animationFrameId: number;
    
    // Config
    const TRAIL_LENGTH = 20; // Number of points
    const MAX_AGE = 15; // Frames a point survives
    
    const render = () => {
      // Fade out effect
      ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear instead of fade rect for transparency support

      // Add new point at current mouse position
      // Only add if moved significantly or just push every frame for time-based trail?
      // Pushing every frame creates a "time" trail even when stationary (dots update).
      // For "laggy line", we prefer distance checks or just unshift every frame.
      
      pointsRef.current.push({ ...mouseRef.current, age: 0 });

      // Prune
      if (pointsRef.current.length > TRAIL_LENGTH) {
        pointsRef.current.shift();
      }

      // Draw
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      
      // We can draw segments with varying opacity
      // But a single polyline is smoother. 
      // To fade the tail, we might need segments.
      
      if (pointsRef.current.length > 1) {
          ctx.beginPath();
          
          // Move to oldest point
          ctx.moveTo(pointsRef.current[0].x, pointsRef.current[0].y);

          // Quadratic curve through points
          for (let i = 1; i < pointsRef.current.length - 1; i++) {
              const p1 = pointsRef.current[i];
              const p2 = pointsRef.current[i + 1];
              // Midpoint for quadratic bezier
              const xc = (p1.x + p2.x) / 2;
              const yc = (p1.y + p2.y) / 2;
              ctx.quadraticCurveTo(p1.x, p1.y, xc, yc);
          }
          
          // Connect to last
          const last = pointsRef.current[pointsRef.current.length - 1];
          ctx.lineTo(last.x, last.y);

          // Styling
          ctx.strokeStyle = "#ccff00"; // Neon Green
          ctx.lineWidth = 2;
          ctx.shadowBlur = 10;
          ctx.shadowColor = "#ccff00";
          ctx.globalAlpha = 0.8; // Base opacity
          
          ctx.stroke();
          
          // Reset alpha
          ctx.globalAlpha = 1;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
