import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <div className="nf">
      <div>
        <div className="code">Error · 404</div>
        <h1>Off the board.</h1>
        <p>That page isn&rsquo;t in today&rsquo;s slate.</p>
        <div className="row">
          <Link href="/" className="btn btn-primary">
            Back to home
          </Link>
          <Link href="/#pricing" className="btn btn-ghost">
            See the plans
          </Link>
        </div>
      </div>
    </div>
  );
}
