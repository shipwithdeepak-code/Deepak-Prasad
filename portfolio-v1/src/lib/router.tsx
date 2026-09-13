import {useEffect, useState} from 'react';

/**
 * Minimal hash router — no dependency, ~1KB.
 *
 * Hash routing is deliberate: the built app is a static bundle that must work
 * on any host without a server-side SPA rewrite rule. Deep links like
 * #/work/ai-coach resolve correctly from a plain file server or CDN.
 *
 * Section ids double as routes (#work, #thinking, …) so the same href works
 * as a native in-page anchor on the homepage AND as a "go home, then scroll"
 * link from a case-study page. One link form, two correct behaviours.
 */

export const SECTIONS = ['work', 'thinking', 'leadership', 'experience', 'contact'] as const;
export type Section = (typeof SECTIONS)[number];

export type Route =
  | {name: 'home'; anchor?: Section}
  | {name: 'case'; slug: string}
  | {name: 'notfound'};

function parse(hash: string): Route {
  const path = hash.replace(/^#/, '').replace(/^\/+/, '').replace(/\/+$/, '');
  if (path === '') return {name: 'home'};

  const parts = path.split('/');

  if (parts[0] === 'work' && parts[1]) return {name: 'case', slug: parts[1]};

  if (parts.length === 1 && (SECTIONS as readonly string[]).includes(parts[0])) {
    return {name: 'home', anchor: parts[0] as Section};
  }

  return {name: 'notfound'};
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(() => parse(window.location.hash));

  useEffect(() => {
    const onChange = () => setRoute(parse(window.location.hash));
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return route;
}

/** Key that changes whenever the rendered page changes (not the anchor). */
export function pageKey(route: Route): string {
  if (route.name === 'case') return `case:${route.slug}`;
  return route.name;
}
