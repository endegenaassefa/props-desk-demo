import { site } from "@/config/site";

export default function ProofGallery() {
  const { proofGallery } = site;
  if (!proofGallery.images.length) return null;
  return (
    <section id="receipts">
      <div className="wrap">
        <div className="sec-head reveal">
          <div>
            <span className="eyebrow">{proofGallery.eyebrow}</span>
            <h2>{proofGallery.heading}</h2>
          </div>
          <span className="note">{proofGallery.note}</span>
        </div>
        <div className="proof-grid">
          {proofGallery.images.map((img, i) => (
            <figure className="proof reveal" key={i}>
              {/* User-content screenshots of varying dimensions — plain img is correct here. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} loading="lazy" decoding="async" />
              <figcaption>{img.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
