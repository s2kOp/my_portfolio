"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

// Video Assets to Preload
// Video Assets to Preload
// Video Assets to Preload
// Video Assets to Preload
// Video Assets to Preload
const ASSETS = [
  "https://res.cloudinary.com/do9gzgeyz/video/upload/v1768909723/diving1_uuho8x.mp4",        // Hero (diving1)
  "https://res.cloudinary.com/do9gzgeyz/video/upload/v1768909745/skillsmashup_xjqukz.mp4",  // Skills Intro
  "https://res.cloudinary.com/do9gzgeyz/video/upload/v1768909712/diving3_nshxg1.mp4",       // Skydiving/Skills (diving3)
  "https://res.cloudinary.com/do9gzgeyz/video/upload/v1768909716/kalari_gn1xzx.mov",        // Skills (kalari)
  "https://res.cloudinary.com/do9gzgeyz/video/upload/v1768909652/calisthenics_ulcjgm.mp4",  // Skills (calisthenics)
];

interface LoaderProps {
  onComplete: () => void;
}

export function Loader({ onComplete }: LoaderProps) {
  const [isFontsLoaded, setIsFontsLoaded] = useState(false);
  const [loadedCount, setLoadedCount] = useState(0);
  const [minTimePassed, setMinTimePassed] = useState(false);
  const isAllAssetsLoaded = loadedCount === ASSETS.length;

  // Lock Scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    // 1. Minimum Timer (Visual Pacing)
    const timer = setTimeout(() => setMinTimePassed(true), 2500);

    // 2. Font Loading
    document.fonts.ready.then(() => setIsFontsLoaded(true)).catch(() => setIsFontsLoaded(true));

    // Safety Timeout (Force proceed after 8s)
    const safety = setTimeout(() => {
        setIsFontsLoaded(true);
        setLoadedCount(ASSETS.length);
        setMinTimePassed(true);
    }, 8000);

    return () => {
        clearTimeout(timer);
        clearTimeout(safety);
    };
  }, []);

  // Completion Check
  useEffect(() => {
    if (isFontsLoaded && isAllAssetsLoaded && minTimePassed) {
        onComplete();
    }
  }, [isFontsLoaded, isAllAssetsLoaded, minTimePassed, onComplete]);

  const handleAssetLoad = () => {
      setLoadedCount(prev => Math.min(prev + 1, ASSETS.length));
  };

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden overscroll-none touch-none w-screen h-[100dvh]"
      exit={{ opacity: 0, transition: { duration: 1.2, ease: "easeInOut" } }}
    >
        {/* Hidden Preloaders */}
        <div className="hidden">
            {ASSETS.map((src, i) => (
                <video
                    key={i}
                    src={src}
                    preload="auto"
                    muted
                    onCanPlayThrough={handleAssetLoad}
                    onError={handleAssetLoad} // Proceed even if error to prevent blocking
                />
            ))}
        </div>

        {/* Visuals: Text Only */}
        <div className="relative flex flex-col items-center justify-center">
             {/* LOADING Text */}
             <motion.p 
                className="text-[#ccff00] font-bold tracking-[0.5em] text-sm animate-pulse"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
             >
                 LOADING
             </motion.p>
        </div>
    </motion.div>
  );
}
