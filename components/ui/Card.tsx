import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
  accent?: boolean;
  hoverable?: boolean;
  highlighted?: boolean;
}

export function Card({ children, className = "", bordered = true, accent = false, hoverable = false, highlighted = false }: CardProps) {
  const baseStyles = "bg-white rounded-2xl";
  const borderStyles = bordered ? "border border-gray-200" : "";
  const accentStyles = accent ? "border-l-4 border-l-brand" : "";
  const hoverStyles = hoverable ? "hover:shadow-[var(--shadow-card-hover)] transition-shadow" : "";
  const highlightStyles = highlighted ? "ring-2 ring-accent" : "";

  return (
    <div className={`${baseStyles} ${borderStyles} ${accentStyles} ${hoverStyles} ${highlightStyles} ${className}`}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h2" | "h3" | "h4";
}

export function CardTitle({
  children,
  className = "",
  as: Tag = "h3",
}: CardTitleProps) {
  return (
    <Tag
      className={`font-serif text-xl font-semibold text-black ${className}`}
    >
      {children}
    </Tag>
  );
}
