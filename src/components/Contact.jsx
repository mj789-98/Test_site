import { motion, useAnimation } from "framer-motion";
import React, { useEffect } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { profilepic } from "../assets";

const Contact = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    <div className="md:px-20 lg:px-40 pb-20">
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: { opacity: 0, y: 40 },
          show: { opacity: 1, y: 0, transition: { type: "tween", duration: 0.8, delay: 0.1 } },
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-5 mb-12">
          <div>
            <p className={styles.sectionEyebrow}>Get in Touch</p>
            <h3 className={styles.sectionText}>Contact</h3>
          </div>

          {/* Profile pic — hover to expand */}
          <div className="relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20">
            <motion.div
              className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden cursor-pointer z-10"
              whileHover={{ width: 260, height: 260, x: 8, y: -40, zIndex: 50 }}
              transition={{ type: "spring", stiffness: 200, damping: 22 }}
            >
              <motion.img
                src={profilepic}
                alt="Profile"
                className="w-full h-full object-cover rounded-2xl"
                style={{ objectPosition: "calc(50% + 0px) calc(50% + 20px)" }}
                whileHover={{ objectPosition: "center center" }}
              />
            </motion.div>
          </div>
        </div>

        {/* Form */}
        <form
          action="https://getform.io/f/8b086558-47d4-49d0-852d-ec8c22da40f7"
          method="POST"
          className="max-w-xl flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-[#a1a1a6] text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              className="apple-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#a1a1a6] text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="you@example.com"
              className="apple-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#a1a1a6] text-sm font-medium">Message</label>
            <textarea
              name="message"
              placeholder="Tell me about your project…"
              rows="7"
              className="apple-input resize-none"
            />
          </div>

          <div>
            <button type="submit" className="apple-btn mt-2">
              Send Message
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
