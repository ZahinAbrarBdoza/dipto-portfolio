"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/profile";

/**
 * Live clock in my timezone. Renders nothing until mounted so server and
 * client markup agree, and the label around it carries the meaning anyway.
 */
export function LocalTime({ className }: { className?: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone: profile.ianaTimeZone,
      }).format(new Date());

    setTime(format());
    const id = window.setInterval(() => setTime(format()), 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className={className} suppressHydrationWarning>
      {time ?? "--:--"} {profile.timezone}
    </span>
  );
}
