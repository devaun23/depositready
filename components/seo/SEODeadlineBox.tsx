interface DeadlineItem {
  days: string;
  description: string;
}

interface SEODeadlineBoxProps {
  title: string;
  items: DeadlineItem[];
  note?: string;
}

export function SEODeadlineBox({ title, items, note }: SEODeadlineBoxProps) {
  return (
    <div className="bg-gray-100 border border-gray-200 rounded-lg p-6 my-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">{title}</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <div key={index} className="bg-white rounded-lg p-4">
            <div className="text-3xl font-bold text-black mb-1">{item.days}</div>
            <div className="text-sm text-gray-600">{item.description}</div>
          </div>
        ))}
      </div>
      {note && <p className="text-sm text-gray-600 mt-4">{note}</p>}
    </div>
  );
}
