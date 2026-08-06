import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { portfolio } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, tag, description, image, link }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("show");
  }, [controls, inView]);

  const CardContent = (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", index * 0.1, 0.6)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={`group project-card apple-card h-full w-full overflow-hidden flex flex-col ${
        link ? "cursor-pointer" : ""
      }`}
    >
      {/* Image */}
      <div className="relative w-full aspect-video overflow-hidden bg-[#0a0a0a]">
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          style={{ borderRadius: 0, maxHeight: "none" }}
        />
        <div className="absolute inset-0 ring-1 ring-inset ring-white/10 pointer-events-none" />
      </div>

      {/* Text */}
      <div className="flex flex-col flex-1 px-4 py-4">
        <h3 className="text-white font-semibold text-base tracking-tight leading-snug mb-1.5">
          {name}
          {tag && (
            <span className="text-[#6e6e73] font-normal text-[13px]"> ({tag})</span>
          )}
        </h3>
        <p className="text-[#6e6e73] text-[13px] leading-relaxed">{description}</p>
        {link && (
          <div className="mt-3">
            <span className="inline-flex items-center gap-1.5 text-[#0071e3] text-sm font-medium">
              {link.includes("itch.io") ? "Play on itch.io" : "View on Play Store"}
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );

  if (link) {
    return (
      <a href={link} target="_blank" rel="noopener noreferrer" className="block h-full">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const Portfolio = () => {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-6">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionEyebrow}>My Work</p>
        <h2 className={styles.sectionText}>Portfolio</h2>
      </motion.div>

      <div className="mt-8 md:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-[18px]">
        {portfolio.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Portfolio, "portfolio");
