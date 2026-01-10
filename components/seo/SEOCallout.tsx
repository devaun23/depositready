import { ReactNode } from "react";

interface SEOCalloutProps {
  children: ReactNode;
  variant?: "info" | "warning" | "success";
}

export function SEOCallout({ children, variant = "info" }: SEOCalloutProps) {
  const styles = {
    info: "border-l-4 border-gray-900 bg-gray-50 pl-4 py-4 pr-4",
    warning: "border-l-4 border-amber-500 bg-amber-50 pl-4 py-4 pr-4",
    success: "border-l-4 border-green-500 bg-green-50 pl-4 py-4 pr-4",
  };

  const textStyles = {
    info: "text-gray-700",
    warning: "text-amber-800",
    success: "text-green-800",
  };

  return (
    <div className={`${styles[variant]} rounded-r-lg`}>
      <div className={`${textStyles[variant]} text-base leading-relaxed`}>
        {children}
      </div>
    </div>
  );
}
