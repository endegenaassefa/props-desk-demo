"use client";

import { useEffect } from "react";

/**
 * Last-resort boundary for errors thrown in the root layout itself. It replaces
 * the entire document, so globals.css is not applied — styles are inline and
 * mirror the brand tokens (ink background, signal-green accent).
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "24px",
          background: "#07080a",
          color: "#f2f0e9",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div>
          <p style={{ color: "#37e493", fontSize: "13px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            Error
          </p>
          <h1 style={{ fontSize: "40px", margin: "10px 0 8px" }}>Something went wrong</h1>
          <p style={{ color: "#a7a9a4", marginBottom: "24px" }}>
            A page failed to load. Please try again.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              background: "#37e493",
              color: "#042414",
              border: 0,
              borderRadius: "100px",
              padding: "12px 24px",
              fontSize: "15px",
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
