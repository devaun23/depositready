"use client";

import type { StateCode } from "@/lib/state-rules";

interface FreeDemandLetterProps {
  landlordName?: string;
  stateCode: StateCode;
  stateName: string;
  statuteTitle: string;
  depositAmount: number;
  moveOutDate: string;
  returnDeadline: string;
  deadlinePassed: boolean;
  damagesMultiplier: number;
  damagesDescription: string;
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function FreeDemandLetter({
  landlordName,
  stateName,
  statuteTitle,
  depositAmount,
  moveOutDate,
  returnDeadline,
  deadlinePassed,
  damagesMultiplier,
  damagesDescription,
}: FreeDemandLetterProps) {
  const today = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate response deadline (14 days from today)
  const responseDeadline = new Date();
  responseDeadline.setDate(responseDeadline.getDate() + 14);
  const responseDeadlineStr = responseDeadline.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const potentialDamages = depositAmount * damagesMultiplier;
  const displayLandlord = landlordName || "[Landlord Name]";

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gray-50 border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-black">Your Free Demand Letter</h3>
          <button
            onClick={() => window.print()}
            className="text-sm text-gray-600 hover:text-black flex items-center gap-1"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </div>

      {/* Letter Content */}
      <div className="p-6 md:p-8 font-serif text-sm leading-relaxed print:p-0">
        {/* Certified Mail Header */}
        <p className="text-xs uppercase tracking-wide text-gray-500 mb-6">
          SENT VIA CERTIFIED MAIL, RETURN RECEIPT REQUESTED
        </p>

        {/* Date */}
        <p className="mb-6">{today}</p>

        {/* Recipient */}
        <div className="mb-6">
          <p className="font-medium">{displayLandlord}</p>
          <p className="text-gray-500">[Landlord Address]</p>
          <p className="text-gray-500">[City, State ZIP]</p>
        </div>

        {/* RE Line */}
        <div className="mb-6 p-4 bg-gray-50 rounded border-l-4 border-black">
          <p className="font-bold">RE: FORMAL DEMAND FOR RETURN OF SECURITY DEPOSIT</p>
          <p className="text-gray-600">Property: [Your Rental Property Address]</p>
          <p className="text-gray-600">Deposit Amount: <span className="font-medium text-black">{formatCurrency(depositAmount)}</span></p>
          <p className="text-gray-600">Response Deadline: <span className="font-medium text-black">{responseDeadlineStr}</span></p>
        </div>

        {/* Salutation */}
        <p className="mb-4">Dear {displayLandlord}:</p>

        {/* Paragraph 1 */}
        <p className="mb-4">
          I am the former tenant of the above-referenced property. This letter constitutes a formal
          demand for the return of my security deposit in accordance with{" "}
          <span className="font-medium">{statuteTitle}</span>.
        </p>

        {/* Paragraph 2 */}
        <p className="mb-4">
          On or about <span className="font-medium">{formatDate(moveOutDate)}</span>, I vacated
          the premises. At the commencement of my tenancy, I paid a security deposit in the amount
          of <span className="font-medium">{formatCurrency(depositAmount)}</span>. Prior to my
          departure, I left the premises in good condition, reasonable wear and tear excepted,
          and provided my forwarding address as required by law.
        </p>

        {/* Paragraph 3: Deadline Violation */}
        {deadlinePassed ? (
          <p className="mb-4">
            Pursuant to {statuteTitle}, you were required to return my security deposit or provide
            an itemized written statement of deductions by{" "}
            <span className="font-medium">{returnDeadline}</span>. As of the date of this letter,
            I have not received either my deposit or a lawful itemization. You are therefore{" "}
            <span className="font-medium">in violation of {stateName} law</span>.
          </p>
        ) : (
          <p className="mb-4">
            Pursuant to {statuteTitle}, you are required to return my security deposit or provide
            an itemized written statement of deductions by{" "}
            <span className="font-medium">{returnDeadline}</span>. This letter serves as formal
            notice of my intent to pursue all available legal remedies if this deadline is not met.
          </p>
        )}

        {/* Paragraph 4: Damages Warning */}
        <p className="mb-4">
          Under {stateName} law, your failure to comply may result in liability for{" "}
          <span className="font-medium">{damagesDescription}</span>, meaning you could be ordered
          to pay up to <span className="font-medium">{formatCurrency(potentialDamages)}</span>,
          plus court costs and potentially attorney&apos;s fees.
        </p>

        {/* Paragraph 5: Demand */}
        <p className="mb-4 font-medium">
          I hereby demand that you return my full security deposit of{" "}
          {formatCurrency(depositAmount)} within fourteen (14) days of the date of this letter.
        </p>

        {/* Paragraph 6: Legal Action */}
        <p className="mb-6">
          Should you fail to comply, I am prepared to file a claim in Small Claims Court without
          further notice. All correspondence should be directed to the undersigned at the address below.
        </p>

        {/* Closing */}
        <p className="mb-8">Sincerely,</p>

        {/* Signature Block */}
        <div className="border-t border-gray-300 pt-4 w-64">
          <p className="text-gray-500 mb-2">[Your Signature]</p>
          <p className="font-medium">[Your Name]</p>
          <p className="text-gray-500">[Your Address]</p>
          <p className="text-gray-500">[City, State ZIP]</p>
          <p className="text-gray-500">[Your Email]</p>
        </div>
      </div>

      {/* Footer Note */}
      <div className="bg-amber-50 border-t border-amber-200 px-6 py-4">
        <p className="text-xs text-amber-800">
          <span className="font-medium">Before sending:</span> Fill in the bracketed sections with
          your actual information. Send via certified mail with return receipt requested for proof
          of delivery.
        </p>
      </div>
    </div>
  );
}
