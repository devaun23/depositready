"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function DownloadContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<
    "loading" | "downloading" | "success" | "error"
  >("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [manualToken, setManualToken] = useState("");

  const downloadWithToken = async (downloadToken: string) => {
    setStatus("downloading");
    setErrorMessage(null);

    try {
      const response = await fetch(`/api/generate?token=${downloadToken}`);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Download failed");
      }

      // Get the blob and trigger download
      const blob = await response.blob();
      const contentDisposition = response.headers.get("content-disposition");
      const filenameMatch = contentDisposition?.match(/filename="(.+)"/);
      const filename = filenameMatch?.[1] || "DepositReady_Packet.pdf";

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);

      setStatus("success");
    } catch (err) {
      console.error("Download error:", err);
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Download failed. Please try again."
      );
    }
  };

  useEffect(() => {
    if (token) {
      downloadWithToken(token);
    } else {
      setStatus("error");
      setErrorMessage("No download token provided");
    }
  }, [token]);

  const handleManualDownload = (e: React.FormEvent) => {
    e.preventDefault();
    if (manualToken.trim()) {
      downloadWithToken(manualToken.trim());
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-gray-900">
            DepositReady
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          {status === "loading" && (
            <>
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center">
                <svg
                  className="animate-spin h-12 w-12 text-blue-600"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Preparing Your Download
              </h1>
              <p className="text-gray-600">
                Verifying your purchase and generating your PDF...
              </p>
            </>
          )}

          {status === "downloading" && (
            <>
              <div className="mx-auto w-16 h-16 mb-6 flex items-center justify-center">
                <svg
                  className="animate-spin h-12 w-12 text-blue-600"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Downloading Your Packet
              </h1>
              <p className="text-gray-600">
                Your dispute packet is being downloaded...
              </p>
            </>
          )}

          {status === "success" && (
            <>
              <div className="mx-auto w-16 h-16 mb-6 bg-green-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-green-600"
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
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Download Complete
              </h1>
              <p className="text-gray-600 mb-6">
                Your dispute packet has been downloaded successfully.
              </p>

              <button
                onClick={() => token && downloadWithToken(token)}
                className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
              >
                Download Again
              </button>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">
                  What to Do Next
                </h2>
                <div className="text-left space-y-3 text-sm text-gray-600">
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-medium text-xs">
                      1
                    </span>
                    <div>
                      <strong>Print the demand letter</strong> from your packet
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-medium text-xs">
                      2
                    </span>
                    <div>
                      <strong>Sign and date</strong> the letter
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-medium text-xs">
                      3
                    </span>
                    <div>
                      <strong>Send via certified mail</strong> with return
                      receipt requested
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-600 font-medium text-xs">
                      4
                    </span>
                    <div>
                      <strong>Keep copies</strong> of everything for your
                      records
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {status === "error" && (
            <>
              <div className="mx-auto w-16 h-16 mb-6 bg-red-100 rounded-full flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-red-600"
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
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Download Failed
              </h1>
              <p className="text-gray-600 mb-6">{errorMessage}</p>

              {/* Manual token entry */}
              <form
                onSubmit={handleManualDownload}
                className="max-w-sm mx-auto mb-6"
              >
                <label className="block text-sm text-gray-600 mb-2 text-left">
                  Enter your download token:
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={manualToken}
                    onChange={(e) => setManualToken(e.target.value)}
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    disabled={!manualToken.trim()}
                    className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Download
                  </button>
                </div>
              </form>

              <p className="text-sm text-gray-500">
                If you continue to have issues, please contact support with your
                order details.
              </p>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default function DownloadPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      }
    >
      <DownloadContent />
    </Suspense>
  );
}
