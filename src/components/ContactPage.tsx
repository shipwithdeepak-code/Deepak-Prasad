import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Clock,
  MapPin,
  Sparkles,
} from "lucide-react";

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
    <div className="w-full bg-[#FAFDFB] text-[#042718] py-12 md:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#042718]/5 text-xs font-inter font-semibold text-[#042718]/80 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#188E39] animate-pulse" />
            <span>Open for Senior Product Opportunities</span>
          </div>
          <h1 className="font-onest text-4xl sm:text-5xl font-bold tracking-tight text-[#042718] leading-[1.15] mb-4">
            Have a product problem worth unpacking?
          </h1>
          <p className="font-inter text-base sm:text-lg text-[#042718]/75 leading-relaxed font-normal max-w-2xl">
            I’m open to Senior Product Management opportunities, product strategy conversations, and interesting 0→1 problems across B2B, AI and consumer platforms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {/* Left Column: Direct Contacts */}
          <div className="md:col-span-2 flex flex-col gap-6">
            <div className="p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs">
              <span className="text-xs font-inter font-semibold uppercase tracking-wider text-[#042718]/40 block mb-4">
                Direct Channels
              </span>

              <div className="flex flex-col gap-4">
                <a
                  href="mailto:shipwithdeepak@gmail.com"
                  id="contact-email-link"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/8 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#042718]/5 flex items-center justify-center text-[#188E39] group-hover:bg-[#188E39] group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-inter text-[#042718]/50 block font-medium">
                      Email
                    </span>
                    <span className="font-inter text-sm font-semibold text-[#042718] group-hover:text-[#188E39] transition-colors">
                      shipwithdeepak@gmail.com
                    </span>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/prasad-deepak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-linkedin-link"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-[#FAFDFB] border border-transparent hover:border-[#042718]/8 transition-colors group cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full bg-[#042718]/5 flex items-center justify-center text-[#188E39] group-hover:bg-[#188E39] group-hover:text-white transition-colors">
                    <Linkedin size={18} />
                  </div>
                  <div>
                    <span className="text-[11px] font-inter text-[#042718]/50 block font-medium">
                      LinkedIn
                    </span>
                    <span className="font-inter text-sm font-semibold text-[#042718] group-hover:text-[#188E39] transition-colors flex items-center gap-1">
                      <span>linkedin.com/in/prasad-deepak</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </a>
              </div>
            </div>

            <div className="p-6 rounded-[20px] bg-white border border-[#042718]/8 shadow-2xs flex flex-col gap-3 text-xs font-inter text-[#042718]/70">
              <div className="flex items-center gap-2.5">
                <MapPin size={16} className="text-[#188E39]" />
                <span>Bengaluru, India · Open to Remote & Global Relocation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock size={16} className="text-[#188E39]" />
                <span>Typically responds within 24 hours</span>
              </div>
            </div>
          </div>

          {/* Right Column: Quick Contact Form */}
          <div className="md:col-span-3">
            <div className="p-6 sm:p-8 rounded-[24px] bg-white border border-[#042718]/8 shadow-2xs">
              <h3 className="font-onest text-xl font-bold text-[#042718] mb-2">
                Send a message
              </h3>
              <p className="font-inter text-xs sm:text-sm text-[#042718]/60 mb-6">
                Whether you’re hiring, exploring product advisory, or discussing a 0→1 problem, feel free to reach out.
              </p>

              {isSubmitted ? (
                <div className="p-8 rounded-[16px] bg-[#ECFDF5] border border-[#6EE7B7]/40 text-center flex flex-col items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#059669] text-white flex items-center justify-center">
                    <CheckCircle2 size={24} />
                  </div>
                  <h4 className="font-onest text-lg font-bold text-[#065F46]">
                    Message received!
                  </h4>
                  <p className="font-inter text-xs sm:text-sm text-[#047857] max-w-sm">
                    Thank you for getting in touch. I will review your note and respond to <span className="font-semibold">{formData.email}</span> within 24 hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", subject: "", message: "" });
                    }}
                    className="mt-2 text-xs font-inter font-semibold text-[#065F46] underline cursor-pointer"
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-inter text-xs font-medium text-[#042718]/70 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Sarah Connor"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#042718]/15 bg-[#FAFDFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#188E39]/30 text-sm font-inter text-[#042718]"
                      />
                    </div>

                    <div>
                      <label className="block font-inter text-xs font-medium text-[#042718]/70 mb-1.5">
                        Your Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="sarah@company.com"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#042718]/15 bg-[#FAFDFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#188E39]/30 text-sm font-inter text-[#042718]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-inter text-xs font-medium text-[#042718]/70 mb-1.5">
                      Subject
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Senior PM role / Product Advisory / Hello"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#042718]/15 bg-[#FAFDFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#188E39]/30 text-sm font-inter text-[#042718]"
                    />
                  </div>

                  <div>
                    <label className="block font-inter text-xs font-medium text-[#042718]/70 mb-1.5">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Share context on your product, team, or opportunity..."
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#042718]/15 bg-[#FAFDFB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#188E39]/30 text-sm font-inter text-[#042718] resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    id="contact-form-submit"
                    className="mt-2 w-full py-3 rounded-xl bg-[#042718] hover:bg-[#063b25] text-white font-inter text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
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
