import React from "react";

// The Core Implement mark: a C left open, closed by a solid accent bar
// standing in for the I. See the brand guide for construction details.
export const LogoMark = ({ className = "w-8 h-8", dark = false }) => (
  <svg viewBox="0 0 48 48" fill="none" className={className} aria-hidden="true">
    <path
      d="M36.7 36.7 A18 18 0 1 1 36.7 11.3"
      stroke={dark ? "#e9e9ed" : "#292b31"}
      strokeWidth="5"
      strokeLinecap="round"
    />
    <rect x="38" y="15" width="6" height="18" rx="3" fill={dark ? "#9184d9" : "#796cbf"} />
  </svg>
);

const Logo = ({ name = "Core Implement", markClassName = "w-8 h-8", textClassName = "text-xl", dark = false }) => (
  <span className="inline-flex items-center gap-2">
    <LogoMark className={markClassName} dark={dark} />
    <span
      className={`font-bold ${textClassName} ${dark ? "text-white" : "text-gray-900"}`}
    >
      {name}
    </span>
  </span>
);

export default Logo;
