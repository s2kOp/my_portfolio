"use client";

import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

export type StoryPhase = "ADRENALINE" | "IMPACT" | "ASCENSION";

interface StoryContextType {
  scrollProgress: number;
  phase: StoryPhase;
}

const StoryContext = createContext<StoryContextType | null>(null);

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
}

interface StoryProviderProps {
  children: ReactNode;
}

export function StoryProvider({ children }: StoryProviderProps) {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<StoryPhase>("ADRENALINE");

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setProgress(latest);

    if (latest < 0.4) {
      setPhase("ADRENALINE");
    } else if (latest < 0.7) {
      setPhase("IMPACT");
    } else {
      setPhase("ASCENSION");
    }
  });

  return (
    <StoryContext.Provider value={{ scrollProgress: progress, phase }}>
      {children}
    </StoryContext.Provider>
  );
}
