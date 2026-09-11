export default function ParliamentIllustration({ className = "w-full max-w-[480px] h-auto" }) {
  return (
    <svg
      viewBox="0 0 540 380"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Sky / Dome Gradients */}
        <linearGradient id="domeGrad" x1="270" y1="90" x2="270" y2="190" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BCE3FA" />
          <stop offset="100%" stopColor="#7EBAE4" />
        </linearGradient>
        <linearGradient id="roofGrad" x1="270" y1="180" x2="270" y2="230" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#99CEF5" />
          <stop offset="100%" stopColor="#6DAFE0" />
        </linearGradient>
        <linearGradient id="buildingGrad" x1="270" y1="210" x2="270" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D8EEFC" />
          <stop offset="100%" stopColor="#B3DCF8" />
        </linearGradient>
        <linearGradient id="lawnGrad" x1="270" y1="290" x2="270" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#55BA6A" />
          <stop offset="100%" stopColor="#3E9B52" />
        </linearGradient>
        <linearGradient id="lawnFrontGrad" x1="270" y1="310" x2="270" y2="380" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6ECC80" />
          <stop offset="100%" stopColor="#48A85C" />
        </linearGradient>
      </defs>

      {/* Background Soft Clouds */}
      <path
        d="M90 120C90 100 115 90 135 100C145 80 175 80 190 98C205 92 225 102 225 118C225 130 90 130 90 120Z"
        fill="#E8F4FD"
        opacity="0.7"
      />
      <path
        d="M380 100C380 85 398 78 412 85C420 70 445 70 458 84C470 80 485 88 485 100C485 112 380 112 380 100Z"
        fill="#E8F4FD"
        opacity="0.6"
      />

      {/* Flag Mast */}
      <rect x="268" y="70" width="4" height="60" rx="2" fill="#507A9B" />
      <circle cx="270" cy="68" r="4" fill="#E5A93C" />

      {/* Indian Tricolor Flag */}
      <g transform="translate(272, 70)">
        {/* Saffron */}
        <path d="M0 0C10 -3 20 3 35 -1V8C20 6 10 0 0 3V0Z" fill="#FF9933" />
        {/* White */}
        <path d="M0 8C10 5 20 11 35 7V15C20 14 10 8 0 11V8Z" fill="#FFFFFF" />
        {/* Ashoka Chakra */}
        <circle cx="16" cy="11.5" r="2.2" stroke="#000080" strokeWidth="0.8" fill="none" />
        {/* Green */}
        <path d="M0 15C10 12 20 18 35 14V22C20 21 10 15 0 18V15Z" fill="#138808" />
      </g>

      {/* Central Central Dome */}
      <path
        d="M180 190C180 115 360 115 360 190H180Z"
        fill="url(#domeGrad)"
      />
      {/* Dome Ribs/Highlights */}
      <path d="M270 115V190" stroke="#FFFFFF" strokeWidth="2.5" strokeOpacity="0.6" />
      <path d="M225 125C235 145 240 170 240 190" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
      <path d="M315 125C305 145 300 170 300 190" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
      <path d="M198 148C210 162 215 178 218 190" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M342 148C330 162 325 178 322 190" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.3" />

      {/* Dome Upper Crown / Ring */}
      <rect x="250" y="110" width="40" height="8" rx="4" fill="#FFFFFF" opacity="0.9" />
      <rect x="260" y="102" width="20" height="8" rx="3" fill="#99CEF5" />

      {/* Dome Base Drum */}
      <path d="M165 190H375V206H165V190Z" fill="url(#roofGrad)" />
      {/* Drum Windows */}
      {[180, 205, 230, 255, 280, 305, 330, 355].map((x) => (
        <rect key={x} x={x} y="194" width="8" height="8" rx="3" fill="#2E6B9E" opacity="0.7" />
      ))}

      {/* Main Building Entablature / Roof */}
      <path d="M100 206H440V222H100V206Z" fill="#8AC2EC" />
      <path d="M110 222H430V228H110V222Z" fill="#6DAFE0" />

      {/* Main Building Facade & Colonnade */}
      <path d="M115 228H425V330H115V228Z" fill="url(#buildingGrad)" />

      {/* Colonnade Pillars */}
      {[
        130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410
      ].map((x) => (
        <g key={x}>
          {/* Pillar Capital */}
          <rect x={x - 4} y="228" width="8" height="4" fill="#FFFFFF" />
          {/* Pillar Body */}
          <rect x={x - 3} y="232" width="6" height="84" fill="#FFFFFF" opacity="0.95" />
          {/* Pillar Base */}
          <rect x={x - 4} y="316" width="8" height="4" fill="#FFFFFF" />
        </g>
      ))}

      {/* Center Grand Portal / Arch */}
      <path
        d="M250 320V265C250 254 290 254 290 265V320H250Z"
        fill="#3A7CA5"
      />
      <circle cx="270" cy="270" r="10" fill="#2D6285" />
      
      {/* Additional Windows in bays */}
      {[140, 180, 220, 320, 360, 400].map((x) => (
        <path
          key={x}
          d={`M${x - 4} 290V260C${x - 4} 255 ${x + 4} 255 ${x + 4} 260V290H${x - 4}Z`}
          fill="#3A7CA5"
          opacity="0.6"
        />
      ))}

      {/* Building Base Plinth */}
      <rect x="90" y="320" width="360" height="12" rx="2" fill="#8AC2EC" />
      <rect x="80" y="330" width="380" height="8" rx="2" fill="#75B1DD" />

      {/* Lush Green Lawn / Landscape Hills */}
      <path
        d="M0 340C120 300 240 330 360 305C440 290 500 310 540 330V380H0V340Z"
        fill="url(#lawnGrad)"
      />
      <path
        d="M0 350C100 325 220 345 340 320C430 305 490 325 540 345V380H0V350Z"
        fill="url(#lawnFrontGrad)"
      />

      {/* Stylized Shrubbery & Trees */}
      <circle cx="95" cy="325" r="14" fill="#439A52" />
      <circle cx="110" cy="328" r="12" fill="#58B868" />
      <circle cx="85" cy="330" r="10" fill="#368243" />

      <circle cx="435" cy="318" r="15" fill="#439A52" />
      <circle cx="450" cy="322" r="13" fill="#58B868" />
      <circle cx="420" cy="324" r="11" fill="#368243" />
      <circle cx="465" cy="328" r="10" fill="#368243" />

      {/* Foreground decorative wave */}
      <path
        d="M-20 375Q150 360 300 370T560 365V380H-20Z"
        fill="#388E47"
        opacity="0.5"
      />
    </svg>
  );
}
