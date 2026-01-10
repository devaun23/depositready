interface SEOInfoListProps {
  items: {
    label: string;
    value: string;
  }[];
}

export function SEOInfoList({ items }: SEOInfoListProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <ul className="text-gray-600 space-y-2">
        {items.map((item, index) => (
          <li key={index}>
            <strong>{item.label}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
}
