interface ComparisonColumn {
  title: string;
  items: string[];
  variant?: "default" | "positive" | "negative";
}

interface SEOComparisonGridProps {
  columns: ComparisonColumn[];
}

export function SEOComparisonGrid({ columns }: SEOComparisonGridProps) {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {columns.map((column, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">{column.title}</h3>
          <ul className="text-sm text-gray-600 space-y-1.5">
            {column.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
