import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { navLinks } from "../data";

const Navbar = () => {
  const [active, setActive] = useState("hero");
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-section-id]"));

    const handleIntersect = (entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length === 0) return;
      const top = visible.reduce((max, e) =>
        e.intersectionRatio > max.intersectionRatio ? e : max
      );
      const id = top.target.getAttribute("data-section-id");
      if (id) setActive(id);
    };

    const observer = new IntersectionObserver(handleIntersect, {
      threshold: [0.15, 0.3, 0.5, 0.75, 1],
      rootMargin: "0px 0px -35% 0px",
    });

    sections.forEach((sec) => observer.observe(sec));
    return () => sections.forEach((sec) => observer.unobserve(sec));
  }, []);

  return (
    <nav className="apple-nav w-full fixed z-40 top-0 left-0">
      <div className="max-w-[980px] mx-auto px-6 h-12 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          onClick={() => { setActive("hero"); window.scrollTo(0, 0); }}
          className="text-white text-[17px] font-semibold tracking-tight hover:text-white/80 transition-colors"
        >
          MJ
        </Link>

        {/* Desktop nav — centered links */}
        <ul className="hidden sm:flex items-center gap-8">
          {navLinks.map((nav) => (
            <li key={nav.id}>
              <a
                href={`#${nav.id}`}
                onClick={() => setActive(nav.id)}
                className={`text-[14px] font-normal tracking-tight transition-colors ${
                  active === nav.id
                    ? "text-white"
                    : "text-[#a1a1a6] hover:text-white"
                }`}
              >
                {nav.title}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1 cursor-pointer"
          onClick={() => setToggle(!toggle)}
          aria-label="Menu"
        >
          <span className={`block w-5 h-[1.5px] bg-white transition-all duration-200 ${toggle ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white transition-all duration-200 ${toggle ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-[1.5px] bg-white transition-all duration-200 ${toggle ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {toggle && (
        <div className="sm:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl">
          <ul className="flex flex-col py-2">
            {navLinks.map((nav) => (
              <li key={nav.id}>
                <a
                  href={`#${nav.id}`}
                  onClick={() => { setToggle(false); setActive(nav.id); }}
                  className={`block px-6 py-3 text-[15px] transition-colors ${
                    active === nav.id ? "text-white" : "text-[#a1a1a6]"
                  }`}
                >
                  {nav.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
