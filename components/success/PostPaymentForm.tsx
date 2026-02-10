"use client";

import { useState, useCallback } from "react";
import { Button } from "@/components/ui";

interface PostPaymentFormProps {
  orderId: string;
  email: string;
  downloadToken: string;
  onComplete: (downloadUrl: string) => void;
}

interface FormData {
  fullName: string;
  propertyAddress: string;
  landlordName: string;
  email: string;
}

export function PostPaymentForm({ orderId, email, downloadToken, onComplete }: PostPaymentFormProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    propertyAddress: "",
    landlordName: "",
    email: email || "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = formData.fullName.trim() && formData.propertyAddress.trim() && formData.landlordName.trim();

  const handleSubmit = useCallback(async () => {
    if (!canSubmit || isSubmitting) return;

    setIsSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/complete-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId,
          downloadToken,
          tenantName: formData.fullName.trim(),
          propertyAddress: formData.propertyAddress.trim(),
          landlordName: formData.landlordName.trim(),
          email: formData.email.trim(),
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Failed to complete order");
      }

      const { downloadUrl } = await response.json();
      onComplete(downloadUrl || `/download?token=${downloadToken}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [canSubmit, isSubmitting, orderId, downloadToken, formData, onComplete]);

  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Last Step — Personalize Your Packet
        </h2>
        <p className="text-sm text-gray-600">
          We need a few details to generate your personalized dispute documents.
        </p>
      </div>

      <div className="space-y-4">
        {/* Full name */}
        <div>
          <label htmlFor="post-name" className="block text-sm font-medium text-gray-900 mb-1.5">
            Your full name <span className="text-red-500">*</span>
          </label>
          <input
            id="post-name"
            type="text"
            autoComplete="name"
            placeholder="Jane Smith"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
          />
        </div>

        {/* Property address */}
        <div>
          <label htmlFor="post-address" className="block text-sm font-medium text-gray-900 mb-1.5">
            Rental property address <span className="text-red-500">*</span>
          </label>
          <input
            id="post-address"
            type="text"
            autoComplete="street-address"
            placeholder="123 Main St, Apt 4B, City, State ZIP"
            value={formData.propertyAddress}
            onChange={(e) => setFormData({ ...formData, propertyAddress: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
          />
        </div>

        {/* Landlord name */}
        <div>
          <label htmlFor="post-landlord" className="block text-sm font-medium text-gray-900 mb-1.5">
            Landlord name or company <span className="text-red-500">*</span>
          </label>
          <input
            id="post-landlord"
            type="text"
            placeholder="Acme Property Management LLC"
            value={formData.landlordName}
            onChange={(e) => setFormData({ ...formData, landlordName: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
          />
        </div>

        {/* Email (pre-filled) */}
        <div>
          <label htmlFor="post-email" className="block text-sm font-medium text-gray-900 mb-1.5">
            Email
          </label>
          <input
            id="post-email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent text-gray-900"
          />
          <p className="text-xs text-gray-500 mt-1">
            We'll send your documents to this email.
          </p>
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <Button
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
        loading={isSubmitting}
        className="w-full"
        size="lg"
      >
        Generate My Dispute Packet
      </Button>

      <p className="text-xs text-gray-500 text-center">
        Your documents will be ready to download immediately.
      </p>
    </div>
  );
}
