import { ALL_FLAGSHIP_CASE_STUDIES } from "../data/caseStudies";

const SITE = "Deepak Prasad";
const ROLE = "Senior Product Manager";

interface Meta {
  title: string;
  description: string;
}

const STATIC_META: Record<string, Meta> = {
  "/": {
    title: `${SITE} — ${ROLE} | AI, 0→1 & Product Strategy`,
    description:
      "Senior product manager, seven years across marketplaces, AI and subscription products. 80,000+ farmers onboarded, 12,000+ paid subscribers, payouts cut from 15 days to 2 hours.",
  },
  "/work": {
    title: `Selected work & case studies — ${SITE}`,
    description:
      "Six deep-dive case studies across B2B marketplaces, conversational AI, subscription growth, connected products and AI content pipelines.",
  },
  "/about": {
    title: `About — ${SITE}`,
    description:
      "From physical hardware and rural mandis to consumer AI platforms: the career arc, operating principles and capabilities behind the work.",
  },
  "/resume": {
    title: `Resume — ${SITE}, ${ROLE}`,
    description:
      "Executive summary, career timeline and education for Deepak Prasad, senior product manager in Bengaluru.",
  },
  "/contact": {
    title: `Contact — ${SITE}`,
    description:
      "Hiring for senior or lead product roles in marketplaces, applied AI or subscription products? Replies within 24 hours.",
  },
  "/product-jury": {
    title: `Product Jury: Building a Multi-Agent Product Decision Workspace — ${SITE}`,
    description:
      "A product decision workspace that challenges assumptions before you ship. Five specialist seats examine one product decision across UX research, product strategy, evidence quality, engineering feasibility, and business impact.",
  },
};

/** Title and description for a route. Case-study pages take theirs from the
 *  study itself, so adding a study needs no change here. */
export function metaForPath(path: string): Meta {
  if (path.startsWith("/work/")) {
    const slug = path.replace("/work/", "").toLowerCase();
    const study = ALL_FLAGSHIP_CASE_STUDIES.find(
      (c) => c.slug.toLowerCase() === slug || c.id.toLowerCase() === slug
    );
    if (study) {
      return {
        title: `${study.title} — ${SITE}`,
        description: study.description,
      };
    }
  }
  return STATIC_META[path] ?? STATIC_META["/"];
}

/** Applies the route's title and description to the document.
 *
 *  This fixes the browser tab, history entries, bookmarks and the text a
 *  browser reads out — all of which currently show the homepage title on every
 *  page. It does NOT fix link unfurls on LinkedIn or Slack: those crawlers do
 *  not run JavaScript, so real per-page og: tags need the markup to carry them
 *  before hydration (server-side injection or a prerender step). */
export function applyPageMeta(path: string): void {
  const meta = metaForPath(path);
  document.title = meta.title;

  const tag = document.querySelector<HTMLMetaElement>('meta[name="description"]');
  if (tag) tag.content = meta.description;
}
