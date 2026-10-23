export default function ShieldLogo({ className = "h-9 w-9" }) {
  return (
    <svg width="36" height="36" viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="jshield-shield-gradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <path
        d="M12 2l7.5 3v6.09c0 4.68-3.03 8.64-7.5 9.91-4.47-1.27-7.5-5.23-7.5-9.91V5L12 2z"
        fill="url(#jshield-shield-gradient)"
      />
      <path
        d="M12 4.1l5.6 2.24v4.75c0 3.77-2.34 7.04-5.6 8.14-3.26-1.1-5.6-4.37-5.6-8.14V6.34L12 4.1z"
        fill="rgba(255,255,255,0.14)"
      />
    </svg>
  );
}