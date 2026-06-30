import Link from "next/link";
import Image from "next/image";
import { site } from "@/config/site";

export default function Nav() {
  return (
    <header className="nav">
      <div className="wrap nav-in">
        <Link href="/" className="brand" aria-label={`${site.brandPlain} — home`}>
          {/* Logo in the corner — Bake's call. The mark already contains the
              wordmark, so it doubles as the brand name. */}
          <Image
            src="/logo.png"
            alt={site.brandPlain}
            width={1024}
            height={492}
            priority
            sizes="200px"
            style={{ height: 38, width: "auto" }}
          />
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
