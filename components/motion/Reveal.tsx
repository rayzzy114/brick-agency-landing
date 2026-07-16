"use client";

import { motion } from "motion/react";
import { useAnimDisabled } from "./MotionProvider";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

/** Fade+rise reveal. mode "view" (default) fires on scroll into view;
    mode "load" fires on mount (hero intro stagger).
    Static (final state) when animations are disabled. */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  mode = "view",
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  mode?: "view" | "load";
  className?: string;
}) {
  const disabled = useAnimDisabled();

  if (disabled) return <div className={className}>{children}</div>;

  const animProps =
    mode === "load"
      ? { animate: { opacity: 1, y: 0 } }
      : {
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-10% 0px" } as const,
        };

  return (
    <motion.div
      data-reveal
      className={className}
      initial={{ opacity: 0, y }}
      {...animProps}
      transition={{ duration: 0.7, delay, ease: EASE_OUT }}
    >
      {children}
    </motion.div>
  );
}
