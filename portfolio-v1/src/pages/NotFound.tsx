export function NotFound() {
  return (
    <section className="shell flex min-h-[60vh] flex-col justify-center py-20">
      <p className="label">Error 404</p>
      <h1 className="mt-4 text-[2rem] leading-tight md:text-[2.5rem]">
        That page isn’t part of this system.
      </h1>
      <p className="measure mt-4 text-[1.0625rem] leading-relaxed text-muted">
        The link may be out of date. The selected work and case studies are all
        reachable from the homepage.
      </p>
      <a
        href="#/"
        className="mt-8 inline-flex min-h-[48px] w-fit items-center gap-2 bg-accent px-6 font-medium text-on-accent transition-colors duration-150 hover:bg-accent-hover"
      >
        Back to the portfolio <span aria-hidden="true">→</span>
      </a>
    </section>
  );
}
