import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { profilepic } from "../assets";
import Socials from "./Socials";

const FORM_ENDPOINT = "https://getform.io/f/8b086558-47d4-49d0-852d-ec8c22da40f7";

const Contact = () => {
  const controls = useAnimation();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    setStatus("sending");

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (!response.ok) throw new Error(`Request failed: ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="px-6 md:px-20 lg:px-40 pb-20">
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
          action={FORM_ENDPOINT}
          method="POST"
          onSubmit={handleSubmit}
          className="max-w-xl flex flex-col gap-5"
        >
          <div className="flex flex-col gap-1.5">
            <label className="text-[#a1a1a6] text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Your full name"
              className="apple-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#a1a1a6] text-sm font-medium">Email Address</label>
            <input
              type="email"
              name="email"
              required
              placeholder="you@example.com"
              className="apple-input"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[#a1a1a6] text-sm font-medium">Message</label>
            <textarea
              name="message"
              required
              placeholder="Tell me about your project…"
              rows="7"
              className="apple-input resize-none"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              type="submit"
              className="apple-btn mt-2"
              disabled={status === "sending"}
              style={status === "sending" ? { opacity: 0.6, cursor: "wait" } : undefined}
            >
              {status === "sending" ? "Sending…" : "Send Message"}
            </button>

            <p
              role="status"
              aria-live="polite"
              className={`mt-2 text-sm ${
                status === "error" ? "text-[#ff6b6b]" : "text-[#0071e3]"
              }`}
            >
              {status === "sent" && "Thanks — I'll get back to you soon."}
              {status === "error" &&
                "Something went wrong. Email me directly and I'll pick it up."}
            </p>
          </div>
        </form>

        <div className="mt-10 max-w-xl">
          <p className="text-[#6e6e73] text-[13px] mb-3">Or find me on</p>
          <Socials />
        </div>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
