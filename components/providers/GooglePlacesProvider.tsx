"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import Script from "next/script";

interface GooglePlacesContextType {
  isLoaded: boolean;
  isError: boolean;
}

const GooglePlacesContext = createContext<GooglePlacesContextType>({
  isLoaded: false,
  isError: false,
});

export function GooglePlacesProvider({ children }: { children: ReactNode }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  // Check if already loaded (e.g., from browser cache)
  useEffect(() => {
    if (window.google?.maps?.places) {
      setIsLoaded(true);
    }
  }, []);

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_PLACES_API_KEY;

  if (!apiKey) {
    // No API key configured - render children without Places functionality
    return <>{children}</>;
  }

  return (
    <GooglePlacesContext.Provider value={{ isLoaded, isError }}>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        strategy="lazyOnload"
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
      {children}
    </GooglePlacesContext.Provider>
  );
}

export function useGooglePlaces() {
  return useContext(GooglePlacesContext);
}
