/** The "PREVIEW · sample data" strip. Stays up until every placeholder in
 *  config/site.ts is replaced with the client's real tracked info
 *  (flip site.showPreviewBanner to false). */
export default function PreviewBanner() {
  return (
    <div className="preview-strip">
      PREVIEW · sample data — board, record &amp; quotes are illustrative
      placeholders, replaced with real tracked info after sign-off
    </div>
  );
}
