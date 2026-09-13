import React from "react";
import { Linkedin, Mail, ArrowUpRight, Download } from "lucide-react";
import { downloadResumePDF } from "../../utils/downloadResume";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  LINKEDIN_URL,
  LOCATION,
  RESPONSE_TIME,
} from "../../utils/contact";

interface SiteFooterProps {
  onOpenContact?: () => void;
  onAskDipa?: () => void;
}

export default function SiteFooter({ onOpenContact, onAskDipa }: SiteFooterProps) {
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
            href={LINKEDIN_URL}
            target="_blank"
            rel="noreferrer noopener"
            aria-label="LinkedIn"
            className="dp-icb"
          >
            <Linkedin size={17} />
          </a>
          <button type="button" onClick={() => downloadResumePDF()} className="dp-ghost">
            Download resume <Download size={14} />
          </button>
          <a href={CONTACT_MAILTO} aria-label="Email" className="dp-icb">
            <Mail size={17} />
          </a>
        </div>

        {/* the reader who has decided to act should not have to go looking:
            the address in plain text, how fast a reply comes, and where he is */}
        <div
          className="flex items-center justify-center flex-wrap font-mono uppercase"
          style={{
            gap: 20,
            marginTop: "clamp(14px,2cqw,20px)",
            fontSize: 11,
            letterSpacing: ".14em",
            color: "var(--color-mute)",
          }}
        >
          <a href={CONTACT_MAILTO} style={{ color: "inherit" }}>{CONTACT_EMAIL}</a>
          <span>{RESPONSE_TIME}</span>
          <span>{LOCATION}</span>
        </div>

        <div
          className="w-full flex items-center justify-between gap-3 flex-wrap font-mono uppercase"
          style={{
            marginTop: "clamp(38px,5cqw,64px)",
            paddingTop: "clamp(15px,2cqw,22px)",
            borderTop: "1px solid var(--rule)",
            fontSize: 10,
            letterSpacing: ".11em",
            color: "rgba(242,242,240,.58)",
          }}
        >
          <span>&copy; {new Date().getFullYear()} Deepak Prasad. All rights reserved.</span>
          <span className="flex items-center flex-wrap" style={{ gap: "clamp(10px,1.6cqw,20px)" }}>
            <button
              type="button"
              onClick={onAskDipa}
              className="not-italic text-coral font-mono uppercase cursor-pointer"
              style={{ background: "none", border: 0, padding: 0, letterSpacing: "inherit", fontSize: "inherit" }}
              aria-label="Ask Dipa, the site assistant"
            >
              Ask Dipa
            </button>
            <span>Senior Product Manager</span>
            <span>{LOCATION}</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
