import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ id, experience, onHover, onClick, isActive, isMobile, controlsId }) => {
  return (
    <motion.div
      id={id}
      onClick={isMobile ? onClick : undefined}
      onMouseEnter={!isMobile ? onHover : undefined}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onClick(); }
      }}
      aria-expanded={isActive}
      aria-controls={controlsId}
      whileHover={{ x: 4 }}
      whileTap={{ scale: 0.99 }}
      className={`group cursor-pointer p-6 rounded-2xl relative transition-all duration-200 border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]/60 ${
        isActive
          ? "bg-white/5 border-white/10"
          : "border-transparent hover:bg-white/[0.03] hover:border-white/[0.06]"
      }`}
    >
      {/* Blue left accent bar */}
      {isActive && (
        <div className="absolute left-0 top-4 bottom-4 w-[3px] bg-[#0071e3] rounded-full" />
      )}

      <div className={isActive ? "pl-4" : ""}>
        <h3
          className={`text-xl lg:text-2xl font-semibold tracking-tight transition-colors ${
            isActive ? "text-white" : "text-[#a1a1a6] group-hover:text-white"
          }`}
        >
          {experience.title}
        </h3>
        <p
          className={`text-base mt-1 transition-colors ${
            isActive ? "text-[#a1a1a6]" : "text-[#6e6e73]"
          }`}
        >
          {experience.company_name}
          {experience.date ? ` · ${experience.date}` : ""}
        </p>
      </div>

      {/* Chevron */}
      <svg
        className={`hidden sm:block absolute right-5 top-1/2 -translate-y-1/2 h-4 w-4 transition-all duration-200 ${
          isActive ? "text-[#0071e3] rotate-90" : "text-[#48484a] rotate-0"
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
          clipRule="evenodd"
        />
      </svg>
    </motion.div>
  );
};

const ExperienceDetails = ({ experience }) => {
  return (
    <div className="mt-3">
      <div className="apple-glass p-6 lg:p-8">
        <ul className="space-y-5">
          {experience.details.map((detail, index) => (
            <li
              key={`experience-detail-${index}`}
              className="text-[#d1d1d6] text-sm md:text-base lg:text-lg leading-relaxed flex gap-3"
              dangerouslySetInnerHTML={{ __html: `<span class="text-[#0071e3] font-bold select-none">—</span> ${detail}` }}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

const Experience = () => {
  const [selectedJob, setSelectedJob] = useState(experiences[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sm:my-16 px-6 md:px-20 lg:px-40">
      <motion.div variants={textVariant()}>
        <p className={styles.sectionEyebrow}>Career</p>
        <h2 className={styles.sectionText}>Experience</h2>
      </motion.div>

      <div className="relative mt-10 md:mt-16 md:px-4 flex flex-col gap-3">
        {experiences.map((experience, index) => (
          <div key={`experience-row-${index}`} className="w-full sm:grid sm:grid-cols-2 sm:gap-6">
            <ExperienceCard
              id={`exp-${index}`}
              experience={experience}
              onHover={() => setSelectedJob(experience)}
              onClick={() => {
                const isOpening = selectedJob !== experience;
                setSelectedJob((prev) => prev === experience ? null : experience);
                if (isMobile && isOpening) {
                  requestAnimationFrame(() => {
                    document.getElementById(`exp-${index}`)?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                    });
                  });
                }
              }}
              isActive={selectedJob === experience}
              isMobile={isMobile}
              controlsId={`exp-details-${index}`}
            />

            {/* Desktop details */}
            <div className="hidden sm:block min-h-[180px]">
              <AnimatePresence mode="popLayout" initial={false}>
                {selectedJob === experience && (
                  <motion.div
                    key={experience.title}
                    id={`exp-details-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <ExperienceDetails experience={experience} />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile inline details */}
            <AnimatePresence initial={false}>
              {isMobile && selectedJob === experience && (
                <motion.div
                  id={`exp-details-${index}`}
                  className="sm:hidden col-span-2 px-1"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18 }}
                >
                  <ExperienceDetails experience={experience} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
