"use client";

import { useEffect } from "react";
import { usePMWizard } from "../PMWizardContext";
import { Input } from "@/components/ui";

export function Step4CompanyInfo() {
  const { data, updateNestedData, setCanProceed } = usePMWizard();

  useEffect(() => {
    const isValid = Boolean(
      data.company?.companyName &&
        data.company?.managerName &&
        data.company?.address &&
        data.company?.city &&
        data.company?.zip &&
        data.company?.email
    );
    setCanProceed(isValid);
  }, [data.company, setCanProceed]);

  return (
    <div className="space-y-6">
      <p className="text-gray-600">
        Enter your property management company details. This will appear on the
        notice letter and signature block.
      </p>

      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="ABC Property Management"
            value={data.company?.companyName || ""}
            onChange={(e) =>
              updateNestedData("company", "companyName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Property Manager Name <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="Full legal name"
            value={data.company?.managerName || ""}
            onChange={(e) =>
              updateNestedData("company", "managerName", e.target.value)
            }
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Company Address <span className="text-red-500">*</span>
          </label>
          <Input
            type="text"
            placeholder="123 Business St"
            value={data.company?.address || ""}
            onChange={(e) =>
              updateNestedData("company", "address", e.target.value)
            }
          />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="City"
              value={data.company?.city || ""}
              onChange={(e) =>
                updateNestedData("company", "city", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              State
            </label>
            <Input
              type="text"
              value={data.company?.state || "FL"}
              onChange={(e) =>
                updateNestedData("company", "state", e.target.value)
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
              value={data.company?.zip || ""}
              onChange={(e) =>
                updateNestedData("company", "zip", e.target.value)
              }
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              type="email"
              placeholder="manager@company.com"
              value={data.company?.email || ""}
              onChange={(e) =>
                updateNestedData("company", "email", e.target.value)
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Phone
            </label>
            <Input
              type="tel"
              placeholder="(555) 123-4567"
              value={data.company?.phone || ""}
              onChange={(e) =>
                updateNestedData("company", "phone", e.target.value)
              }
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            FL Property Manager License # (optional)
          </label>
          <Input
            type="text"
            placeholder="License number"
            value={data.company?.licenseNumber || ""}
            onChange={(e) =>
              updateNestedData("company", "licenseNumber", e.target.value)
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            Adds credibility to your notice. Not required.
          </p>
        </div>
      </div>
    </div>
  );
}
