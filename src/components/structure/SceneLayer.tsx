import { ReactNode } from "react";

interface SceneLayerProps {
  children: ReactNode;
}

export function SceneLayer({ children }: SceneLayerProps) {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      {children}
    </div>
  );
}
