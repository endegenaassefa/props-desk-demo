import Link from "next/link";
import { site } from "@/config/site";

/** Shared shell for the legal/content pages. Renders the back link, a clear
 *  "draft for review" banner, the title, and the page body. */
export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="legal">
      <div className="wrap">
        <Link href="/" className="back">
          ← {site.brandPlain}
        </Link>
        <p className="updated">Last updated · {updated}</p>
        <h1>{title}</h1>
        <div className="review-note">
          <b>Draft for review.</b> This page is a good-faith starting template, not legal advice.
          The client and a qualified attorney licensed in the relevant jurisdiction must review and
          finalize it before launch.
        </div>
        {children}
      </div>
    </article>
  );
}
