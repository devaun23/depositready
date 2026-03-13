"use client";

import Link from "next/link";
import { forwardRef, ButtonHTMLAttributes } from "react";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "accent-outline"
  | "ghost"
  | "hero"
  | "hero-outline"
  | "default"
  | "destructive"
  | "link";

type ButtonSize = "sm" | "md" | "lg" | "xl" | "default" | "icon";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  loading?: boolean;
  href?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-primary-foreground shadow-md hover:bg-primary/90 hover:shadow-lg disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none",
  default:
    "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90 hover:shadow-md",
  secondary:
    "bg-secondary text-secondary-foreground hover:bg-secondary/80 disabled:bg-gray-300 disabled:text-gray-500",
  outline:
    "bg-transparent text-primary border border-input hover:bg-accent hover:text-accent-foreground disabled:border-gray-300 disabled:text-gray-400",
  "accent-outline":
    "bg-transparent text-primary border border-primary hover:bg-primary/5 disabled:border-gray-300 disabled:text-gray-400",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-accent hover:text-accent-foreground disabled:text-gray-400",
  hero:
    "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300",
  "hero-outline":
    "border-2 border-primary/20 bg-card text-foreground hover:border-primary/40 hover:bg-accent-light shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300",
  destructive:
    "bg-destructive text-destructive-foreground hover:bg-destructive/90",
  link:
    "text-primary underline-offset-4 hover:underline",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-9 rounded-md px-3 text-sm",
  md: "h-10 px-4 py-2 text-sm",
  default: "h-10 px-4 py-2 text-sm",
  lg: "h-12 rounded-xl px-8 text-base",
  xl: "h-14 rounded-xl px-10 text-lg",
  icon: "h-10 w-10",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      size = "md",
      fullWidth = false,
      loading = false,
      disabled,
      href,
      children,
      className = "",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center gap-2 whitespace-nowrap font-semibold transition-all duration-200 rounded-xl active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 min-h-[44px]";

    const combinedClassName = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${
      fullWidth ? "w-full" : ""
    } ${disabled || loading ? "cursor-not-allowed" : ""} ${className}`;

    if (href && !disabled && !loading) {
      return (
        <Link href={href} className={combinedClassName}>
          {loading ? (
            <>
              <LoadingSpinner />
              <span className="ml-2">{children}</span>
            </>
          ) : (
            children
          )}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={combinedClassName}
        {...props}
      >
        {loading ? (
          <>
            <LoadingSpinner />
            <span className="ml-2">{children}</span>
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

function LoadingSpinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      width="16"
      height="16"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}
