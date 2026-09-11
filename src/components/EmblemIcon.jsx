export default function EmblemIcon({ className = "w-7 h-7", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="National Emblem of India"
    >
      {/* Three Lions Top Representation */}
      <path
        d="M12 2C10.5 2 9.5 3 9.5 4.5C9.5 5.5 10 6.2 10.8 6.7C10.2 7.1 9.8 7.8 9.8 8.6V9.5H14.2V8.6C14.2 7.8 13.8 7.1 13.2 6.7C14 6.2 14.5 5.5 14.5 4.5C14.5 3 13.5 2 12 2Z"
        fill={color}
      />
      <path
        d="M6.5 4C5.4 4 4.5 4.8 4.5 6C4.5 6.8 5 7.4 5.6 7.8C5.2 8.1 4.9 8.6 4.9 9.2V10H8.5V9.2C8.5 8.6 8.2 8.1 7.8 7.8C8.4 7.4 8.9 6.8 8.9 6C8.9 4.8 8 4 6.5 4Z"
        fill={color}
      />
      <path
        d="M17.5 4C16.4 4 15.5 4.8 15.5 6C15.5 6.8 16 7.4 16.6 7.8C16.2 8.1 15.9 8.6 15.9 9.2V10H19.5V9.2C19.5 8.6 19.2 8.1 18.8 7.8C19.4 7.4 19.9 6.8 19.9 6C19.9 4.8 19 4 17.5 4Z"
        fill={color}
      />
      {/* Abacus Base / Platform */}
      <path
        d="M3.5 11H20.5V13.2C20.5 13.6 20.1 14 19.7 14H4.3C3.9 14 3.5 13.6 3.5 13.2V11Z"
        fill={color}
      />
      {/* Ashoka Chakra in Center */}
      <circle cx="12" cy="12.5" r="1.8" stroke="#0A233F" strokeWidth="0.8" fill="#FFF" />
      <circle cx="12" cy="12.5" r="0.4" fill="#0A233F" />
      {/* Lotus Base */}
      <path
        d="M5 15.5C7.5 17.5 16.5 17.5 19 15.5C18.5 18 16 20 12 20C8 20 5.5 18 5 15.5Z"
        fill={color}
      />
      {/* Pedestal Bottom Bar */}
      <rect x="4" y="20.5" width="16" height="1.8" rx="0.9" fill={color} />
    </svg>
  );
}
