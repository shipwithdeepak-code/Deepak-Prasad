import React from "react";
import {
  CONTACT_MAILTO,
  GITHUB_URL,
  LINKEDIN_URL,
} from "../../../utils/contact";

interface SiteFooterV3Props {
  onNavigate: (path: string) => void;
}

/**
 * One rule, one line. The footer on a portfolio is where a visitor goes when
 * they have decided; it needs the three ways to reach me and nothing else.
 */
export default function SiteFooterV3({ onNavigate }: SiteFooterV3Props) {
  const link =
    "text-[13px] text-smoke transition-colors duration-200 hover:text-pure-white";

  return (
    <footer className="border-t border-hairline py-9">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center gap-[18px] px-6">
        <span className="font-mono text-xs text-smoke">
          © {new Date().getFullYear()} Deepak Prasad
        </span>
        <span className="flex-1" />
        <a className={link} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
          LinkedIn
        </a>
        <a className={link} href={GITHUB_URL} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a className={link} href={CONTACT_MAILTO}>
          Email
        </a>
        <a
          className={link}
          href="/work"
          onClick={(e) => {
            e.preventDefault();
            onNavigate("/work");
          }}
        >
          Work
        </a>
      </div>
    </footer>
  );
}
