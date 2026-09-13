import React from "react";
import { Linkedin, Github, Mail, ArrowUpRight } from "lucide-react";

interface SiteFooterProps {
  onOpenContact?: () => void;
}

export default function SiteFooter({ onOpenContact }: SiteFooterProps) {
  return (
    <footer
      className="relative overflow-hidden bg-void text-ivory"
      style={{ containerType: "inline-size" }}
    >
      <div
        className="flex flex-col items-center text-center"
        style={{ padding: "clamp(52px,7.4cqw,104px) clamp(18px,4cqw,52px) clamp(20px,2.6cqw,30px)" }}
      >
        <h2
          className="font-display m-0 text-ivory"
          style={{
            fontWeight: 700,
            fontVariationSettings: '"wdth" 94',
            fontSize: "clamp(28px,5cqw,62px)",
            letterSpacing: "-.032em",
            lineHeight: 1.04,
            maxWidth: "21ch",
          }}
        >
          Let us build something{" "}
          <i
            className="font-display"
            style={{ fontStyle: "italic", fontWeight: 600, color: "var(--color-coral)" }}
          >
            extraordinary
          </i>{" "}
          together
        </h2>
        <p
          className="text-mute"
          style={{
            fontSize: "clamp(12.5px,1.28cqw,16px)",
            lineHeight: 1.68,
            maxWidth: "56ch",
            margin: "clamp(14px,2cqw,20px) auto 0",
          }}
        >
          Looking for a Senior Product Manager who thrives in ambiguity, talks to
          real users, and builds resilient physical digital systems? Let us connect.
        </p>

        <div
          className="flex items-center justify-center gap-3 flex-wrap"
          style={{ marginTop: "clamp(20px,2.8cqw,32px)" }}
        >
          <button type="button" onClick={onOpenContact} className="dp-talk">
            Let us talk <ArrowUpRight size={14} />
          </button>
          <a
            href="https://www.linkedin.com/in/deepak-prasad-pm/"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="dp-icb"
          >
            <Linkedin size={17} />
          </a>
          <a
            href="https://github.com/shipwithdeepak-code"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="GitHub"
            className="dp-icb"
          >
            <Github size={17} />
          </a>
          <a href="mailto:founder@welzea.com" aria-label="Email" className="dp-icb">
            <Mail size={17} />
          </a>
        </div>

        <div
          className="w-full flex items-center justify-between gap-3 flex-wrap font-mono uppercase"
          style={{
            marginTop: "clamp(38px,5cqw,64px)",
            paddingTop: "clamp(15px,2cqw,22px)",
            borderTop: "1px solid var(--rule)",
            fontSize: 10,
            letterSpacing: ".11em",
            color: "rgba(242,242,240,.42)",
          }}
        >
          <span>&copy; {new Date().getFullYear()} Deepak Prasad. All rights reserved.</span>
          <span className="flex items-center flex-wrap" style={{ gap: "clamp(10px,1.6cqw,20px)" }}>
            <em className="not-italic text-coral">Ask Dipa</em>
            <span>Senior Product Manager</span>
            <span>Bengaluru / Remote</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
