import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function WizardLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="mt-4 text-slate-600">Loading wizard...</p>
      </div>
    </div>
  );
}
