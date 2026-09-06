"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import { Sparkles, ArrowLeft, ArrowRight, Star, Quote, Award } from "lucide-react";

// --- Counter Component ---

interface CounterProps {
  value: number;
  suffix: string;
}

function Counter({ value, suffix }: CounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const [displayNumber, setDisplayNumber] = useState(0);
  const isAnimatedRef = useRef(false);

  useEffect(() => {
    if (!isInView || isAnimatedRef.current) return;
    isAnimatedRef.current = true;

    let start = 0;
    const end = value;
    const duration = 1600; // 1.6s animation
    const startTime = performance.now();
    let animationFrameId: number;

    const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = start + (end - start) * easedProgress;

      setDisplayNumber(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCounter);
      } else {
        setDisplayNumber(end);
      }
    };

    animationFrameId = requestAnimationFrame(updateCounter);

    // Guaranteed fallback resolution
    const safetyTimeout = setTimeout(() => {
      setDisplayNumber(end);
    }, duration + 200);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(safetyTimeout);
    };
  }, [isInView, value]);

  const formattedDisplay =
    value % 1 !== 0
      ? displayNumber.toFixed(1)
      : Math.round(displayNumber).toString();

  return (
    <div ref={ref} className="flex justify-center items-baseline gap-[2px]">
      <span className="text-[#042718] font-onest text-[52px] font-semibold leading-[58px] tracking-[-1.8px] tabular-nums">
        {formattedDisplay}
      </span>
      <span className="text-black/40 font-onest text-[42px] font-semibold leading-[48px] tracking-[-2px]">
        {suffix}
      </span>
    </div>
  );
}

// --- MetricCard Component ---

function MetricCard({
  number,
  suffix,
  title,
  description,
  delay,
}: {
  key?: React.Key;
  number: number;
  suffix: string;
  title: string;
  description: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      className="flex flex-col items-start w-full sm:w-[380px]"
    >
      <div className="flex flex-col items-start w-full sm:w-[294px] p-[20px_24px] gap-2.5 rounded-[24px] bg-white/60 backdrop-blur-md border border-[#042718]/10 shadow-[0_8px_32px_rgba(4,39,24,0.04)]">
        <Counter value={number} suffix={suffix} />
        <p className="text-[#042718] font-onest text-[18px] font-bold leading-[28px]">
          {title}
        </p>
      </div>
      <p className="mt-4 text-[#042718] font-inter text-[15px] font-normal leading-[24px] tracking-[-0.3px] opacity-80 line-clamp-3 pr-[20px]">
        {description}
      </p>
    </motion.div>
  );
}

// --- Testimonial Data ---

interface Testimonial {
  id: number;
  text: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    text: "Deepak operates with a rare blend of ground reality and engineering empathy. He lived at 4:30 AM mandis to understand why our operators were hesitant, then built an escrow workflow that solved billions of rupees in physical cash friction.",
    name: "Saurabh Agarwal",
    role: "Co-Founder & CTO",
    company: "ReshaMandi",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop",
  },
  {
    id: 2,
    text: "Working with Deepak on our B2C SaaS product was transformative. He eliminated bloated feature roadmaps and focused entirely on the core habit loop, driving double-digit improvements in day-30 retention.",
    name: "Arjun Mehta",
    role: "VP of Product & Growth",
    company: "Sportstech Scaleup",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    id: 3,
    text: "Deepak doesn't just manage tickets; he defines the product thesis from first principles. His computer vision grading PRD was one of the most thorough and operationally grounded specs our engineering team has ever received.",
    name: "Priyanka Nair",
    role: "Director of Engineering (AI/ML)",
    company: "Agritech Platform",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop",
  },
  {
    id: 4,
    text: "His ability to navigate ambiguity and align diverse stakeholders — from rural mandi auctioneers to institutional fintech partners — is exceptional. Deepak builds systems that last.",
    name: "Vikram Sengupta",
    role: "Head of Operations & Supply",
    company: "B2B Marketplace",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
  },
];

const displayTestimonials: Testimonial[] = [...testimonials, ...testimonials, ...testimonials];

export default function MetricAndTestimonials({ className }: { className?: string }) {
  const metrics = [
    {
      number: 250,
      suffix: "K+",
      title: "Auctions & Transactions",
      description: "Spearheaded high-frequency physical & digital transactions with zero reconciliation fallout.",
    },
    {
      number: 99.9,
      suffix: "%",
      title: "Escrow Reliability",
      description: "Delivered automated weighbridge payout infrastructure operating seamlessly under peak load.",
    },
    {
      number: 4,
      suffix: " Tiers",
      title: "Ecosystem Integration",
      description: "Unified disparate agricultural nodes into a single trusted, data-driven network.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(testimonials.length);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [carouselWidth, setCarouselWidth] = useState(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(660);
  const gap = 24;

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!carouselTrackRef.current) return;
    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      if (entries[0]) {
        setCarouselWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(carouselTrackRef.current);
    return () => observer.disconnect();
  }, [isMounted]);

  useEffect(() => {
    if (isAutoPlaying && isMounted) {
      resetTimeout();
      timeoutRef.current = setTimeout(() => {
        setIsTransitioning(true);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 5000);
    }
    return () => resetTimeout();
  }, [currentIndex, isAutoPlaying, isMounted]);

  useEffect(() => {
    if (currentIndex >= testimonials.length * 2) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex((currentIndex % testimonials.length) + testimonials.length);
      }, 500);
      return () => clearTimeout(timer);
    }
    if (currentIndex < testimonials.length) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(currentIndex + testimonials.length);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  useEffect(() => {
    const handleResizeWidth = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setCardWidth(width - 48);
      } else if (width < 1024) {
        setCardWidth(500);
      } else {
        setCardWidth(660);
      }
    };
    handleResizeWidth();
    window.addEventListener("resize", handleResizeWidth);
    return () => window.removeEventListener("resize", handleResizeWidth);
  }, []);

  const handleNext = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  const handlePrev = () => {
    setIsAutoPlaying(false);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&display=swap"
        rel="stylesheet"
        crossOrigin="anonymous"
      />

      <div id="experience" className={"flex flex-col w-full " + (className || "")}>
        {/* Metrics Section */}
        <section className="w-full bg-[#FAFDFB] py-16 lg:pt-28 lg:pb-16 overflow-hidden flex justify-center border-t border-[#042718]/5">
          <div className="w-full max-w-[1248px] px-6 lg:px-0 flex flex-col items-center">
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15"
            >
              <Award size={14} className="text-[#188E39]" />
              <span className="font-inter text-xs font-bold text-[#188E39] uppercase tracking-wider">
                Leadership Rigor
              </span>
            </motion.div>

            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={{
                hidden: { opacity: 1 },
                visible: {
                  transition: {
                    staggerChildren: 0.012,
                  },
                },
              }}
              className="mt-6 sm:mt-8 w-full max-w-[970px] text-center font-onest text-[28px] sm:text-[36px] lg:text-[42px] font-semibold leading-[1.2] sm:leading-[44px] lg:leading-[48px] tracking-[-1.5px] sm:tracking-[-2px] text-[#042718]"
            >
              {"Building products that solve hard real-world problems, scale business models, and create lasting market infrastructure."
                .split("")
                .map((char: string, index: number) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { color: "#D1D5DB" },
                      visible: {
                        color: "#042718",
                        transition: { duration: 0.4, ease: "easeOut" as const },
                      },
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
            </motion.h2>

            <div className="mt-12 sm:mt-16 flex flex-col sm:flex-row flex-wrap justify-center lg:justify-between items-center sm:items-start gap-8 w-full">
              {metrics.map((metric, index: number) => (
                <MetricCard
                  key={index}
                  number={metric.number}
                  suffix={metric.suffix}
                  title={metric.title}
                  description={metric.description}
                  delay={0.2 + index * 0.1}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial Section */}
        <section className="w-full bg-[#FAFDFB] py-16 lg:pt-16 lg:pb-32 overflow-hidden flex justify-center">
          <div className="w-full max-w-[1440px] flex flex-col items-center overflow-hidden">
            <div className="w-full max-w-[1248px] px-6 lg:px-0 flex flex-col items-center text-center mt-0 mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#188E39]/10 border border-[#188E39]/15 mb-4">
                <Star className="w-3.5 h-3.5 text-[#188E39] fill-[#188E39]" />
                <span className="text-[13px] font-inter font-bold text-[#188E39] uppercase tracking-wider">
                  Peer & Founder Endorsements
                </span>
              </div>

              <h2 className="text-[#042718] font-onest text-[28px] sm:text-[36px] md:text-[48px] font-semibold leading-tight tracking-tight max-w-[720px] mb-4">
                What collaborators say <i className="text-[rgba(0,0,0,0.40)] font-playfair font-normal">about working</i> with Deepak
              </h2>

              <p className="text-[#042718]/80 font-inter text-base md:text-lg leading-relaxed max-w-[580px]">
                Perspectives from founders, engineering directors, and operations leaders on product craftsmanship and delivery speed.
              </p>
            </div>

            <div ref={carouselTrackRef} className="relative w-full overflow-visible">
              <div className="relative flex justify-start items-center overflow-visible min-h-[380px] md:min-h-[440px]">
                <motion.div
                  className="flex gap-6 items-center flex-nowrap"
                  animate={{
                    x: carouselWidth / 2 - cardWidth / 2 - currentIndex * (cardWidth + gap),
                  }}
                  transition={
                    isTransitioning
                      ? { type: "spring" as const, stiffness: 300, damping: 30 }
                      : { duration: 0 }
                  }
                >
                  {displayTestimonials.map((item: Testimonial, idx: number) => {
                    const isActive = idx === currentIndex;
                    return (
                      <div
                        key={item.id + "-" + idx}
                        className={
                          "relative flex flex-col items-center shrink-0 rounded-[24px] md:rounded-[30px] transition-all duration-500 overflow-hidden " +
                          "p-8 md:p-12 " +
                          (isActive
                            ? "border border-white/20 shadow-[0_20px_50px_rgba(4,39,24,0.12)] bg-[#042718]"
                            : "border border-[#042718]/10 bg-white/60")
                        }
                        style={{ width: cardWidth + "px" }}
                      >
                        {isActive && isMounted && (
                          <div className="absolute inset-0 z-0">
                            <video
                              autoPlay
                              loop
                              muted
                              playsInline
                              className="w-full h-full object-cover opacity-20"
                            >
                              <source
                                src="https://cdn.jiro.build/Amox/All%20Images/P01-Header-01-BG.mp4"
                                type="video/mp4"
                              />
                            </video>
                          </div>
                        )}

                        <div className="relative z-10 flex flex-col items-center w-full h-full justify-between">
                          <p
                            className={
                              "font-inter text-center transition-colors duration-500 font-medium " +
                              (isActive ? "text-white text-lg md:text-xl leading-relaxed" : "text-[#042718]/85 text-base md:text-lg leading-relaxed line-clamp-4")
                            }
                          >
                            {"“" + item.text + "”"}
                          </p>

                          <div className="flex flex-col items-center mt-6">
                            <div className="w-12 h-12 rounded-full overflow-hidden mb-2 border-2 border-[#188E39]">
                              <img
                                src={item.avatar}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>

                            <p
                              className={
                                "font-onest font-bold text-base transition-colors duration-500 " +
                                (isActive ? "text-white" : "text-[#042718]")
                              }
                            >
                              {item.name}
                            </p>

                            <p
                              className={
                                "font-inter text-xs transition-colors duration-500 " +
                                (isActive ? "text-[#34D399]" : "text-[#188E39] font-medium")
                              }
                            >
                              {item.role} · {item.company}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              <div className="absolute inset-y-0 left-0 w-[80px] md:w-[160px] z-20 pointer-events-none bg-gradient-to-r from-[#FAFDFB] via-[#FAFDFB]/70 to-transparent" />
              <div className="absolute inset-y-0 right-0 w-[80px] md:w-[160px] z-20 pointer-events-none bg-gradient-to-l from-[#FAFDFB] via-[#FAFDFB]/70 to-transparent" />
            </div>

            <div className="w-full max-w-[1248px] flex items-center justify-center gap-3 mt-10">
              <button
                type="button"
                onClick={() => handlePrev()}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border transition-all duration-300 flex items-center justify-center cursor-pointer border-[#042718]/10 bg-white hover:bg-white/80 shadow-xs"
              >
                <ArrowLeft className="w-5 h-5 text-[#042718]" />
              </button>
              <button
                type="button"
                onClick={() => handleNext()}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full transition-all duration-300 flex items-center justify-center cursor-pointer bg-[#042718] hover:bg-[#042718]/90 text-white shadow-md"
              >
                <ArrowRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
