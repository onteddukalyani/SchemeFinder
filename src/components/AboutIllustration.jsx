export default function AboutIllustration({ className = "w-full max-w-[340px] h-auto" }) {
  return (
    <svg
      viewBox="0 0 400 320"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="aboutDocGrad" x1="200" y1="20" x2="200" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#F0F6FC" />
        </linearGradient>
        <linearGradient id="glassGrad" x1="240" y1="120" x2="330" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8AC6F8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.15" />
        </linearGradient>
        <linearGradient id="handleGrad" x1="320" y1="210" x2="380" y2="280" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <filter id="shadowFilter" x="40" y="30" width="300" height="260" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#0A233F" floodOpacity="0.08" />
        </filter>
      </defs>

      {/* Soft Background Pill / Hills */}
      <path
        d="M20 280C80 250 160 270 240 255C310 240 360 260 400 275V320H20V280Z"
        fill="#E2F5E8"
      />
      <circle cx="80" cy="270" r="18" fill="#C3EBD0" />
      <circle cx="105" cy="275" r="14" fill="#A7DFBA" />
      <circle cx="340" cy="280" r="22" fill="#C3EBD0" />

      {/* Floating Certificate / Document */}
      <g filter="url(#shadowFilter)">
        <rect
          x="70"
          y="45"
          width="240"
          height="215"
          rx="16"
          fill="url(#aboutDocGrad)"
          stroke="#D0E3F5"
          strokeWidth="2"
        />

        {/* Indian Flag Header Tag inside Document */}
        <g transform="translate(225, 62)">
          <rect width="60" height="34" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
          {/* Saffron */}
          <rect x="2" y="2" width="56" height="10" rx="2" fill="#FF9933" />
          {/* White */}
          <rect x="2" y="12" width="56" height="10" fill="#FFFFFF" />
          {/* Ashoka Chakra */}
          <circle cx="30" cy="17" r="3.5" stroke="#000080" strokeWidth="1" fill="none" />
          <circle cx="30" cy="17" r="1" fill="#000080" />
          {/* Green */}
          <rect x="2" y="22" width="56" height="10" rx="2" fill="#138808" />
        </g>

        {/* Header Icon / Dot */}
        <circle cx="100" cy="75" r="10" fill="#EBF3FF" />
        <circle cx="100" cy="75" r="4" fill="#0066FF" />

        {/* Text Lines Simulation */}
        <rect x="120" y="68" width="80" height="6" rx="3" fill="#60A5FA" />
        <rect x="120" y="80" width="55" height="5" rx="2.5" fill="#BFDBFE" />

        {/* Document Content Lines */}
        <rect x="95" y="115" width="190" height="6" rx="3" fill="#E2E8F0" />
        <rect x="95" y="132" width="165" height="6" rx="3" fill="#E2E8F0" />
        <rect x="95" y="149" width="180" height="6" rx="3" fill="#E2E8F0" />
        <rect x="95" y="166" width="130" height="6" rx="3" fill="#E2E8F0" />
        <rect x="95" y="183" width="175" height="6" rx="3" fill="#E2E8F0" />
        <rect x="95" y="200" width="110" height="6" rx="3" fill="#E2E8F0" />

        {/* Checkmark Badges inside Document */}
        <circle cx="102" cy="228" r="7" fill="#10B981" />
        <path d="M99 228L101 230L105 226" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="116" y="225" width="70" height="6" rx="3" fill="#93C5FD" />
      </g>

      {/* Prominent Large Magnifying Glass */}
      <g transform="translate(18, 10)">
        {/* Glass Glow */}
        <circle cx="280" cy="180" r="52" fill="url(#glassGrad)" stroke="#2563EB" strokeWidth="8" />
        {/* Inner Glare Arc */}
        <path
          d="M250 155C260 142 280 138 298 144"
          stroke="#FFFFFF"
          strokeWidth="4"
          strokeLinecap="round"
          strokeOpacity="0.85"
        />
        {/* Glass Center Sparkle */}
        <circle cx="260" cy="160" r="3" fill="#FFFFFF" opacity="0.9" />

        {/* Handle */}
        <line
          x1="318"
          y1="218"
          x2="368"
          y2="268"
          stroke="url(#handleGrad)"
          strokeWidth="14"
          strokeLinecap="round"
        />
        <line
          x1="316"
          y1="216"
          x2="324"
          y2="224"
          stroke="#1E40AF"
          strokeWidth="16"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
