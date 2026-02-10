"use client";

import { useEffect } from "react";
import { usePMWizard } from "../PMWizardContext";
import { Input } from "@/components/ui";

export function Step3TenantInfo() {
  const { data, updateNestedData, setCanProceed } = usePMWizard();

  useEffect(() => {
    const isValid = Boolean(
      data.tenant?.name &&
        data.tenant?.forwardingAddress &&
        data.tenant?.city &&
        data.tenant?.zip
    );
    setCanProceed(isValid);
  }, [data.tenant, setCanProceed]);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Enter the tenant&apos;s information. The forwarding address is required
        — FL §83.49 requires notice be sent via certified mail to the
        tenant&apos;s last known mailing address.
      </p>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tenant&apos;s Full Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Full legal name"
            value={data.tenant?.name || ""}
            onChange={(e) =>
              updateNestedData("tenant", "name", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Forwarding Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Tenant's current mailing address"
            value={data.tenant?.forwardingAddress || ""}
            onChange={(e) =>
              updateNestedData("tenant", "forwardingAddress", e.target.value)
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            If unknown, use the rental property address as the last known address.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="City"
              value={data.tenant?.city || ""}
              onChange={(e) =>
                updateNestedData("tenant", "city", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <Input
              type="text"
              placeholder="ST"
              value={data.tenant?.state || ""}
              onChange={(e) =>
                updateNestedData("tenant", "state", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ZIP Code <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="12345"
              value={data.tenant?.zip || ""}
              onChange={(e) =>
                updateNestedData("tenant", "zip", e.target.value)
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant Email (optional)
            </label>
            <Input
              type="email"
              placeholder="tenant@email.com"
              value={data.tenant?.email || ""}
              onChange={(e) =>
                updateNestedData("tenant", "email", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tenant Phone (optional)
            </label>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={data.tenant?.phone || ""}
              onChange={(e) =>
                updateNestedData("tenant", "phone", e.target.value)
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}
