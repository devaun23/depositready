interface SEOCheckListProps {
  items: string[];
  variant?: "check" | "bullet";
}

export function SEOCheckList({ items, variant = "check" }: SEOCheckListProps) {
  if (variant === "bullet") {
    return (
      <ul className="list-disc pl-6 space-y-2 text-gray-600">
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-3">
      {items.map((item, index) => (
        <li key={index} className="flex items-start gap-3">
          <svg
            className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span className="text-gray-600">{item}</span>
        </li>
      ))}
    </ul>
  );
}
