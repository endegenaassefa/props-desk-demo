"use client";

import { useEffect, useState } from "react";
import { site } from "@/config/site";

const VISIBLE_ROWS = 5;

/**
 * The hero "Prop Board" data terminal: a ticking ET clock plus a feed that
 * rotates one row every 2.4s. Ports the demo's behavior 1:1, including
 * prefers-reduced-motion (clock still ticks; feed rotation is paused).
 *
 * Initial render is deterministic (clock placeholder + first 5 pool rows) so
 * server and client markup match — no hydration mismatch.
 */
export default function Terminal() {
  const pool = site.feedPool;
  const [clock, setClock] = useState("--:--:--");
  const [fi, setFi] = useState(0);

  useEffect(() => {
    function tick() {
      const d = new Date();
      const h = d.getHours() % 12 || 12;
      const m = ("0" + d.getMinutes()).slice(-2);
      const s = ("0" + d.getSeconds()).slice(-2);
      const ap = d.getHours() < 12 ? "AM" : "PM";
      setClock(`${h}:${m}:${s} ${ap} ET`);
    }
    tick();
    const clockId = setInterval(tick, 1000);

    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let feedId: ReturnType<typeof setInterval> | undefined;
    if (!reduced) {
      feedId = setInterval(() => setFi((p) => (p + 1) % pool.length), 2400);
    }

    return () => {
      clearInterval(clockId);
      if (feedId) clearInterval(feedId);
    };
  }, [pool.length]);

  const rows = Array.from({ length: VISIBLE_ROWS }, (_, k) => pool[(fi + k) % pool.length]);

  return (
    <div className="terminal reveal">
      <div className="term-bar">
        <span className="d" aria-hidden="true"></span>
        <span className="d" aria-hidden="true"></span>
        <span className="d" aria-hidden="true"></span>
        <span className="ttl">
          Prop Board · <span className="mono">{clock}</span>
        </span>
        <span className="live">
          <i aria-hidden="true"></i>LIVE
        </span>
      </div>
      <div id="termfeed">
        {rows.map((r, k) => (
          // key includes fi so each rotation remounts the row and replays the
          // slide-in animation, exactly like the demo's innerHTML replacement.
          <div className="term-row" key={`${fi}-${k}`} style={{ animationDelay: `${k * 0.06}s` }}>
            <span className="pl">{r.player}</span>
            <span className="ln">{r.line}</span>
            <span className="ed">{r.edge}</span>
            <span className={`st ${r.status}`}>{r.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
