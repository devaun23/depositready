"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import { useGooglePlaces } from "@/components/providers/GooglePlacesProvider";
import {
  parseGooglePlaceResult,
  getAutocompleteOptions,
} from "@/lib/google-places";
import { ParsedAddress } from "@/types/google-places";

interface AddressAutocompleteProps {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  required?: boolean;
  onChange: (value: string) => void;
  onAddressSelect: (address: ParsedAddress) => void;
  className?: string;
}

export function AddressAutocomplete({
  id,
  label,
  value,
  placeholder = "Start typing an address...",
  required = false,
  onChange,
  onAddressSelect,
  className = "",
}: AddressAutocompleteProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const { isLoaded, isError } = useGooglePlaces();
  const [isFocused, setIsFocused] = useState(false);

  const handlePlaceSelect = useCallback(() => {
    const place = autocompleteRef.current?.getPlace();
    if (!place || !place.address_components) {
      return;
    }

    const parsed = parseGooglePlaceResult(place);

    // Update the input field with street address
    onChange(parsed.streetAddress);

    // Notify parent to fill other fields
    onAddressSelect(parsed);
  }, [onChange, onAddressSelect]);

  // Initialize autocomplete when Google Maps loads
  useEffect(() => {
    if (!isLoaded || !inputRef.current || autocompleteRef.current) {
      return;
    }

    const autocomplete = new google.maps.places.Autocomplete(
      inputRef.current,
      getAutocompleteOptions()
    );

    autocomplete.addListener("place_changed", handlePlaceSelect);
    autocompleteRef.current = autocomplete;

    // Cleanup
    return () => {
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
      }
    };
  }, [isLoaded, handlePlaceSelect]);

  // Base input styles matching existing codebase pattern
  const inputStyles = `
    w-full px-4 py-2 border border-gray-300 rounded-lg
    focus:ring-2 focus:ring-black focus:border-black
    ${className}
  `.trim();

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={inputStyles}
          autoComplete="off"
        />
        {/* Loading indicator while Google Places loads */}
        {!isLoaded && isFocused && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <svg
              className="animate-spin h-4 w-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
          </div>
        )}
      </div>
      {isError && (
        <p className="mt-1 text-xs text-amber-600">
          Address suggestions unavailable. You can still type manually.
        </p>
      )}
    </div>
  );
}
