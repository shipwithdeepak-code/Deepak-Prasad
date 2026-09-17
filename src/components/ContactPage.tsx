import React, { useState } from "react";
import { ArrowUpRight, Mail, Linkedin } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  LINKEDIN_URL,
  LOCATION,
  RESPONSE_TIME,
} from "../utils/contact";
import { PageHeader, Panel } from "./site/v3/primitives";

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

const FIELD =
  "v3-key-quiet w-full rounded-xl bg-obsidian px-3.5 py-2.5 text-sm text-pure-white caret-coral-pulse outline-none placeholder:text-smoke";
const LABEL =
  "mb-1.5 block font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke";

/**
 * Contact.
 *
 * The form opens a real mail client with the fields already filled in. It used
 * to swap itself for a "message received" panel and send nothing at all, which
 * meant every note written here was lost and the page said the opposite. With
 * no backend on this site, handing the draft to the visitor's own mail client
 * is the only version of this form that is true.
 */
export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = form.subject.trim() || "Hello from your site";
    const body = `${form.message}\n\n${form.name}\n${form.email}`;
    window.location.href = `${CONTACT_MAILTO}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const set = (key: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => setForm({ ...form, [key]: e.target.value });

  return (
    <div className="v3-atmos v3-atmos-coral bg-void-black py-16 md:py-24">
      <div className="mx-auto max-w-[1000px] px-6">
        <PageHeader
          eyebrow="Open to senior and lead roles"
          title="Tell me what you are hiring for."
          lede="I will reply with the three most relevant things I have shipped, and whether I am the right fit, including if I am not."
        />

        <div className="grid gap-4 md:grid-cols-[.85fr_1.15fr]">
          <div className="grid content-start gap-4">
            <Panel className="grid gap-2 bg-ink p-6">
              <span className="mb-2 font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                Direct
              </span>

              <a
                href={CONTACT_MAILTO}
                id="contact-email-link"
                className="group grid grid-cols-[auto_1fr] items-center gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-white/[.04]"
              >
                <span className="v3-key-quiet grid size-10 place-items-center rounded-full text-coral-pulse">
                  <Mail className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="grid gap-0.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                    Email
                  </span>
                  <span className="text-sm text-pure-white">{CONTACT_EMAIL}</span>
                </span>
              </a>

              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noreferrer"
                id="contact-linkedin-link"
                className="group grid grid-cols-[auto_1fr] items-center gap-3.5 rounded-xl p-3 transition-colors duration-200 hover:bg-white/[.04]"
              >
                <span className="v3-key-quiet grid size-10 place-items-center rounded-full text-coral-pulse">
                  <Linkedin className="size-[18px]" strokeWidth={1.7} aria-hidden="true" />
                </span>
                <span className="grid gap-0.5">
                  <span className="font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke">
                    LinkedIn
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-pure-white">
                    linkedin.com/in/prasad-deepak
                    <ArrowUpRight className="size-3" strokeWidth={2} aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Panel>

            <Panel className="grid gap-2.5 bg-ink p-6 font-mono text-[11px] uppercase tracking-[.05em] text-smoke">
              <span>{LOCATION}</span>
              <span>{RESPONSE_TIME}</span>
              <span>Open to relocation</span>
            </Panel>

            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="v3-key-quiet inline-flex min-h-11 items-center justify-between gap-2 rounded-lg px-[18px] py-3 text-sm font-medium text-ash transition-colors duration-200 hover:text-pure-white"
            >
              Read the work first
              <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
            </button>
          </div>

          <Panel loud className="bg-ink p-6 sm:p-8">
            <h2 className="mb-2 text-xl font-normal text-pure-white">
              Write it here
            </h2>
            <p className="mb-6 text-sm leading-relaxed text-ash">
              This opens your own mail client with the note already drafted, so
              you can see exactly what is sent and to whom. Nothing is posted to
              a server on this site.
            </p>

            <form onSubmit={submit} className="grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={LABEL} htmlFor="contact-name">
                    Your name
                  </label>
                  <input
                    id="contact-name"
                    className={FIELD}
                    required
                    value={form.name}
                    onChange={set("name")}
                  />
                </div>
                <div>
                  <label className={LABEL} htmlFor="contact-email">
                    Your email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    className={FIELD}
                    required
                    value={form.email}
                    onChange={set("email")}
                  />
                </div>
              </div>

              <div>
                <label className={LABEL} htmlFor="contact-subject">
                  Subject
                </label>
                <input
                  id="contact-subject"
                  className={FIELD}
                  placeholder="Senior PM role, advisory, or something else"
                  value={form.subject}
                  onChange={set("subject")}
                />
              </div>

              <div>
                <label className={LABEL} htmlFor="contact-message">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  rows={5}
                  className={`${FIELD} resize-y`}
                  placeholder="The product, the team, and what you need moved."
                  required
                  value={form.message}
                  onChange={set("message")}
                />
              </div>

              <button
                type="submit"
                id="contact-form-submit"
                className="v3-cta mt-1 inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-6 py-3 text-[15px] font-medium text-pure-white"
              >
                Open it in my mail client
                <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
              </button>
            </form>
          </Panel>
        </div>
      </div>
    </div>
  );
}
