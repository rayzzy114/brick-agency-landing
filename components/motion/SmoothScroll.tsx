"use client";

import { useSyncExternalStore } from "react";
import { ReactLenis } from "lenis/react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribe(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reducedMotion = useSyncExternalStore(subscribe, getSnapshot, () => false);

  if (reducedMotion) return <>{children}</>;

  return (
    <ReactLenis root options={{ lerp: 0.1 }}>
      {children}
    </ReactLenis>
  );
}
