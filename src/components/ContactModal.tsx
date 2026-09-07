"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, Mail, Linkedin, Github, Send, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";

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
      className="fixed inset-0 z-[300] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-md cursor-pointer"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xl bg-white rounded-[32px] p-6 sm:p-8 shadow-2xl border border-[#042718]/10 relative overflow-hidden text-left cursor-default"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#042718]/10">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-[#E4F2EB] flex items-center justify-center text-[#188E39]">
              <Calendar size={20} />
            </div>
            <div>
              <h3 className="font-onest text-xl font-bold text-[#042718]">
                Get in Touch with Deepak
              </h3>
              <p className="font-inter text-xs text-[#042718]/60">
                Usually responds within 24 hours
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#042718]/5 text-[#042718]/60 hover:text-[#042718] transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {sent ? (
          <div className="py-12 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-[#E4F2EB] flex items-center justify-center text-[#188E39] mb-4 animate-bounce">
              <CheckCircle2 size={32} />
            </div>
            <h4 className="font-onest text-2xl font-bold text-[#042718] mb-2">
              Message Received!
            </h4>
            <p className="font-inter text-sm text-[#042718]/70 max-w-xs">
              Thank you for reaching out. Deepak will review your note and get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Subject Selector */}
            <div>
              <label className="block font-inter text-xs font-bold uppercase tracking-wider text-[#042718]/70 mb-2">
                Collaboration Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {subjectOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setSubject(opt)}
                    className={
                      "p-2.5 rounded-xl font-inter text-xs text-left transition-all cursor-pointer border " +
                      (subject === opt
                        ? "bg-[#042718] text-white border-[#042718] font-semibold shadow-xs"
                        : "bg-[#FAFDFB] text-[#042718]/80 border-[#042718]/10 hover:border-[#188E39]/40")
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
                <label className="block font-inter text-xs font-semibold text-[#042718]/70 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/15 font-inter text-sm text-[#042718] outline-none focus:border-[#188E39]"
                />
              </div>

              <div>
                <label className="block font-inter text-xs font-semibold text-[#042718]/70 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@company.com"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/15 font-inter text-sm text-[#042718] outline-none focus:border-[#188E39]"
                />
              </div>
            </div>

            {/* Message Area */}
            <div>
              <label className="block font-inter text-xs font-semibold text-[#042718]/70 mb-1">
                Project Context / Message
              </label>
              <textarea
                rows={3}
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Tell Deepak about your product vision, challenges, or timeline..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#FAFDFB] border border-[#042718]/15 font-inter text-sm text-[#042718] outline-none focus:border-[#188E39] resize-none"
              />
            </div>

            {/* Action Buttons */}
            <div className="pt-3 border-t border-[#042718]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3 text-xs text-[#042718]/70 font-inter">
                <a
                  href="https://www.linkedin.com/in/prasad-deepak/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#188E39] flex items-center gap-1 font-medium"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn</span>
                </a>
                <span>•</span>
                <a
                  href="https://github.com/shipwithdeepak-code"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#188E39] flex items-center gap-1 font-medium"
                >
                  <Github size={14} />
                  <span>GitHub</span>
                </a>
                <span>•</span>
                <a
                  href="mailto:shipwithdeepak@gmail.com"
                  className="hover:text-[#188E39] flex items-center gap-1 font-medium text-[#188E39]"
                >
                  <Mail size={14} />
                  <span>shipwithdeepak@gmail.com</span>
                </a>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#042718] hover:bg-[#042718]/90 text-white font-inter font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
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
