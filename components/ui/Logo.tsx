interface LogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeClasses = {
  sm: "w-5 h-5",
  md: "w-6 h-6",
  lg: "w-8 h-8",
};

export function Logo({ size = "md", className = "" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`${sizeClasses[size]} ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Document */}
      <path
        d="M6 4C6 2.89543 6.89543 2 8 2H18L26 10V28C26 29.1046 25.1046 30 24 30H8C6.89543 30 6 29.1046 6 28V4Z"
        fill="currentColor"
      />
      {/* Folded corner */}
      <path
        d="M18 2V8C18 9.10457 18.8954 10 20 10H26L18 2Z"
        fill="currentColor"
        opacity="0.6"
      />
      {/* Checkmark */}
      <path
        d="M12 18L15 21L21 14"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
