import { ImageResponse } from "next/og";
import { site } from "@/config/site";

export const alt = `${site.brandPlain} — Read the player. Not the hype.`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamic Open Graph / Twitter card. Echoes the dark research-desk aesthetic:
// near-black bg, signal-green accent, mono data chips. Uses system fonts so it
// renders without fetching font binaries.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#07080a",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        {/* top row: brand + live badge */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                width: "18px",
                height: "18px",
                borderRadius: "50%",
                background: "#37e493",
                boxShadow: "0 0 24px 2px #37e493",
              }}
            />
            <div
              style={{
                color: "#f2f0e9",
                fontSize: "28px",
                fontWeight: 800,
                letterSpacing: "-1px",
                textTransform: "uppercase",
              }}
            >
              {site.brandPlain}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              color: "#37e493",
              fontSize: "20px",
              letterSpacing: "2px",
            }}
          >
            <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#37e493" }} />
            LIVE
          </div>
        </div>

        {/* headline */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#37e493",
              fontSize: "22px",
              letterSpacing: "6px",
              textTransform: "uppercase",
              marginBottom: "20px",
            }}
          >
            NBA · NFL · ATP/WTA · Player Props
          </div>
          <div
            style={{
              color: "#f2f0e9",
              fontSize: "92px",
              fontWeight: 900,
              lineHeight: 1,
              textTransform: "uppercase",
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            Read the player.&nbsp;<span style={{ color: "#37e493" }}>Not</span>&nbsp;the hype.
          </div>
        </div>

        {/* bottom: stat chips */}
        <div style={{ display: "flex", gap: "18px" }}>
          {[
            { n: "+106.7u", k: "NET UNITS" },
            { n: "414–326", k: "RECORD" },
            { n: "55.9%", k: "HIT RATE" },
            { n: "TRACKED", k: "THIRD-PARTY" },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "6px",
                padding: "18px 26px",
                borderRadius: "12px",
                border: "1px solid #242a33",
                background: "#13161c",
              }}
            >
              <div style={{ color: "#37e493", fontSize: "30px", fontWeight: 700 }}>{s.n}</div>
              <div style={{ color: "#686d77", fontSize: "16px", letterSpacing: "2px" }}>{s.k}</div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
