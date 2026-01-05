import emailjs from "@emailjs/browser";
import { motion, useAnimation } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

import { SectionWrapper } from "../hoc";
import { styles } from "../styles";
import { profilepic } from "../assets";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const controls = useAnimation();

  useEffect(() => {
    controls.start("show");
  }, [controls]);

  return (
    <div
      className="md:m-12 md:px-48 flex flex-col sm:flex-row gap-10 items-center"
    >
      <motion.div
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {
            opacity: 0,
            y: 100,
          },
          show: {
            opacity: 1,
            y: 0,
            transition: {
              type: "tween",
              duration: 1,
              delay: 0.2,
            },
          },
        }}
        className='flex-[0.8] md:pb-40 mx-4 sm:mx-auto'
      >
        {/* Contact heading with profile picture */}
        <div className='flex items-center gap-4'>
          <h3 className={styles.sectionText}>Contact</h3>

          <div className="relative w-16 h-16 md:w-20 md:h-20">
            <motion.div
              className='absolute top-0 left-0 w-full h-full rounded-xl overflow-hidden cursor-pointer z-10'
              whileHover={{
                width: 280,
                height: 280,
                x: 10,
                y: -50,
                zIndex: 50
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className='absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75'></div>
              <motion.img
                src={profilepic}
                alt="Profile"
                className='relative w-full h-full rounded-xl border-2 border-white/10 shadow-xl bg-black/50'
                initial={{
                  objectFit: 'cover',
                  objectPosition: 'calc(50% + 0px) calc(50% + 20px)'
                }}
                whileHover={{
                  objectFit: 'scale-down',
                  objectPosition: 'center center'
                }}
              />
            </motion.div>
          </div>
        </div>

        <form
          action="https://getform.io/f/8b086558-47d4-49d0-852d-ec8c22da40f7"
          method="POST"
          className="mt-12 gap-4 flex flex-col"
        >
          <span className='text-white font-medium mt-3'>Full Name</span>
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            className="bg-tertiary p-4 text-white border font-medium"
          />
          <span className='text-white font-medium mt-3'>Email Address</span>
          <input
            type="text"
            name="email"
            placeholder="Enter your email address"
            className="bg-tertiary p-4 text-white border font-medium"
          />
          <span className='text-white font-medium mt-3'>Message</span>
          <textarea
            name="message"
            placeholder="Enter your message"
            rows="10"
            className="bg-tertiary p-4 text-white border font-medium"
          />
          <button
            type='submit'
            className='bg-tertiary py-3 px-8 w-fit text-white font-bold shadow-md shadow-primary '
          >
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");