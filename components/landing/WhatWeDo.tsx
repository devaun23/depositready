import { Card, CardContent, CardTitle } from "@/components/ui";

export function WhatWeDo() {
  return (
    <section className="py-16 px-4 sm:px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">
          {/* What we do */}
          <Card className="p-6">
            <CardTitle className="mb-4">What DepositReady does</CardTitle>
            <CardContent className="p-0">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Helps you organize evidence</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Generates state-specific timelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckIcon />
                  <span>Provides professional notice templates</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* What we don't do */}
          <Card className="p-6">
            <CardTitle className="mb-4">
              What DepositReady isn&apos;t designed for
            </CardTitle>
            <CardContent className="p-0">
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-3">
                  <XIcon />
                  <span>Provide legal advice</span>
                </li>
                <li className="flex items-start gap-3">
                  <XIcon />
                  <span>Contact landlords for you</span>
                </li>
                <li className="flex items-start gap-3">
                  <XIcon />
                  <span>Guarantee outcomes</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 text-black flex-shrink-0 mt-0.5"
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
  );
}

function XIcon() {
  return (
    <svg
      className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  );
}
