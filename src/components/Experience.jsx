import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

import { experiences } from "../data";
import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { textVariant } from "../utils/motion";

const ExperienceCard = ({ id, experience, onClick, isActive, isMobile }) => {
  return (
    <div
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
      className={`cursor-pointer sm:mb-5 p-5 max-w-xl relative sm:text-left text-center ${
        isMobile ? "text-quaternary" : ""
      }`}
    >
      {(isActive || isMobile) && (
        <div className="absolute left-0 top-0 bottom-0 w-3 md:w-5 bg-tertiary my-6 sm:block hidden"></div>
      )}
      <h3
        className={`text-xl lg:text-2xl xl:text-3xl font-bold sm:pl-8 ${
          isActive || isMobile ? "text-quaternary" : "text-slate-600"
        }`}
      >
        {experience.title}
      </h3>
      <p
        className={`text-md lg:text-lg xl:text-2xl sm:font-medium pt-2 sm:pl-8 ${
          isActive || isMobile ? "text-white" : "text-slate-600"
        }`}
      >
        {experience.company_name}
        {experience.date ? ` | ${experience.date}` : ""}
      </p>
    </div>
  );
};

const ExperienceDetails = ({ experience }) => {
  return (
    <div className="mt-5">
      <ul className="max-w-7xl list-none space-y-8 border-4 lg:border-8 rounded-xl lg:rounded-3xl p-6">
        {experience.details.map((detail, index) => (
          <li
            key={`experience-detail-${index}`}
            className="text-slate-500 font-semibold text-[10px] xs:text-[14px] md:text-[18px] lg:text-[22px] xl:text-[28px] lg:leading-[30px]"
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
          <div key={`experience-row-${index}`} className="w-full sm:grid sm:grid-cols-2 sm:gap-6">
            <ExperienceCard
              id={`exp-${index}`}
              experience={experience}
              onClick={() => {
                setSelectedJob(experience);
                if (isMobile) {
                  // Smoothly bring selected card and inline details into view on mobile
                  requestAnimationFrame(() => {
                    const el = document.getElementById(`exp-${index}`);
                    el?.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
                  });
                } else {
                  // Keep the interaction local: center the clicked row without jumping up
                  requestAnimationFrame(() => {
                    const row = document.getElementById(`exp-${index}`);
                    row?.scrollIntoView({ behavior: "smooth", block: "center" });
                  });
                }
              }}
              isActive={selectedJob === experience}
              isMobile={isMobile}
            />

            {/* Desktop/tablet inline details beside the clicked card */}
            <div className="hidden sm:block">
              {selectedJob === experience ? (
                <ExperienceDetails experience={experience} />
              ) : (
                <div className="h-0" aria-hidden="true"></div>
              )}
            </div>

            {/* Mobile inline details below the card */}
            {isMobile && selectedJob === experience && (
              <div className="sm:hidden col-span-2 px-2">
                <ExperienceDetails experience={experience} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionWrapper(Experience, "experience");
