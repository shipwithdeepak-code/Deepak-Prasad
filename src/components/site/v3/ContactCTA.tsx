import React from "react";
import { ArrowUpRight, Download } from "lucide-react";
import { LOCATION, RESPONSE_TIME } from "../../../utils/contact";

interface ContactCTAProps {
  onOpenContact?: () => void;
  onOpenResumeModal?: () => void;
}

/**
 * The close.
 *
 * One promise, stated in a way that costs something: the offer to say when I
 * am not the right fit is the part that makes the rest of it credible. The orb
 * returns here at half size, so the page ends on the same living object it
 * turned on in the middle.
 */
export default function ContactCTA({
  onOpenContact,
  onOpenResumeModal,
}: ContactCTAProps) {
  return (
    <section className="py-[104px]">
      <div className="mx-auto max-w-[1200px] px-6">
        <div
          className="v3-key-quiet relative grid justify-items-center gap-5 overflow-hidden rounded-3xl px-8 py-[88px] text-center"
          style={{
            background:
              "radial-gradient(70% 90% at 50% 6%, rgba(255,99,99,.16), transparent 62%), #07080a",
          }}
        >
          <h2 className="max-w-[16ch] text-[clamp(1.9rem,4.4vw,3rem)] font-normal leading-[1.17] tracking-[.22px] text-pure-white">
            Tell me what you are hiring for.
          </h2>
          <p className="max-w-[44ch] text-[17px] leading-relaxed text-ash">
            I will reply with the three most relevant things I have shipped, and
            whether I am the right fit, including if I am not.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <button
              type="button"
              onClick={onOpenContact}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-mist px-[18px] py-3 text-sm font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white"
            >
              Get in touch
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={onOpenResumeModal}
              className="v3-key-quiet inline-flex min-h-11 items-center gap-2 rounded-lg px-[18px] py-3 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white"
            >
              Download CV
              <Download className="size-3.5" strokeWidth={1.7} aria-hidden="true" />
            </button>
          </div>
          <p className="font-mono text-xs text-smoke">
            {LOCATION}. {RESPONSE_TIME}.
          </p>
        </div>
      </div>
    </section>
  );
}
