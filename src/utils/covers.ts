/* Case-study cover art, resolved at build time.
   Covers are imported from src/assets rather than served from public/ so the
   bundler hashes them and the markup never requests a file that does not
   exist. A missing file under public/ is answered by the SPA with index.html,
   not a 404, which is how six phantom requests per page load used to happen. */
const COVERS = import.meta.glob<string>("../assets/work/*.{jpg,jpeg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});

/** The cover for a case-study slug, or undefined when no file matches. */
export function coverFor(slug: string): string | undefined {
  const hit = Object.entries(COVERS).find(
    ([path]) => path.split("/").pop()?.replace(/\.[^.]+$/, "") === slug
  );
  return hit?.[1];
}
