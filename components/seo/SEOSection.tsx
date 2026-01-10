import { ReactNode } from "react";

interface SEOSectionProps {
  title?: string;
  icon?: ReactNode;
  variant?: "white" | "gray";
  children: ReactNode;
}

export function SEOSection({ title, icon, variant = "white", children }: SEOSectionProps) {
  const bgClass = variant === "gray" ? "bg-gray-50 -mx-4 sm:-mx-6 px-4 sm:px-6" : "";

  return (
    <section className={`py-10 ${bgClass}`}>
      {title && (
        <h2 className="font-serif text-2xl md:text-3xl font-semibold text-black mb-6 flex items-center gap-3">
          {icon && <span className="text-gray-700">{icon}</span>}
          {title}
        </h2>
      )}
      <div className="space-y-4 text-gray-600 text-lg leading-relaxed">
        {children}
      </div>
    </section>
  );
}
