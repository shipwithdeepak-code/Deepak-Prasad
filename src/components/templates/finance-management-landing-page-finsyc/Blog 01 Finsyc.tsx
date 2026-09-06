"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, BookOpen, Clock } from "lucide-react";

const getTagStyles = (tag: string): string => {
  const t = tag.toLowerCase();
  if (t === "ai" || t === "ml") return "bg-[#E0F3FE] text-[#0268A1]";
  if (t === "marketplace" || t === "b2b") return "bg-[#DCFCE7] text-[#15803D]";
  if (t === "growth" || t === "retention") return "bg-[#FEF2C6] text-[#B45209]";
  return "bg-[#F4FAFA] text-[#052618]/60";
};

interface ArticleCardProps {
  image: string;
  readTime: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  imageTop?: boolean;
  delay?: number;
  onOpen?: () => void;
}

function ArticleCard({
  image,
  readTime,
  category,
  title,
  description,
  tags,
  imageTop = true,
  delay = 0,
  onOpen,
}: ArticleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      onClick={onOpen}
      className="group cursor-pointer flex flex-col items-start bg-white hover:bg-[#F9FCFA] rounded-[28px] overflow-hidden border border-[#052618]/10 shadow-[0_4px_24px_rgba(4,39,24,0.02)] hover:shadow-[0_20px_60px_rgba(4,39,24,0.08)] transition-all duration-500 w-full lg:w-[612px]"
    >
      {imageTop && (
        <div className="w-full h-[240px] md:h-[300px] overflow-hidden relative">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold font-inter text-[#042718]">
            {category}
          </div>
        </div>
      )}

      <div className="flex flex-col p-6 md:p-8 gap-4 w-full self-stretch">
        <div className="flex items-center gap-2 text-[#052618]/60 font-inter text-xs">
          <Clock size={14} />
          <span>{readTime}</span>
        </div>

        <h3 className="text-[#052618] font-onest text-2xl md:text-[26px] font-bold leading-snug tracking-tight group-hover:text-[#188E39] transition-colors">
          {title}
        </h3>

        <p className="text-[#052618]/70 font-inter text-sm md:text-base leading-relaxed">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {tags.map((tag: string, i: number) => (
            <div
              key={i}
              className={"px-2.5 py-1 rounded-md text-center font-inter text-xs font-semibold " + getTagStyles(tag)}
            >
              {tag}
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#052618]/10 flex items-center justify-between text-xs font-bold text-[#052618] group-hover:text-[#188E39] transition-colors">
          <span>Read Case Article</span>
          <ArrowRight size={15} />
        </div>
      </div>

      {!imageTop && (
        <div className="w-full h-[240px] md:h-[300px] overflow-hidden relative">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-md text-xs font-bold font-inter text-[#042718]">
            {category}
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function Blog01Finsyc({
  className,
  onOpenCaseStudy,
}: {
  className?: string;
  onOpenCaseStudy?: (id?: string) => void;
}) {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Onest:wght@400;500;600;700&family=Playfair+Display:ital,wght@1,600&display=swap"
        rel="stylesheet"
      />

      <section
        id="writing"
        className={"w-full bg-[#FAFDFB] py-20 lg:py-32 flex justify-center border-t border-[#042718]/5 " + (className || "")}
      >
        <div className="w-full max-w-[1440px] px-6 lg:px-[96px]">
          <div className="w-full max-w-[1248px] mx-auto">
            {/* Header Content */}
            <div className="flex flex-col items-center text-center mb-12 md:mb-[80px]">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E4F2EB] border border-[#188E39]/15 mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#188E39]" />
                <span className="text-[#188E39] text-xs font-inter font-bold uppercase tracking-wider">
                  Product Writing & Insights
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="text-[34px] sm:text-[44px] md:text-[54px] font-onest font-semibold text-[#052618] leading-[1.12] tracking-tight md:tracking-[-2px] mb-6 max-w-3xl"
              >
                Writing on product craft, <span className="font-playfair italic font-medium text-black/40">systems</span> & AI
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-[15px] md:text-[18px] text-[#052618]/70 leading-relaxed max-w-[620px] font-inter"
              >
                Reflections on physical-digital workflows, marketplace liquidity, assisted AI tools, and behavioral habit loops.
              </motion.p>
            </div>

            {/* Articles Grid */}
            <div className="flex flex-col lg:flex-row gap-6 justify-center">
              <ArticleCard
                image="https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&auto=format&fit=crop"
                readTime="8 min read · Essay"
                category="Marketplace Operations"
                title="The Product is the Workflow: Lessons from 4:30 AM Indian Mandis"
                description="Why standard software assumptions break down in high-stress physical markets and how designing state machines around custody handoffs unlocked adoption."
                tags={["Marketplace", "B2B", "Field Research"]}
                imageTop={true}
                delay={0.2}
                onOpen={() => onOpenCaseStudy && onOpenCaseStudy("reshamandi-b2b")}
              />
              <ArticleCard
                image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop"
                readTime="6 min read · Case Study"
                category="AI & Computer Vision"
                title="Designing ML Quality Grading for Rural Operators in Harsh Conditions"
                description="How we eliminated subjective eye-test disputes and calibrated computer vision models for high-glare, dusty agricultural environments."
                tags={["AI", "ML", "Assisted-Tech"]}
                imageTop={false}
                delay={0.3}
                onOpen={() => onOpenCaseStudy && onOpenCaseStudy("reshamandi-b2b")}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
