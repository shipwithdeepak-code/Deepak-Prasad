import React, { useState } from "react";
import {
  Mail,
  Linkedin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
} from "lucide-react";
import { CONTACT_EMAIL, CONTACT_MAILTO, LINKEDIN_URL } from "../utils/contact";

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="w-full bg-void text-ivory py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.18em] text-mute mb-4 w-fit">
            <i className="flex-none" style={{ width: 44, height: 1, background: "var(--color-coral)" }} />
            <span>Open for Senior Product Opportunities</span>
          </div>
          <h1
            className="font-display text-4xl sm:text-5xl font-bold tracking-tight text-ivory leading-[1.15] mb-4"
            style={{ fontVariationSettings: '"wdth" 92' }}
          >
            Have a product problem worth unpacking?
          </h1>
          <p className="font-body text-base sm:text-lg text-mute leading-relaxed font-normal max-w-2xl">
            I’m open to Senior Product Management opportunities, product strategy conversations, and interesting 0→1 problems across B2B, AI and consumer platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Left Column: Direct Contacts */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs">
              <span className="text-xs font-mono font-semibold uppercase tracking-[0.18em] text-coral block mb-4">
                Direct Channels
              </span>

              <div className="flex flex-col gap-4">
                <a
                  href={CONTACT_MAILTO}
                  id="contact-email-link"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-ghost-active border border-transparent hover:border-[var(--rule)] transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  <div className="w-10 h-10 rounded-full bg-void border border-[var(--rule)] flex items-center justify-center text-coral group-hover:border-coral transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-mute block font-medium">
                      Email
                    </span>
                    <span className="font-body text-sm font-semibold text-ivory group-hover:text-coral transition-colors">
                      {CONTACT_EMAIL}
                    </span>
                  </div>
                </a>

                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin-link"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-ghost-active border border-transparent hover:border-[var(--rule)] transition-colors group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                >
                  <div className="w-10 h-10 rounded-full bg-void border border-[var(--rule)] flex items-center justify-center text-coral group-hover:border-coral transition-colors">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-mute block font-medium">
                      LinkedIn
                    </span>
                    <span className="font-body text-sm font-semibold text-ivory group-hover:text-coral transition-colors flex items-center gap-1">
                      <span>linkedin.com/in/prasad-deepak</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs flex flex-col gap-3 text-xs font-mono uppercase tracking-[0.1em] text-mute">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-coral" />
                <span>Bengaluru, India / Open to Remote & Global Relocation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-coral" />
                <span>Typically responds within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="md:col-span-3">
            <div className="p-6 sm:p-8 rounded-[20px] bg-ghost border border-[var(--rule)] shadow-2xs">
              <h2
                className="font-display text-xl font-bold text-ivory mb-2"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                Send a message
              </h2>
              <p className="font-body text-xs sm:text-sm text-mute mb-6">
                Whether you’re hiring, exploring product advisory, or discussing a 0→1 problem, feel free to reach out.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-[20px] bg-ghost border border-coral/40 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-ghost border border-coral text-coral flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4
                    className="font-display text-lg font-bold text-ivory"
                    style={{ fontVariationSettings: '"wdth" 92' }}
                  >
                    Message received!
                  </h4>
                  <p className="font-body text-xs sm:text-sm text-mute max-w-sm">
                    Thank you for getting in touch. I will review your note and respond to <span className="font-semibold text-coral">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-2 text-xs font-mono uppercase tracking-[0.12em] font-semibold text-coral hover:underline cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-sm"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.14em] text-mute mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--rule)] bg-void/70 focus:bg-void focus:outline-none focus:ring-2 focus:ring-coral/50 text-sm font-body text-ivory placeholder:text-mute/50"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-xs uppercase tracking-[0.14em] text-mute mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--rule)] bg-void/70 focus:bg-void focus:outline-none focus:ring-2 focus:ring-coral/50 text-sm font-body text-ivory placeholder:text-mute/50"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.14em] text-mute mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Senior PM role / Product Advisory / Hello"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--rule)] bg-void/70 focus:bg-void focus:outline-none focus:ring-2 focus:ring-coral/50 text-sm font-body text-ivory placeholder:text-mute/50"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.14em] text-mute mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share context on your product, team, or opportunity..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[var(--rule)] bg-void/70 focus:bg-void focus:outline-none focus:ring-2 focus:ring-coral/50 text-sm font-body text-ivory placeholder:text-mute/50 resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-form-submit"
                    className="mt-2 w-full py-3 rounded-xl bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase text-xs tracking-[0.14em] font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
                  >
                    <Send size={15} />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
