"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Calendar, Mail, Linkedin, Github, Send, CheckCircle2 } from "lucide-react";
import { CONTACT_EMAIL, CONTACT_MAILTO, GITHUB_URL, LINKEDIN_URL } from "../utils/contact";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [subject, setSubject] = useState("Senior Product Leadership (Full-Time)");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" || e.key === "Esc") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keydown", handleKeyDown, true);
    return () => {
      document.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keydown", handleKeyDown, true);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => {
      setSent(false);
      onClose();
      setName("");
      setEmail("");
      setMessage("");
    }, 2500);
  };

  const subjectOptions = [
    "Senior Product Leadership (Full-Time)",
    "0→1 Product Discovery & MVP Sprint",
    "Marketplace & Escrow Systems Advisory",
    "Coffee / Casual Strategy Chat",
  ];

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl bg-void rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[var(--rule-strong)] relative overflow-hidden text-left cursor-default text-ivory"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[var(--rule)]">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-ghost border border-[var(--rule)] flex items-center justify-center text-coral">
              <Calendar size={20} />
            </div>
            <div>
              <h3
                className="font-display text-xl font-bold text-ivory"
                style={{ fontVariationSettings: '"wdth" 92' }}
              >
                Get in Touch with Deepak
              </h3>
              <p className="font-body text-xs text-mute">
                Usually responds within 24 hours
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-ghost text-mute hover:text-ivory transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
          >
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-ghost border border-coral flex items-center justify-center text-coral mb-4">
              <CheckCircle2 size={32} />
            </div>
            <h4
              className="font-display text-2xl font-bold text-ivory mb-2"
              style={{ fontVariationSettings: '"wdth" 92' }}
            >
              Message Received!
            </h4>
            <p className="font-body text-sm text-mute max-w-xs">
              Thank you for reaching out. Deepak will review your note and get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Subject Selector */}
            <div>
              <label className="block font-mono text-xs font-bold uppercase tracking-[0.16em] text-coral mb-2">
                Collaboration Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSubject(opt)}
                    className={
                      "p-2.5 rounded-xl font-body text-xs text-left transition-all cursor-pointer border active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral " +
                      (subject === opt
                        ? "bg-ghost text-ivory border-[var(--rule-strong)] font-semibold shadow-xs"
                        : "bg-void/60 text-mute border-[var(--rule)] hover:border-coral/40")
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            {/* Name & Email Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1">
              <div>
                <label className="block font-mono text-xs uppercase tracking-[0.12em] text-mute mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ghost border border-[var(--rule)] font-body text-sm text-ivory outline-none focus:border-coral placeholder:text-mute/50 focus-visible:ring-2 focus-visible:ring-coral"
                />
              </div>

              <div>
                <label className="block font-mono text-xs uppercase tracking-[0.12em] text-mute mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-ghost border border-[var(--rule)] font-body text-sm text-ivory outline-none focus:border-coral placeholder:text-mute/50 focus-visible:ring-2 focus-visible:ring-coral"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block font-mono text-xs uppercase tracking-[0.12em] text-mute mb-1">
                Project Context / Message
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell Deepak about your product vision, challenges, or timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-ghost border border-[var(--rule)] font-body text-sm text-ivory outline-none focus:border-coral placeholder:text-mute/50 resize-none focus-visible:ring-2 focus-visible:ring-coral"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[var(--rule)] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-mute font-mono uppercase tracking-[0.1em]">
                <a
                  href={LINKEDIN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-xs"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <span className="text-mute">/</span>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-coral flex items-center gap-1 font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-xs"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <span className="text-mute">/</span>
                <a
                  href={CONTACT_MAILTO}
                  className="hover:text-[#F6AE96] flex items-center gap-1 font-medium text-coral transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral rounded-xs"
                >
                  <Mail size={14} />
                  <span>{CONTACT_EMAIL}</span>
                </a>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-coral hover:bg-[#F6AE96] text-void font-mono uppercase tracking-[0.14em] font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-coral"
              >
                <span>Send Message</span>
                <Send size={14} />
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}
