import { motion } from "framer-motion";
import React from "react";

import { skills } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const SkillsGrid = () => {
  if (!skills || skills.length === 0) {
    return (
      <p className="text-secondary text-center md:text-left">
        Skills coming soon.
      </p>
    );
  }

  return (
    <motion.ul
      variants={fadeIn("up", "spring", 0.1, 0.75)}
      className="mt-10 md:mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6"
    >
      {skills.map((skill, idx) => (
        <motion.li
          key={`skill-${idx}`}
          whileHover={{ y: -2, scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          className="px-4 py-2 md:px-5 md:py-3 rounded-full border border-slate-700/60 bg-black/30 text-white text-xs sm:text-sm md:text-base font-semibold transition-all duration-200 ease-out hover:bg-black/50 hover:border-slate-500/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-quaternary"
          title={typeof skill === "string" ? skill : skill?.name}
          tabIndex={0}
        >
          {typeof skill === "string" ? skill : skill?.name}
        </motion.li>
      ))}
    </motion.ul>
  );
};

const Skills = () => {
  return (
    <div className="text-center md:text-left md:px-20 lg:px-40">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionText}`}>Skills</h2>
      </motion.div>

      <SkillsGrid />
    </div>
  );
};

export default SectionWrapper(Skills, "skills");
