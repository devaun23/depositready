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
      {/* Shield body */}
      <path
        d="M16 2L4 7v7c0 7.5 5.1 14.5 12 16 6.9-1.5 12-8.5 12-16V7L16 2z"
        fill="currentColor"
      />
      {/* Inner lighter shield (depth layer) */}
      <path
        d="M16 4.5L6 8.7v5.8c0 6.3 4.3 12.2 10 13.5 5.7-1.3 10-7.2 10-13.5V8.7L16 4.5z"
        fill="currentColor"
        opacity="0.7"
      />
      {/* Checkmark */}
      <path
        d="M11 15l3.5 3.5L21 12"
        stroke={checkColor}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
