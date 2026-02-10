const CUSTOMER_TYPES = [
  {
    title: "Property Managers",
    description:
      "Handle deposit returns at scale. Generate compliant demand letters for every unit turnover — protect your tenants and your reputation.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
  },
  {
    title: "Attorneys & Legal Aid",
    description:
      "Court-ready demand letters with proper statutory citations. Save hours of document preparation for each client's deposit case.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
      </svg>
    ),
  },
  {
    title: "Tenant Advocacy Orgs",
    description:
      "Empower the tenants you serve with professional-grade demand letters. Bulk pricing means more people helped per dollar.",
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
  },
];

export function CustomerTypes() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {CUSTOMER_TYPES.map((type) => (
        <div
          key={type.title}
          className="text-center p-6 bg-white rounded-xl border border-gray-200"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 bg-gray-100 rounded-full mb-4 text-gray-700">
            {type.icon}
          </div>
          <h3 className="font-semibold text-black text-lg mb-2">
            {type.title}
          </h3>
          <p className="text-sm text-gray-600">{type.description}</p>
        </div>
      ))}
    </div>
  );
}
