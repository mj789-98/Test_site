import { useEffect, useRef, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  Contact,
  Experience,
  Hero,
  Navbar,
  Portfolio,
  Skills,
  VideoGallery,
} from "./components";
import PerformanceMonitor from "./components/PerformanceMonitor";

// Typewriter component for animated text
const TypewriterText = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        // Keep cursor blinking after typing is done
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed]);

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span>
      {displayedText}
      <span className={`typewriter-cursor ${showCursor ? "visible" : "invisible"}`}>|</span>
    </span>
  );
};

const App = () => {
  const wrapperRef = useRef(null);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        {/* Under Construction Neon Banner */}
        <div className="under-construction-banner">
          <span className="construction-icon">🚧</span>
          <TypewriterText text="Under Construction" speed={80} />
          <span className="construction-icon">🚧</span>
        </div>
        <PerformanceMonitor />
        <Navbar />
        <div className="wrapper" ref={wrapperRef}>
          <div id="hero" data-section-id="hero" className="z-10">
            <Hero scrollContainer={wrapperRef} />
          </div>
          <div id="portfolio" className="relative z-30 bg-primary mt-[-2px]">
            <Portfolio />
          </div>
          <div id="experience" className="relative z-30 bg-primary">
            <Experience />
          </div>
          <div id="skills" className="relative z-30 bg-primary">
            <Skills />
          </div>
          <div id="videos" data-section-id="videos" className="relative z-30 bg-primary">
            <VideoGallery />
          </div>
          <div id="contact" className="relative z-30 bg-primary">
            <Contact />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;
