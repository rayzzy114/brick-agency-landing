"use client";

import { createContext, useContext, useSyncExternalStore } from "react";
import { MotionConfig } from "motion/react";
import { SmoothScroll } from "./SmoothScroll";

/** true = animations disabled (heatmap-verification kill-switch: ?noanim=1). */
const AnimDisabledContext = createContext(false);

export function useAnimDisabled() {
  return useContext(AnimDisabledContext);
}

/* ?noanim=1 читается на клиенте (static export не даёт searchParams на сервере);
   useSyncExternalStore: SSR/гидрация = false, сразу после гидрации = из URL. */
function subscribeNoop() {
  return () => {};
}
function readNoanim() {
  return new URLSearchParams(window.location.search).has("noanim");
}

export function MotionProvider({
  disabled = false,
  children,
}: {
  disabled?: boolean;
  children: React.ReactNode;
}) {
  const urlDisabled = useSyncExternalStore(
    subscribeNoop,
    readNoanim,
    () => false,
  );
  const isDisabled = disabled || urlDisabled;

  return (
    <AnimDisabledContext.Provider value={isDisabled}>
      <MotionConfig reducedMotion="user">
        {isDisabled ? children : <SmoothScroll>{children}</SmoothScroll>}
      </MotionConfig>
    </AnimDisabledContext.Provider>
  );
}
