import { WizardData } from "@/types/dispute";

/**
 * Generate and download PDF packet
 */
export async function downloadPDF(data: WizardData): Promise<void> {
  const response = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to generate PDF");
  }

  // Get the blob
  const blob = await response.blob();

  // Create download link
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download =
    response.headers.get("Content-Disposition")?.split("filename=")[1]?.replace(/"/g, "") ||
    "DepositReady_Packet.pdf";
  document.body.appendChild(a);
  a.click();

  // Cleanup
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

/**
 * Download PDF using token (post-payment)
 */
export async function downloadPDFWithToken(token: string): Promise<void> {
  const response = await fetch(`/api/generate?token=${encodeURIComponent(token)}`);

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Failed to download PDF");
  }

  const blob = await response.blob();

  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "DepositReady_Packet.pdf";
  document.body.appendChild(a);
  a.click();

  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}
