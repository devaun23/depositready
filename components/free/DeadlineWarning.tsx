import type { StateCode } from "@/lib/state-rules";

interface DeadlineWarningProps {
  stateCode: StateCode;
  stateName: string;
  deadline: string;
  deadlinePassed: boolean;
  daysLate?: number;
  daysRemaining?: number;
}

export function DeadlineWarning({
  stateName,
  deadline,
  deadlinePassed,
  daysLate,
  daysRemaining,
}: DeadlineWarningProps) {
  if (deadlinePassed) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center text-sm">
            !
          </div>
          <div>
            <p className="font-medium text-red-800">
              Your landlord is {daysLate} day{daysLate !== 1 ? "s" : ""} late
            </p>
            <p className="text-sm text-red-700 mt-1">
              Under {stateName} law, the deadline was{" "}
              <span className="font-medium">{deadline}</span>. This is your leverage.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm">
          i
        </div>
        <div>
          <p className="font-medium text-amber-800">
            Deadline approaching: {daysRemaining} day{daysRemaining !== 1 ? "s" : ""} left
          </p>
          <p className="text-sm text-amber-700 mt-1">
            Your landlord has until <span className="font-medium">{deadline}</span> under{" "}
            {stateName} law. Send your letter now to create a paper trail.
          </p>
        </div>
      </div>
    </div>
  );
}
