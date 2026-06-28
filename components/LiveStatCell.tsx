"use client";

import { useEffect, useState } from "react";

/**
 * The single "LIVE" board play's right-hand value, which climbs 9→11 then
 * resets, exactly like the demo's #liveStat. Paused under reduced motion.
 *
 * SSR/first client render shows `initial` (e.g. "9 / 11") so hydration matches.
 */
export default function LiveStatCell({ initial }: { initial: string }) {
  const [val, setVal] = useState<number | null>(null);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setVal(9);
    const id = setInterval(() => {
      setVal((v) => (v === null ? 9 : v >= 11 ? 9 : v + 1));
    }, 2600);
    return () => clearInterval(id);
  }, []);

  const text = val === null ? initial : `${val} / 11`;
  const color = val !== null && val >= 11 ? "var(--signal)" : "var(--clay)";

  return (
    <span className="mono" style={{ color, fontSize: "13px" }}>
      {text}
    </span>
  );
}
