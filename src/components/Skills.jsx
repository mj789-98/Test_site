import { motion } from "framer-motion";
import React from "react";

import { skills } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const SkillsGrid = () => {
  if (!skills || skills.length === 0) {
    return <p className="text-[#6e6e73] text-center md:text-left">Skills coming soon.</p>;
  }

  return (
    <motion.div
      variants={fadeIn("up", "spring", 0.1, 0.75)}
      className="mt-10 md:mt-14 flex flex-wrap gap-3"
    >
      {skills.map((skill, idx) => (
        <motion.span
          key={`skill-${idx}`}
          whileHover={{ y: -2, scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="skill-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
          tabIndex={0}
          title={typeof skill === "string" ? skill : skill?.name}
        >
          {typeof skill === "string" ? skill : skill?.name}
        </motion.span>
      ))}
    </motion.div>
  );
};

const Skills = () => {
  return (
    <div className="md:px-20 lg:px-40">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionEyebrow}>Expertise</p>
        <h2 className={styles.sectionText}>Skills</h2>
      </motion.div>
      <SkillsGrid />
    </div>
  );
};

export default SectionWrapper(Skills, "skills");
