import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  bordered?: boolean;
}

export function Card({ children, className = "", bordered = true }: CardProps) {
  const baseStyles = "bg-white rounded-lg";
  const borderStyles = bordered ? "border border-gray-200" : "";

  return (
    <div className={`${baseStyles} ${borderStyles} ${className}`}>
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
