import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import { portfolio } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const ProjectCard = ({ index, name, description, image, link }) => {
  const controls = useAnimation();
  const { ref, inView } = useInView({ threshold: 0.1 });

  useEffect(() => {
    if (inView) controls.start("show");
  }, [controls, inView]);

  const isEven = index % 2 === 0;

  const CardContent = (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={fadeIn("up", "spring", 0, 0.6)}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 280, damping: 20 }}
      className={`group project-card apple-card w-full overflow-hidden flex flex-col md:flex-row ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } ${link ? "cursor-pointer" : ""}`}
    >
      {/* Image side */}
      <div className="w-full md:w-3/5 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-auto object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          style={{ borderRadius: 0, maxHeight: 420 }}
        />
      </div>

      {/* Text side */}
      <div
        className={`w-full md:w-2/5 px-8 py-10 md:py-14 flex flex-col justify-center ${
          isEven ? "md:text-left" : "md:text-right"
        }`}
      >
        <p className="text-[#0071e3] text-[12px] font-semibold tracking-[0.06em] uppercase mb-3">
          Project
        </p>
        <h3 className="text-white font-semibold text-2xl md:text-3xl lg:text-4xl tracking-tight leading-tight mb-4">
          {name}
        </h3>
        <p className="text-[#6e6e73] text-sm md:text-base leading-relaxed">
          {description}
        </p>
        {link && (
          <div className={`mt-6 ${isEven ? "" : "md:flex md:justify-end"}`}>
            <span className="inline-flex items-center gap-1.5 text-[#0071e3] text-sm font-medium">
              View on Play Store
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
      <a href={link} target="_blank" rel="noopener noreferrer" className="block">
        {CardContent}
      </a>
    );
  }

  return CardContent;
};

const Portfolio = () => {
  return (
    <div className="md:px-20 lg:px-40">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionEyebrow}>My Work</p>
        <h2 className={styles.sectionText}>Portfolio</h2>
      </motion.div>

      <div className="mt-12 md:mt-20 flex flex-col gap-6 md:gap-8">
        {portfolio.map((project, index) => (
          <ProjectCard key={`project-${index}`} index={index} {...project} />
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Portfolio, "portfolio");
