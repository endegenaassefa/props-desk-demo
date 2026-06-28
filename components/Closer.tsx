import Link from "next/link";
import { site } from "@/config/site";

export default function Closer() {
  const { closer } = site;
  return (
    <section className="closer">
      <div className="wrap reveal">
        <h2>
          {closer.headingLine1}
          <br />
          {closer.headingLine2}
        </h2>
        <p className="sub">{closer.sub}</p>
        <Link href="/#pricing" className="btn btn-primary" style={{ fontSize: "16px", padding: "15px 32px" }}>
          {closer.cta}
        </Link>
      </div>
    </section>
  );
}
