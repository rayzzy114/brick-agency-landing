"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useAnimDisabled } from "./MotionProvider";

/** Scroll-linked vertical parallax (transform-only, no layout shift). */
export function Parallax({
  children,
  speed = 0.2,
  className,
}: {
  children: React.ReactNode;
  /** Positive scrolls slower than the page, negative faster. */
  speed?: number;
  className?: string;
}) {
  const disabled = useAnimDisabled();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -120, speed * 120]);

  if (disabled)
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
