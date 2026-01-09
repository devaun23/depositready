"use client";

import { useState, useEffect } from "react";

interface PDFPreviewViewerProps {
  className?: string;
}

export function PDFPreviewViewer({ className = "" }: PDFPreviewViewerProps) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPreviewPDF() {
      try {
        setLoading(true);
        const response = await fetch("/api/preview-pdf");

        if (!response.ok) {
          throw new Error("Failed to load preview");
        }

        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } catch (err) {
        console.error("Error loading preview PDF:", err);
        setError("Unable to load preview");
      } finally {
        setLoading(false);
      }
    }

    loadPreviewPDF();

    // Cleanup blob URL on unmount
    return () => {
      if (pdfUrl) {
        URL.revokeObjectURL(pdfUrl);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ minHeight: "500px" }}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto mb-3"></div>
          <p className="text-gray-600 text-sm">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`} style={{ minHeight: "500px" }}>
        <div className="text-center text-gray-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-lg overflow-hidden shadow-lg border border-gray-200 ${className}`}
      style={{ minHeight: "600px" }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {/* PDF Viewer */}
      <iframe
        src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
        className="w-full h-full"
        style={{
          minHeight: "600px",
          border: "none",
          userSelect: "none",
        }}
        title="Packet Preview"
      />

      {/* Overlay to prevent text selection */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "transparent",
        }}
      />

      {/* Preview badge */}
      <div className="absolute top-3 right-3 bg-black/80 text-white text-xs px-3 py-1 rounded-full">
        Preview
      </div>
    </div>
  );
}
