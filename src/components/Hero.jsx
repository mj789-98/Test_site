import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Position from "./Position";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4";

const Hero = ({ scrollContainer }) => {
  const videoRef = useRef(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      setReduceMotion(query.matches);
      const video = videoRef.current;
      if (!video) return;
      // Hold a still frame rather than removing the video, so the hero keeps
      // its backdrop instead of falling back to flat black.
      if (query.matches) video.pause();
      else video.play().catch(() => {});
    };

    apply();
    query.addEventListener("change", apply);
    return () => query.removeEventListener("change", apply);
  }, []);

  return (
    <section className="relative z-10 flex flex-col justify-center min-h-[100vh] bg-background overflow-hidden px-6 lg:px-12" style={{ fontFamily: "var(--font-body)" }}>
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        src={HERO_VIDEO}
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      {/* Contrast + bottom fade overlays */}
      <div className="absolute inset-0 z-[1] bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-40 z-[1] bg-gradient-to-b from-transparent to-black" />

      {/* Content Wrapper */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex justify-center items-center mt-[-5vh]">
        {/* Text Block */}
        <div className="flex flex-col items-center text-center w-full">
          <motion.h1 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-2.46px] font-normal text-foreground w-full whitespace-nowrap"
            style={{ fontFamily: "var(--font-display)" }}
          >
            MANAS JOSHI
          </motion.h1>
          
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg w-full mt-6 leading-relaxed flex flex-col items-center"
          >
            <div className="relative w-full h-[50px] sm:h-[60px] flex justify-center">
              <Position />
            </div>
            <p className="mt-4 lg:mt-8 max-w-[500px] text-[#a1a1a6] text-[17px] md:text-[21px] font-medium tracking-wide leading-relaxed">
              I love crafting captivating experiences for the digital world to savor.
            </p>

            <div className="mt-8 lg:mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="/Manas-Joshi-CV.pdf"
                download
                className="apple-btn"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                  />
                </svg>
                Download CV
              </a>
              <a href="#contact" className="apple-btn-secondary">
                Get in touch
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#portfolio"
        aria-label="Scroll to portfolio"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors"
      >
        <span className="text-[11px] font-medium tracking-[0.2em] uppercase">Scroll</span>
        <motion.svg
          animate={reduceMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </motion.svg>
      </motion.a>
    </section>
  );
};

export default Hero;
