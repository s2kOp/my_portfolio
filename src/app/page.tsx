"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { SceneLayer } from "@/components/structure/SceneLayer";
import { StoryLayer } from "@/components/structure/StoryLayer";
import { StoryView } from "@/components/story/StoryView";
import { LivingBackground } from "@/components/scene/LivingBackground";
import { Loader } from "@/components/ui/Loader";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <main className="bg-black min-h-screen">
      <AnimatePresence>
        {isLoading && <Loader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      <SceneLayer>
        <LivingBackground />
      </SceneLayer>
      
      <StoryLayer>
        <StoryView />
      </StoryLayer>
    </main>
  );
}
