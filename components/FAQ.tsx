"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/config/site";
import type { FaqItem } from "@/config/site";

function FaqRow({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const ansRef = useRef<HTMLDivElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  // Animate max-height like the demo: measured content height when open, 0 when
  // closed. Re-measures on open so long answers don't clip.
  useEffect(() => {
    const el = ansRef.current;
    if (!el) return;
    setMaxHeight(isOpen ? `${el.scrollHeight}px` : "0px");
  }, [isOpen]);

  const btnId = `faq-q-${index}`;
  const panelId = `faq-a-${index}`;

  return (
    <div className={isOpen ? "qa reveal open" : "qa reveal"}>
      <button
        id={btnId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
      >
        {item.q}
      </button>
      <div
        className="ans"
        id={panelId}
        role="region"
        aria-labelledby={btnId}
        ref={ansRef}
        style={{ maxHeight }}
      >
        <p>{item.a}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const { faq } = site;
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" style={{ background: "var(--ink-2)" }}>
      <div className="wrap">
        <div className="sec-head reveal" style={{ justifyContent: "center", textAlign: "center" }}>
          <div>
            <span className="eyebrow">{faq.eyebrow}</span>
            <h2>{faq.heading}</h2>
          </div>
        </div>
        <div className="faq">
          {faq.items.map((item, i) => (
            <FaqRow
              key={i}
              item={item}
              index={i}
              isOpen={open === i}
              onToggle={() => setOpen(open === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
