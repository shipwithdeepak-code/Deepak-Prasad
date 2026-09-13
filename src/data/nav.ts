/**
 * One nav for the whole site. There used to be two, and they disagreed:
 * the shared header sent "Process" to /#methodology, an anchor that does
 * not exist on the homepage, while the hero sent it to /about#process.
 * Every path below resolves to a section that is really there.
 */
export interface NavLink {
  label: string;
  path: string;
  targetId?: string;
}

export const NAV_LINKS: NavLink[] = [
  { label: "Work", path: "/work", targetId: "selected-work" },
  { label: "Process", path: "/about", targetId: "experience" },
  { label: "Principles", path: "/#principles", targetId: "principles" },
  { label: "Track Record", path: "/#track-record", targetId: "track-record" },
];
