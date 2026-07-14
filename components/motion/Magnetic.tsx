"use client";

import { useRef } from "react";
import { motion, useSpring } from "motion/react";
import { useAnimDisabled } from "./MotionProvider";

/** Pointer-follow magnetic wrapper for buttons/links. */
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: React.ReactNode;
  strength?: number;
  className?: string;
}) {
  const disabled = useAnimDisabled();
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });
  const y = useSpring(0, { stiffness: 150, damping: 15, mass: 0.1 });

  if (disabled) return <div className={className}>{children}</div>;

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left - rect.width / 2) * strength);
    y.set((e.clientY - rect.top - rect.height / 2) * strength);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      style={{ x, y, display: "inline-block", willChange: "transform" }}
      className={className}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </motion.div>
  );
}
