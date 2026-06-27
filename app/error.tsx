"use client";

import Link from "next/link";
import { useEffect } from "react";

/**
 * Route-segment error boundary. Renders a branded fallback (reusing the 404
 * styles) instead of a white screen if a page throws at runtime.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error for server/Vercel logs.
    console.error(error);
  }, [error]);

  return (
    <div className="nf">
      <div>
        <div className="code">Error · timeout on the floor</div>
        <h1>Something broke.</h1>
        <p>That one&rsquo;s on us. Give it another shot.</p>
        <div className="row">
          <button type="button" className="btn btn-primary" onClick={reset}>
            Try again
          </button>
          <Link href="/" className="btn btn-ghost">
            Back to home
          </Link>
        </div>
      </div>
    </div>
  );
}
