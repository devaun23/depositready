"use client";

import { LandlordIntakeProvider } from "@/components/landlord/intake/LandlordIntakeContext";
import { LandlordIntakeShell } from "@/components/landlord/intake/LandlordIntakeShell";

export default function ComplianceIntakePage() {
  return (
    <LandlordIntakeProvider initialMode="compliance">
      <LandlordIntakeShell />
    </LandlordIntakeProvider>
  );
}
