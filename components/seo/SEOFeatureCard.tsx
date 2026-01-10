import { ReactNode } from "react";

interface SEOFeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

export function SEOFeatureCard({ icon, title, description }: SEOFeatureCardProps) {
  return (
    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0 text-gray-700">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
          <p className="text-gray-600 text-base">{description}</p>
        </div>
      </div>
    </div>
  );
}

interface SEOFeatureGridProps {
  children: ReactNode;
}

export function SEOFeatureGrid({ children }: SEOFeatureGridProps) {
  return (
    <div className="space-y-4">
      {children}
    </div>
  );
}
