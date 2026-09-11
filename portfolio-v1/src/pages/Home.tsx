import {useEffect} from 'react';
import {CapabilityMatrix} from '~/components/CapabilityMatrix';
import {Contact} from '~/components/Contact';
import {ExperienceTimeline} from '~/components/ExperienceTimeline';
import {Hero} from '~/components/Hero';
import {Leadership} from '~/components/Leadership';
import {ProjectShowcase} from '~/components/ProjectShowcase';
import {ProofWall} from '~/components/ProofWall';
import {ThinkingSection} from '~/components/ThinkingSection';
import type {Section} from '~/lib/router';

export function Home({anchor, onAskDipa}: {anchor?: Section; onAskDipa: () => void}) {
  // When arriving from another page via a section link, scroll after paint.
  useEffect(() => {
    if (!anchor) return;
    const el = document.getElementById(anchor);
    if (!el) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const t = window.setTimeout(() => {
      el.scrollIntoView({behavior: reduce ? 'auto' : 'smooth', block: 'start'});
    }, 20);
    return () => window.clearTimeout(t);
  }, [anchor]);

  return (
    <>
      <Hero onContact={onAskDipa} />
      <ProofWall />
      <ProjectShowcase />
      <ThinkingSection />
      <Leadership />
      <ExperienceTimeline />
      <CapabilityMatrix />
      <Contact />
    </>
  );
}
