import { GooglePlacesProvider } from "@/components/providers/GooglePlacesProvider";

export default function WizardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <GooglePlacesProvider>{children}</GooglePlacesProvider>;
}
