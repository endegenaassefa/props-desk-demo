import Link from "next/link";

// Mobile-only sticky buy bar. QR codes on the business cards mean most traffic
// lands on a phone, cold — so keep the purchase one thumb-tap away at all times.
// Hidden at ≥901px (desktop has the nav button + packages section).
export default function MobileBuyBar() {
  return (
    <div className="mobile-buy-bar" aria-label="Quick purchase">
      <div className="mbb-copy">
        <span className="mbb-from">From $10</span>
        <span className="mbb-sub">Wins + losses shown</span>
      </div>
      <Link href="/#pricing" className="btn btn-primary">
        Get access
      </Link>
    </div>
  );
}
