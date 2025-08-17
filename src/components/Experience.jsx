import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect, useState } from "react";

import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({
  id,
  experience,
  onClick,
  isActive,
  isMobile,
  controlsId,
}) => {
  return (
    <motion.div
      id={id}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      aria-expanded={isActive}
      aria-controls={controlsId}
      className={`group cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center rounded-xl transition-colors duration-200 ${
        isActive || isMobile
          ? "bg-white/5"
          : "hover:bg-white/5 focus:bg-white/5"
      } ${
        isMobile ? "text-quaternary" : ""
      } focus:outline-none focus-visible:ring-2 focus-visible:ring-tertiary/60 transition-shadow hover:shadow-lg`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
    >
      {(isActive || isMobile) && (
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-5 bg-tertiary my-6 sm:block hidden"></div>
      )}
      <h3
        className={`text-xl lg:text-2xl xl:text-3xl font-bold sm:pl-8 transition-colors ${
          isActive || isMobile
            ? "text-quaternary"
            : "text-slate-600 group-hover:text-quaternary"
        }`}
      >
        {experience.title}
      </h3>
      <p
        className={`text-md lg:text-lg xl:text-2xl sm:font-medium pt-2 sm:pl-8 transition-colors ${
          isActive || isMobile ? "text-white" : "text-slate-600"
        }`}
      >
        {experience.company_name}
        {experience.date ? ` | ${experience.date}` : ""}
      </p>
      {/* Chevron indicator */}
      <svg
        className={`hidden sm:block absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 transition-transform ${
          isActive ? "rotate-180" : "rotate-0"
        }`}
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.17l3.71-2.94a.75.75 0 111.04 1.08l-4.24 3.36a.75.75 0 01-.94 0L5.21 8.31a.75.75 0 01.02-1.1z"
          clipRule="evenodd"
        />
      </svg>
    </motion.div>
  );
};

const ExperienceDetails = ({ experience }) => {
  return (
    <div className="mt-5">
      <ul className="max-w-7xl list-none space-y-8 rounded-2xl lg:rounded-3xl p-6 lg:p-8 bg-black/30 backdrop-blur-md border border-slate-700/60 shadow-xl shadow-black/20 animate-pulse-border">
        {experience.details.map((detail, index) => (
          <li
            key={`experience-detail-${index}`}
            className="text-slate-300 font-medium text-[10px] xs:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[28px] lg:leading-[30px]"
            dangerouslySetInnerHTML={{ __html: detail }}
          />
        ))}
      </ul>
    </div>
  );
};

const Experience = () => {
  const [selectedJob, setSelectedJob] = useState(experiences[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    handleResize(); // Check initial screen size
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="sm:my-20">
      <motion.div variants={textVariant()}>
        <h2 className={`${styles.sectionText} text-center`}>Experience</h2>
      </motion.div>

      <div className="relative mt-10 md:mt-20 md:p-20 flex flex-col gap-6">
        {experiences.map((experience, index) => (
          <div
            key={`experience-row-${index}`}
            className="w-full sm:grid sm:grid-cols-2 sm:gap-6"
          >
            <ExperienceCard
              id={`exp-${index}`}
              experience={experience}
              onClick={() => {
                const isOpening = selectedJob !== experience;
                setSelectedJob((prev) =>
                  prev === experience ? null : experience
                );
                if (isMobile && isOpening) {
                  // Smoothly bring selected card and inline details into view on mobile
                  requestAnimationFrame(() => {
                    const el = document.getElementById(`exp-${index}`);
                    el?.scrollIntoView({
                      behavior: "smooth",
                      block: "start",
                      inline: "nearest",
                    });
                  });
                } else if (!isMobile && isOpening) {
                  // Keep the interaction local: center the clicked row without jumping up
                  requestAnimationFrame(() => {
                    const row = document.getElementById(`exp-${index}`);
                    row?.scrollIntoView({
                      behavior: "smooth",
                      block: "center",
                    });
                  });
                }
              }}
              isActive={selectedJob === experience}
              isMobile={isMobile}
              controlsId={`exp-details-${index}`}
            />

            {/* Desktop/tablet inline details beside the clicked card */}
            <div className="hidden sm:block">
              <AnimatePresence initial={false}>
                {selectedJob === experience ? (
                  <motion.div
                    id={`exp-details-${index}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                  >
                    <ExperienceDetails experience={experience} />
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>

            {/* Mobile inline details below the card */}
            <AnimatePresence initial={false}>
              {isMobile && selectedJob === experience && (
                <motion.div
                  id={`exp-details-${index}`}
                  className="sm:hidden col-span-2 px-2"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
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
