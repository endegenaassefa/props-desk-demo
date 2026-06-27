"use client";

import { useEffect } from "react";

/**
 * Global scroll/reveal engine — a faithful port of the demo's single
 * IntersectionObserver script. On mount it:
 *   - reveals `.reveal` elements (adds `.in`) with the staggered transition delay
 *   - counts up `[data-to]` numbers and `[data-rec]` records when they enter view
 *   - grows the `#bars` record chart
 *
 * prefers-reduced-motion: numbers/bars snap to their final values instead of
 * animating. Renders nothing.
 */
export default function ScrollEffects() {
  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function countUp(el: HTMLElement) {
      const to = parseFloat(el.dataset.to || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      const pre = el.dataset.pre || "";
      const suf = el.dataset.suf || "";
      if (reduced) {
        el.textContent = pre + to.toFixed(dec) + suf;
        return;
      }
      let t0: number | null = null;
      function step(ts: number) {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / 1300, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = pre + (to * e).toFixed(dec) + suf;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    function recUp(el: HTMLElement) {
      const parts = (el.dataset.rec || "0-0").split("-");
      const w = Number(parts[0]) || 0;
      const l = Number(parts[1]) || 0;
      if (reduced) {
        el.textContent = `${w}–${l}`;
        return;
      }
      let t0: number | null = null;
      function step(ts: number) {
        if (t0 === null) t0 = ts;
        const p = Math.min((ts - t0) / 1300, 1);
        const e = 1 - Math.pow(1 - p, 3);
        el.textContent = `${Math.round(w * e)}–${Math.round(l * e)}`;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const target = entry.target as HTMLElement;
          target.classList.add("in");
          target.querySelectorAll<HTMLElement>("[data-to]").forEach(countUp);
          target.querySelectorAll<HTMLElement>("[data-rec]").forEach(recUp);
          if (target.id === "record" || target.querySelector("#bars")) {
            const bars = document.querySelectorAll<HTMLElement>("#bars span");
            bars.forEach((b, i) => {
              const h = `${b.dataset.h || "0"}%`;
              if (reduced) {
                b.style.height = h;
              } else {
                window.setTimeout(() => {
                  b.style.height = h;
                }, i * 70);
              }
            });
          }
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.15 }
    );

    const reveals = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    reveals.forEach((el, i) => {
      el.style.transitionDelay = `${Math.min(i % 3, 2) * 0.07}s`;
      io.observe(el);
    });

    return () => io.disconnect();
  }, []);

  return null;
}
