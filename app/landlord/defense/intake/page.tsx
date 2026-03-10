"use client";

import { LandlordIntakeProvider } from "@/components/landlord/intake/LandlordIntakeContext";
import { LandlordIntakeShell } from "@/components/landlord/intake/LandlordIntakeShell";

export default function DefenseIntakePage() {
  return (
    <LandlordIntakeProvider initialMode="defense">
      <LandlordIntakeShell />
    </LandlordIntakeProvider>
  );
}
