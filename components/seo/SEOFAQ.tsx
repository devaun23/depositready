interface SEOFAQProps {
  title: string;
  items: { question: string; answer: string }[];
}

export function SEOFAQ({ title, items }: SEOFAQProps) {
  return (
    <section className="py-10">
      <h2 className="font-serif text-2xl md:text-3xl font-semibold mb-6">{title}</h2>
      <div className="space-y-6">
        {items.map((item, index) => (
          <div key={index}>
            <h3 className="font-semibold text-black mb-2">{item.question}</h3>
            <p className="text-gray-600">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
