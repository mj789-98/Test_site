import React from "react";
import { socials } from "../data";

// Unrecognised names fall back to a generic link glyph, so adding a URL to
// `socials` renders sensibly even before its icon exists here.
const ICONS = {
  GitHub: (
    <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58l-.01-2.05c-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5.99.11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.11-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 016.01 0c2.29-1.55 3.3-1.23 3.3-1.23.65 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.8 5.63-5.48 5.92.43.37.81 1.1.81 2.22l-.01 3.29c0 .32.21.7.82.58A12.01 12.01 0 0024 12.5C24 5.87 18.63.5 12 .5z" />
  ),
};

const FALLBACK = (
  <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
);

const Socials = ({ className = "" }) => {
  if (!socials || socials.length === 0) return null;

  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {socials.map(({ name, url }) => {
        const icon = ICONS[name];
        return (
          <li key={name}>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
              title={name}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/12 bg-white/[0.04] text-[#a1a1a6] hover:text-white hover:bg-white/10 hover:border-white/25 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0071e3]"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-[18px] h-[18px]"
                fill={icon ? "currentColor" : "none"}
                stroke={icon ? "none" : "currentColor"}
                strokeWidth={icon ? undefined : 2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {icon || FALLBACK}
              </svg>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default Socials;
