import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles } from 'lucide-react';

export interface GalleryImage {
  id: string;
  url: string;
  label: string;
  prompt: string;
}

export const IMAGES: GalleryImage[] = [
  {
    id: 'cyberpunk',
    url: 'https://images.unsplash.com/photo-1605142859862-978be7eba909?q=80&w=800&auto=format&fit=crop',
    label: 'Cyberpunk',
    prompt:
      'a sprawling cyberpunk city at night, neon lights reflecting on wet pavement, flying vehicles, futuristic architecture...',
  },
  {
    id: 'oasis',
    url: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?q=80&w=800&auto=format&fit=crop',
    label: 'Oasis',
    prompt:
      'a hidden desert oasis with crystal clear turquoise water, palm trees, golden sand dunes, cinematic lighting...',
  },
  {
    id: 'global-network',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop',
    label: 'Global Network',
    prompt:
      'a global digital network connecting the entire world, glowing data streams, futuristic technology, cinematic lighting...',
  },
  {
    id: 'poppy-field',
    url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
    label: 'Poppy Field',
    prompt:
      'a beautiful redhead woman looking at the camera in a field of poppies, a soft breeze, cinematic...',
  },
];

export const navLinks = [
  'Use Cases',
  'Why Erie',
  'Pricing',
  'FAQ',
  'Tutorials',
];

interface KeloHeroProps {
  className?: string;
}

export default function KeloHero({ className = '' }: KeloHeroProps) {
  // activeImage defaults to IMAGES[3] (the Poppy Field)
  const [activeImage, setActiveImage] = useState<GalleryImage>(IMAGES[3]);
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyPrompt = useCallback(() => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(activeImage.prompt).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    } else {
      // Fallback
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }, [activeImage.prompt]);

  return (
    <section
      id="kelo-hero"
      className={`relative min-h-screen w-full overflow-hidden font-sans bg-black select-none ${className}`}
    >
      {/* Scoped CSS for responsive overrides */}
      <style>{`
        @media (max-width: 1024px) {
          #kelo-hero main {
            flex-direction: column !important;
            text-align: center !important;
            padding-top: 120px !important;
          }
          #kelo-hero h1 {
            font-size: 48px !important;
          }
          #kelo-hero p {
            margin-left: auto !important;
            margin-right: auto !important;
          }
        }
      `}</style>

      {/* 1. Background video + overlay */}
      <video
        id="kelo-bg-video"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source
          src="https://cdn.jiro.build/Kelo/i-want-all-the-flowers-in-this-image-to-move-there.mp4"
          type="video/mp4"
        />
      </video>
      <div id="kelo-video-overlay" className="absolute inset-0 bg-black/40 z-0" />

      {/* 2. Navbar (floating pill) */}
      <header className="absolute top-8 left-0 w-full flex justify-center px-4 sm:px-8 md:px-[60px] z-[100]">
        <nav
          id="kelo-navbar"
          className="flex items-center justify-between w-full max-w-[1200px] p-2 pl-6 sm:pl-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
        >
          {/* Logo */}
          <a
            id="kelo-logo-link"
            href="#"
            className="flex items-center group cursor-pointer"
          >
            <img
              id="kelo-logo-img"
              src="https://cdn.jiro.build/Kelo/Kelo%20White.svg"
              alt="Kelo Logo"
              className="h-[20px] w-auto transition-transform duration-300 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Nav links */}
          <div id="kelo-nav-links" className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const href = `#${link.toLowerCase().replace(/\s+/g, '-')}`;
              return (
                <a
                  key={link}
                  id={`kelo-nav-link-${link.toLowerCase().replace(/\s+/g, '-')}`}
                  href={href}
                  className="text-white/70 text-[13px] font-medium hover:text-white transition-all duration-200 relative group/link py-1"
                >
                  {link}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#01bc7c] transition-all duration-300 group-hover/link:w-full" />
                </a>
              );
            })}
          </div>

          {/* Right group */}
          <div id="kelo-nav-right" className="flex items-center gap-4 sm:gap-6">
            <a
              id="kelo-explore-creations-link"
              href="#explore"
              className="hidden sm:block text-white/70 text-[13px] font-medium hover:text-white transition-colors duration-200"
            >
              Explore creations
            </a>
            <button
              id="kelo-get-started-btn"
              type="button"
              className="bg-white text-black px-5 py-2 rounded-full text-[13px] font-bold hover:bg-[#01bc7c] hover:text-white transition-all duration-300 shadow-lg shadow-black/20 cursor-pointer active:scale-95"
            >
              Get Started
            </button>
          </div>
        </nav>
      </header>

      {/* 3. Hero content (<main>) */}
      <main
        id="kelo-hero-main"
        className="relative z-10 flex flex-col lg:flex-row items-center justify-center min-h-screen px-6 md:px-[60px] pt-[144px] pb-20 gap-10 lg:gap-20 max-w-[1400px] mx-auto"
      >
        {/* Left column */}
        <div
          id="kelo-left-column"
          className="flex-1 max-w-[580px] mt-10 lg:mt-0"
        >
          <motion.h1
            id="kelo-hero-headline"
            className="text-white text-[42px] md:text-[64px] font-extrabold leading-[1.05] tracking-[-0.02em] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.1,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            Create anything
            <br />
            you can imagine.
          </motion.h1>

          <motion.p
            id="kelo-hero-description"
            className="text-white/75 text-base leading-[1.65] max-w-[480px] mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.2,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            The most powerful AI image and video generation engine. Turn words
            or sketches into photorealistic visuals in seconds. No design skills
            needed.
          </motion.p>

          <motion.div
            id="kelo-cta-row"
            className="flex items-center gap-5 flex-wrap sm:flex-nowrap justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.3,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {/* Start creating button */}
            <button
              id="kelo-start-creating-btn"
              type="button"
              className="group relative flex items-center gap-3 bg-gradient-to-br from-[#01bc7c] to-[#01a26c] text-white pl-7 pr-6 py-4 rounded-full text-[15px] font-bold shadow-[0_10px_30px_-10px_rgba(0,188,125,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(0,188,125,0.6)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <span>Start creating</span>
              <div className="w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center transition-transform duration-300">
                <Sparkles
                  size={16}
                  fill="currentColor"
                  className="transition-transform duration-300 group-hover:rotate-12"
                />
              </div>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none" />
            </button>

            {/* See use cases button */}
            <a
              id="kelo-see-use-cases-btn"
              href="#use-cases"
              className="group flex items-center gap-2.5 px-7 py-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[15px] font-bold hover:bg-white/20 hover:border-white/30 transition-all duration-300 cursor-pointer"
            >
              <span>See use cases</span>
              <span className="text-white/60 group-hover:text-white transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 inline-block">
                ↗
              </span>
            </a>
          </motion.div>
        </div>

        {/* Right column — glass phone card */}
        <motion.div
          id="kelo-phone-card"
          className="w-full max-w-[380px] shrink-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.8,
            delay: 0.2,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <div
            id="kelo-glass-outer-card"
            className="bg-white/15 backdrop-blur-[20px] border-[1.5px] border-white/40 rounded-[28px] p-3 shadow-[0_20px_60px_rgba(0,0,80,0.2)]"
          >
            {/* Main image area */}
            <div
              id="kelo-main-image-viewport"
              className="relative h-[440px] rounded-[20px] overflow-hidden bg-white/5"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage.id}
                  id={`kelo-active-image-${activeImage.id}`}
                  src={activeImage.url}
                  alt={activeImage.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Top-left badge: ▣ 4k */}
              <div
                id="kelo-badge-4k"
                className="absolute top-3 left-3 px-3 py-1.5 bg-black/45 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5 text-white"
              >
                <span className="text-[11px] opacity-80 leading-none">▣</span>
                <span className="text-[12px] font-semibold leading-none">4k</span>
              </div>

              {/* Top-right badge: ✦ Video Model v7 */}
              <div
                id="kelo-badge-model"
                className="absolute top-3 right-3 px-3.5 py-1.5 bg-black/45 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-1.5 text-white"
              >
                <span className="text-[12px] text-[#01bc7c] leading-none">✦</span>
                <span className="text-[12px] font-semibold leading-none">
                  Video Model v7
                </span>
              </div>

              {/* Bottom overlay row */}
              <div
                id="kelo-image-bottom-overlay"
                className="absolute bottom-0 left-0 right-0 p-4 pt-10 bg-gradient-to-t from-black/70 to-transparent flex items-center gap-2.5 z-10"
              >
                {/* ✦ Avatar */}
                <div
                  id="kelo-prompt-avatar"
                  className="w-8 h-8 bg-white/15 border border-white/30 rounded-full flex items-center justify-center shrink-0 text-white text-xs backdrop-blur-sm"
                >
                  <span>✦</span>
                </div>

                {/* Prompt text */}
                <p
                  id="kelo-active-prompt-text"
                  className="flex-1 text-white/85 text-[12px] leading-tight line-clamp-2 select-text"
                >
                  {activeImage.prompt}
                </p>

                {/* Copy button */}
                <button
                  id="kelo-copy-prompt-btn"
                  type="button"
                  onClick={handleCopyPrompt}
                  className={`px-4 py-1.5 rounded-full text-[12px] font-semibold transition-all duration-200 shrink-0 cursor-pointer shadow-sm active:scale-95 ${
                    copied
                      ? 'bg-[#01bc7c] text-white'
                      : 'bg-white text-[#111] hover:bg-[#f5f4f5]'
                  }`}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            {/* Thumbnail strip */}
            <div id="kelo-thumbnail-strip" className="flex gap-2 mt-2.5">
              {IMAGES.map((img) => {
                const isActive = activeImage.id === img.id;
                return (
                  <button
                    key={img.id}
                    id={`kelo-thumbnail-${img.id}`}
                    type="button"
                    onMouseEnter={() => setActiveImage(img)}
                    onClick={() => setActiveImage(img)}
                    className={`flex-1 h-20 rounded-[14px] overflow-hidden cursor-pointer relative transition-all duration-300 p-0 text-left focus:outline-none ${
                      isActive
                        ? 'border-2 border-white/80 scale-[1.02] shadow-md'
                        : 'border border-white/20 opacity-80 hover:opacity-100 hover:border-white/50'
                    }`}
                  >
                    <img
                      src={img.url}
                      alt={img.label}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>
      </main>
    </section>
  );
}
