"use client";

import { motion } from "framer-motion";
import { EASE_SIGNAL } from "@/lib/motion";

/**
 * Page transition. Opacity only, deliberately: a transform here would become
 * the containing block for any fixed-position descendant and quietly break
 * sticky/fixed layout on every route.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.45, ease: EASE_SIGNAL }}
    >
      {children}
    </motion.div>
  );
}
