interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  checkColor?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

const sizePx = {
  sm: 20,
  md: 24,
  lg: 32,
};

export function Logo({ size = "md", className = "", checkColor = "#6366f1" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${sizeClasses[size]} ${className}`}
      width={sizePx[size]}
      height={sizePx[size]}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Shield outline */}
      <path
        d="M16 3L5 7.5v6.5c0 7 4.8 13.5 11 15 6.2-1.5 11-8 11-15V7.5L16 3z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Checkmark */}
      <path
        d="M11 15.5l3.5 3.5L21 12.5"
        stroke={checkColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
