"use client";
import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
  as?: "div" | "section" | "article" | "span";
};

export default function Animated({
  children,
  className,
  delay = 0,
  direction = "up",
  as = "div",
}: Props) {
  const reduced = useReducedMotion();

  const initial = reduced
    ? { opacity: 0 }
    : {
        opacity: 0,
        y: direction === "up" ? 28 : 0,
        x: direction === "left" ? -40 : direction === "right" ? 40 : 0,
      };

  const Tag = motion[as];

  return (
    <Tag
      initial={initial}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={reduced ? { duration: 0.2 } : { duration: 0.55, ease: [0.25, 0.1, 0.25, 1], delay }}
      className={className}
    >
      {children}
    </Tag>
  );
}
