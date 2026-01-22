import { ReactNode } from "react";

interface StoryLayerProps {
  children: ReactNode;
}

export function StoryLayer({ children }: StoryLayerProps) {
  return (
    <div className="relative z-10 w-full min-h-screen">
      {children}
    </div>
  );
}
