import Link from "next/link";
import { site } from "@/config/site";

// Render the brand with non-breaking spaces so it never wraps in the nav bar
// (matches the &nbsp; the demo used). char 160 = U+00A0 non-breaking space.
const NBSP = String.fromCharCode(160);
const brandNbsp = site.brand.split(" ").join(NBSP);

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand" aria-label={`${site.brandPlain} — home`}>
          <span className="dot" aria-hidden="true"></span>
          {brandNbsp}
        </Link>
        <nav className="nav-links" aria-label="Primary">
          <Link href="/#board">Today&apos;s board</Link>
          <Link href="/#record">Record</Link>
          <Link href="/#pricing">Plans</Link>
          <Link href="/#faq">FAQ</Link>
        </nav>
        <Link href="/#pricing" className="btn btn-primary">
          Get access
        </Link>
      </div>
    </header>
  );
}
