import React from "react";
import { navLinks } from "../data";
import Socials from "./Socials";

const Footer = () => {
  const scrollToTop = () => {
    document.querySelector(".wrapper")?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="border-t border-white/10 px-6 md:px-20 lg:px-40 py-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center sm:items-start gap-4">
          <div className="text-center sm:text-left">
            <p className="text-white text-[15px] font-semibold tracking-tight">Manas Joshi</p>
            <p className="text-[#6e6e73] text-[13px] mt-1">
              Unity &amp; VR Developer · © {new Date().getFullYear()}
            </p>
          </div>
          <Socials />
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                className="text-[#a1a1a6] hover:text-white text-[13px] transition-colors"
              >
                {nav.title}
              </a>
            </li>
          ))}
          <li>
            <a
              href="/Manas-Joshi-CV.pdf"
              download
              className="text-[#a1a1a6] hover:text-white text-[13px] transition-colors"
            >
              CV
            </a>
          </li>
        </ul>

        <button
          onClick={scrollToTop}
          aria-label="Back to top"
          className="text-[#a1a1a6] hover:text-white text-[13px] inline-flex items-center gap-1.5 transition-colors whitespace-nowrap"
        >
          Back to top
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
