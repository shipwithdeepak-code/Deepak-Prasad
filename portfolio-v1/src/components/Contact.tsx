import {CONTACT} from '~/data/profile';
import {Reveal} from './Reveal';

const LINKS = [
  {label: 'Email', href: `mailto:${CONTACT.email}`, detail: CONTACT.email, external: false},
  {label: 'LinkedIn', href: CONTACT.linkedin, detail: '/in/prasad-deepak', external: true},
  {label: 'GitHub', href: CONTACT.github, detail: '/shipwithdeepak-code', external: true},
  {label: 'Resume', href: CONTACT.resume, detail: 'PDF', external: false},
];

export function Contact() {
  return (
    <section
      id="contact"
      className="rule-t scroll-mt-20 bg-surface-2/40"
      aria-labelledby="contact-heading"
    >
      <div className="shell py-20 md:py-28">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-[2rem] leading-[1.1] md:text-[3rem] lg:text-[3.5rem]"
          >
            Building something complex?
            <br />
            <span className="serif italic font-normal text-accent">Let’s make it simpler.</span>
          </h2>
        </Reveal>

        <Reveal delay={80}>
          <ul className="mt-12 grid gap-0 border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {LINKS.map((l) => (
              <li key={l.label} className="border-b border-line lg:border-r lg:last:border-r-0">
                <a
                  href={l.href}
                  {...(l.external ? {target: '_blank', rel: 'noopener noreferrer'} : {})}
                  className="group flex min-h-[88px] flex-col justify-center gap-1 py-5 pr-4 transition-colors duration-150 lg:px-5 lg:first:pl-0"
                >
                  <span className="flex items-center gap-2 text-[1.0625rem] font-medium transition-colors duration-150 group-hover:text-accent">
                    {l.label}
                    <span
                      aria-hidden="true"
                      className="text-muted transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-accent"
                    >
                      →
                    </span>
                  </span>
                  <span className="font-mono text-[11.5px] text-muted">{l.detail}</span>
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
