import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Linkedin, FileDown, ArrowUp, Calendar } from "lucide-react";
import { CALENDLY_URL } from "../utils/calendly";

interface FooterProps {
  onNavigate: (path: string) => void;
  onOpenResumeModal?: () => void;
}

export default function Footer({ onNavigate, onOpenResumeModal }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full bg-[#042718] text-white pt-20 pb-12 overflow-hidden relative">
      {/* Background subtle glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-72 bg-[#188E39]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Section */}
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-6 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-inter font-medium text-[#E0F3FE]"
          >
            <span className="w-2 h-2 rounded-full bg-[#188E39] animate-pulse" />
            <span>Available for Senior Product Opportunities</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-onest text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.15]"
          >
            Have a product problem worth unpacking?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-inter text-base sm:text-lg text-white/75 leading-relaxed max-w-2xl"
          >
            I’m open to Senior Product Management opportunities, product strategy conversations, and interesting 0→1 problems across B2B, AI and consumer platforms.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3.5 pt-2"
          >
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener"
              id="footer-book-chat-cta"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#188E39] hover:bg-[#15803D] text-white font-inter text-sm font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              <Calendar size={16} />
              <span>Book a Chat</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="mailto:shipwithdeepak@gmail.com"
              id="footer-email-cta"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-inter text-sm font-semibold transition-all duration-300 cursor-pointer"
            >
              <Mail size={16} />
              <span>Email me</span>
              <ArrowUpRight size={15} />
            </a>

            <a
              href="https://www.linkedin.com/in/prasad-deepak/"
              target="_blank"
              rel="noopener noreferrer"
              id="footer-linkedin-cta"
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-inter text-sm font-semibold transition-all duration-300 cursor-pointer"
            >
              <Linkedin size={16} />
              <span>LinkedIn</span>
              <ArrowUpRight size={15} />
            </a>

            <button
              type="button"
              id="footer-resume-download"
              onClick={() => {
                if (onOpenResumeModal) onOpenResumeModal();
                else onNavigate("/resume");
              }}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-white font-inter text-sm font-semibold transition-all duration-300 cursor-pointer"
            >
              <FileDown size={16} />
              <span>Download resume</span>
            </button>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 my-10" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 text-sm font-inter text-white/60">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center font-onest font-bold text-white text-xs">
              DP
            </div>
            <div>
              <span className="text-white font-medium">Deepak Prasad</span>
              <span className="mx-2 text-white/30">·</span>
              <span>Senior Product Manager</span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => onNavigate("/work")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Work
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/about")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              About
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/resume")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Resume
            </button>
            <button
              type="button"
              onClick={() => onNavigate("/contact")}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact
            </button>
            <button
              type="button"
              onClick={scrollToTop}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-colors cursor-pointer ml-2"
              aria-label="Back to top"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
