import { site } from "@/config/site";
import type { PlayStatus } from "@/config/site";
import LiveStatCell from "./LiveStatCell";

const RIGHT_COLOR: Record<PlayStatus, string> = {
  hit: "var(--signal)",
  live: "var(--clay)",
  pend: "var(--cream-dim)",
  miss: "var(--muted)",
};

export default function Board() {
  const { board } = site;
  return (
    <section id="board">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{board.eyebrow}</span>
            <h2>{board.heading}</h2>
          </div>
          <span className="note">{board.note}</span>
        </div>
        <div className="board-grid">
          {board.plays.map((p, i) => (
            <div className="game reveal" key={i}>
              <div className="top">
                <span className="lg">{p.league}</span>
                <span className={`pill ${p.status}`}>
                  {p.status === "live" ? (
                    <>
                      <i aria-hidden="true"></i>
                      {p.statusLabel}
                    </>
                  ) : (
                    p.statusLabel
                  )}
                </span>
              </div>
              <div className="match">{p.match}</div>
              <div className="pick">
                <div>
                  <div className="who">{p.player}</div>
                  <div className="ln">{p.line}</div>
                </div>
                {p.live ? (
                  <LiveStatCell initial={p.right} />
                ) : (
                  <span className="mono" style={{ color: RIGHT_COLOR[p.status], fontSize: "13px" }}>
                    {p.right}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
