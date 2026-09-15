"use client";

import Link from "next/link";
import { profile } from "@/data/profile";
import { scrollToId } from "@/lib/scroll";
import { cn } from "@/lib/utils";

/**
 * Monogram that opens into the full wordmark on hover — the mark behaves like
 * an introduction rather than a logo sitting in a corner.
 */
export function Wordmark({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      data-cursor="link"
      aria-label={`${profile.fullName} — home`}
      onClick={(event) => {
        if (window.location.pathname === "/") {
          event.preventDefault();
          history.replaceState(null, "", "/");
          scrollToId("top");
        }
      }}
      className={cn(
        "group/mark inline-flex items-baseline gap-[0.1em] text-[1.05rem] leading-none tracking-[-0.03em]",
        className,
      )}
    >
      <span className="display text-[1.4em] leading-none">{profile.monogram}</span>
      <span className="relative inline-block max-w-0 overflow-hidden whitespace-nowrap font-medium opacity-0 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/mark:max-w-[9rem] group-hover/mark:opacity-100 group-focus-visible/mark:max-w-[9rem] group-focus-visible/mark:opacity-100 motion-reduce:transition-none">
        {profile.name.slice(1) || ""}
        <span className="text-accent">.</span>
      </span>
      <span className="text-accent transition-opacity duration-500 group-hover/mark:opacity-0">
        .
      </span>
    </Link>
  );
}
