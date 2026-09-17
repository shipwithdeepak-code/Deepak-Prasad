import React, { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import {
  CONTACT_EMAIL,
  CONTACT_MAILTO,
  GITHUB_URL,
  LINKEDIN_URL,
  RESPONSE_TIME,
} from "../utils/contact";
import Modal from "./site/v3/Modal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FIELD =
  "v3-key-quiet w-full rounded-xl bg-obsidian px-3.5 py-2.5 text-sm text-pure-white caret-coral-pulse outline-none placeholder:text-smoke";
const LABEL =
  "mb-1.5 block font-mono text-[10.5px] uppercase tracking-[.05em] text-smoke";

/** Naming the reason first makes the rest of the note shorter to write. */
const SUBJECTS = [
  "A senior product role",
  "0 to 1 discovery or an MVP sprint",
  "Marketplace and payments advisory",
  "Just a conversation",
];

/**
 * The same contact form as the page, in a dialog.
 *
 * Like the page, it hands the draft to the visitor's own mail client. It used
 * to show "Message received" and send nothing, then close itself after two and
 * a half seconds, so the note was gone and the visitor believed it had
 * arrived.
 */
export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [subject, setSubject] = useState(SUBJECTS[0]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${message}\n\n${name}\n${email}`;
    window.location.href = `${CONTACT_MAILTO}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  };

  const link =
    "font-mono text-[11px] text-smoke transition-colors duration-200 hover:text-pure-white";

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Get in touch"
      subtitle={RESPONSE_TIME}
      footer={
        <div className="flex flex-wrap items-center gap-4">
          <a className={link} href={LINKEDIN_URL} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className={link} href={GITHUB_URL} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a className={link} href={CONTACT_MAILTO}>
            {CONTACT_EMAIL}
          </a>
        </div>
      }
    >
      <form onSubmit={submit} className="grid gap-4">
        <div>
          <span className={LABEL}>What this is about</span>
          <div className="grid gap-2 sm:grid-cols-2">
            {SUBJECTS.map((opt) => {
              const pressed = subject === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={pressed}
                  onClick={() => setSubject(opt)}
                  className={`rounded-xl p-2.5 text-left text-[13px] transition-colors duration-200 ${
                    pressed
                      ? "v3-key bg-white/[.04] text-pure-white"
                      : "v3-key-quiet text-ash hover:text-pure-white"
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={LABEL} htmlFor="modal-name">
              Your name
            </label>
            <input
              id="modal-name"
              className={FIELD}
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="modal-email">
              Your email
            </label>
            <input
              id="modal-email"
              type="email"
              className={FIELD}
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className={LABEL} htmlFor="modal-message">
            Message
          </label>
          <textarea
            id="modal-message"
            rows={4}
            className={`${FIELD} resize-y`}
            placeholder="The product, the team, and what you need moved."
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <p className="text-[13px] leading-relaxed text-smoke">
          This opens your own mail client with the note drafted. Nothing is
          posted to a server on this site.
        </p>

        <button
          type="submit"
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-mist px-[18px] py-3 text-sm font-medium text-iron transition-all duration-200 hover:-translate-y-px hover:bg-white"
        >
          Open it in my mail client
          <ArrowUpRight className="size-3.5" strokeWidth={2} aria-hidden="true" />
        </button>
      </form>
    </Modal>
  );
}
