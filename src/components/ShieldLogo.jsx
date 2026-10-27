export default function ShieldLogo({ className = "h-9 w-9" }) {
  return (
    <svg width="36" height="36" viewBox="15 12 70 78.82" className={className} aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="jshield-shield-gradient" gradientUnits="userSpaceOnUse" x1="22" y1="90" x2="80" y2="10">
          <stop offset="0" stopColor="#4338CA" />
          <stop offset="0.3" stopColor="#6366F1" />
          <stop offset="0.75" stopColor="#0EA5E9" />
          <stop offset="1" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <path
        d="M18 12H49V45.54Q32.34 53.21 16.56 57.56C15.54 54.25 15 50.74 15 47V15C15 13.34 16.34 12 18 12ZM85 31.29V47C85 66 71 79 52.2 90.3Q51.6 90.65 51 90.82V51.98Q67.78 43.32 85 31.29ZM51 44.61V12H82C83.66 12 85 13.34 85 15V25.76Q67.57 36.81 51 44.61ZM49 53V90.82Q48.4 90.65 47.8 90.3C35.71 83.04 25.61 75.07 19.94 65.26Q34.3 60.43 49 53Z"
        fill="url(#jshield-shield-gradient)"
      />
    </svg>
  );
}
