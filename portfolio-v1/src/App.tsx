import {Suspense, lazy, useCallback, useEffect, useState} from 'react';
import {Footer} from '~/components/Footer';
import {Navigation} from '~/components/Navigation';
import {getCase} from '~/data/cases';
import {pageKey, useRoute} from '~/lib/router';
import {Home} from '~/pages/Home';
import {NotFound} from '~/pages/NotFound';

/**
 * Code splitting: the homepage is the entry payload. Case studies and the Dīpa
 * dialog load on demand, so a first visit does not download screens it may
 * never open.
 */
const CaseStudyPage = lazy(() =>
  import('~/pages/CaseStudyPage').then((m) => ({default: m.CaseStudyPage})),
);
const Dipa = lazy(() => import('~/components/Dipa').then((m) => ({default: m.Dipa})));

function Loading() {
  return (
    <div className="shell py-24">
      <p className="label" role="status">
        Loading…
      </p>
    </div>
  );
}

export default function App() {
  const route = useRoute();
  const [dipaOpen, setDipaOpen] = useState(false);
  const key = pageKey(route);

  const openDipa = useCallback(() => setDipaOpen(true), []);
  const closeDipa = useCallback(() => setDipaOpen(false), []);

  // Reset scroll when the page (not the anchor) changes.
  useEffect(() => {
    if (route.name === 'home' && route.anchor) return;
    window.scrollTo(0, 0);
  }, [key]); // eslint-disable-line react-hooks/exhaustive-deps

  const study = route.name === 'case' ? getCase(route.slug) : undefined;

  return (
    <>
      <Navigation onAskDipa={openDipa} />

      <main id="main">
        {route.name === 'home' && <Home anchor={route.anchor} onAskDipa={openDipa} />}

        {route.name === 'case' &&
          (study ? (
            <Suspense fallback={<Loading />}>
              <CaseStudyPage study={study} />
            </Suspense>
          ) : (
            <NotFound />
          ))}

        {route.name === 'notfound' && <NotFound />}
      </main>

      <Footer onAskDipa={openDipa} />

      {dipaOpen && (
        <Suspense fallback={null}>
          <Dipa open={dipaOpen} onClose={closeDipa} />
        </Suspense>
      )}
    </>
  );
}
