"use client";

import { ReactNode } from "react";
import { SmoothScroll } from "@/components/core/SmoothScroll";
import { CursorProvider } from "@/components/providers/CursorProvider";
import { StoryProvider } from "@/components/providers/StoryProvider";
import { CursorTrail } from "@/components/ui/CursorTrail";

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps) {
  return (
    <SmoothScroll>
      <CursorProvider>
        <StoryProvider>
          {children}
          <CursorTrail />
        </StoryProvider>
      </CursorProvider>
    </SmoothScroll>
  );
}
