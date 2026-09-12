import React from "react";

// macOS Snake Game App Icon (Apple Squircle Style with Retro Snake & Food)
export function MacSnakeGameIcon({ className = "w-7 h-7 sm:w-10 sm:h-10" }) {
  return (
    <div className={`relative flex-shrink-0 group-hover:scale-110 transition-transform duration-200 ${className}`}>
      <svg
        viewBox="0 0 128 128"
        className="w-full h-full filter drop-shadow-md overflow-visible"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="snakeBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="50%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <linearGradient id="snakeBorder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="snakeBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#34d399" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
          <linearGradient id="appleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <linearGradient id="snakeGlass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>
          <filter id="emeraldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base macOS Squircle Tile */}
        <rect
          x="4"
          y="4"
          width="120"
          height="120"
          rx="26"
          fill="url(#snakeBg)"
          stroke="url(#snakeBorder)"
          strokeWidth="2.5"
        />

        {/* Arcade Grid Background Pattern */}
        <g opacity="0.15">
          <line x1="20" y1="20" x2="108" y2="20" stroke="#94a3b8" strokeWidth="1" />
          <line x1="20" y1="42" x2="108" y2="42" stroke="#94a3b8" strokeWidth="1" />
          <line x1="20" y1="64" x2="108" y2="64" stroke="#94a3b8" strokeWidth="1" />
          <line x1="20" y1="86" x2="108" y2="86" stroke="#94a3b8" strokeWidth="1" />
          <line x1="20" y1="108" x2="108" y2="108" stroke="#94a3b8" strokeWidth="1" />

          <line x1="20" y1="20" x2="20" y2="108" stroke="#94a3b8" strokeWidth="1" />
          <line x1="42" y1="20" x2="42" y2="108" stroke="#94a3b8" strokeWidth="1" />
          <line x1="64" y1="20" x2="64" y2="108" stroke="#94a3b8" strokeWidth="1" />
          <line x1="86" y1="20" x2="86" y2="108" stroke="#94a3b8" strokeWidth="1" />
          <line x1="108" y1="20" x2="108" y2="108" stroke="#94a3b8" strokeWidth="1" />
        </g>

        {/* Snake Body Segments (Curving Path) */}
        {/* Tail Segment 1 */}
        <rect x="22" y="88" width="18" height="18" rx="5" fill="#059669" />
        {/* Body Segment 2 */}
        <rect x="44" y="88" width="18" height="18" rx="5" fill="#10b981" />
        {/* Body Segment 3 */}
        <rect x="44" y="66" width="18" height="18" rx="5" fill="#10b981" />
        {/* Body Segment 4 */}
        <rect x="44" y="44" width="18" height="18" rx="5" fill="#34d399" filter="url(#emeraldGlow)" />
        {/* Body Segment 5 */}
        <rect x="66" y="44" width="18" height="18" rx="5" fill="#34d399" filter="url(#emeraldGlow)" />

        {/* Snake Head Segment */}
        <rect
          x="88"
          y="44"
          width="20"
          height="20"
          rx="6"
          fill="url(#snakeBodyGrad)"
          stroke="#6ee7b7"
          strokeWidth="1.5"
          filter="url(#emeraldGlow)"
        />

        {/* Snake Eyes */}
        <circle cx="102" cy="50" r="2.5" fill="#020617" />
        <circle cx="102" cy="58" r="2.5" fill="#020617" />
        <circle cx="103" cy="49" r="0.8" fill="#ffffff" />
        <circle cx="103" cy="57" r="0.8" fill="#ffffff" />

        {/* Tongue */}
        <path d="M 108 54 L 115 54 M 115 54 L 118 51 M 115 54 L 118 57" stroke="#ef4444" strokeWidth="1.5" strokeLinecap="round" />

        {/* Food Apple Target Dot */}
        <circle cx="98" cy="88" r="9" fill="url(#appleGrad)" filter="url(#emeraldGlow)" />
        <circle cx="95" cy="85" r="2.5" fill="#ffffff" opacity="0.6" />
        <path d="M 98 79 C 99 76 102 75 103 76" stroke="#15803d" strokeWidth="2" strokeLinecap="round" />

        {/* Gloss Glare Reflection */}
        <rect
          x="4"
          y="4"
          width="120"
          height="120"
          rx="26"
          fill="url(#snakeGlass)"
          pointerEvents="none"
        />
      </svg>
    </div>
  );
}
