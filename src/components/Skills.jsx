import { motion } from "framer-motion";
import React from "react";

import { skillGroups } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { fadeIn, textVariant } from "../utils/motion";

const SkillsGrid = () => {
  if (!skillGroups || skillGroups.length === 0) {
    return <p className="text-[#6e6e73] text-center md:text-left">Skills coming soon.</p>;
  }

  return (
    <div className="mt-10 md:mt-14 flex flex-col gap-10">
      {skillGroups.map((group, groupIdx) => (
        <motion.div
          key={group.label}
          variants={fadeIn("up", "spring", 0.1 + groupIdx * 0.1, 0.75)}
        >
          <p className="text-[#6e6e73] text-[13px] font-semibold tracking-[0.08em] uppercase mb-4">
            {group.label}
          </p>
          <div className="flex flex-wrap gap-3">
            {group.items.map((skill) => (
              <motion.span
                key={skill}
                whileHover={{ y: -2, scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="skill-pill focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
                tabIndex={0}
                title={skill}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const Skills = () => {
  return (
    <div className="px-6 md:px-20 lg:px-40">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionEyebrow}>Expertise</p>
        <h2 className={styles.sectionText}>Skills</h2>
      </motion.div>
      <SkillsGrid />
    </div>
  );
};

export default SectionWrapper(Skills, "skills");
