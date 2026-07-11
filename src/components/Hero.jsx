import { motion } from "framer-motion";
import Position from "./Position";

const Hero = ({ scrollContainer }) => {
  return (
    <section className="relative z-10 flex flex-col justify-center min-h-[100vh] bg-background overflow-hidden px-6 lg:px-12" style={{ fontFamily: "var(--font-body)" }}>
      {/* Video Background */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        className="absolute inset-0 w-full h-full object-cover z-0"
      />
      
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
            <p className="mt-2 lg:mt-6 max-w-sm">
              I love crafting <br className="hidden sm:block" /> captivating experiences for the digital world to savor.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
