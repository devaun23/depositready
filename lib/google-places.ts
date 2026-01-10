import { ParsedAddress } from "@/types/google-places";

/**
 * Parse Google Places result into address components
 *
 * Google Places returns address_components array with types like:
 * - street_number, route (for street address)
 * - locality (city)
 * - administrative_area_level_1 (state)
 * - postal_code (zip)
 */
export function parseGooglePlaceResult(
  place: google.maps.places.PlaceResult
): ParsedAddress {
  const result: ParsedAddress = {
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
  };

  if (!place.address_components) {
    return result;
  }

  let streetNumber = "";
  let route = "";

  for (const component of place.address_components) {
    const types = component.types;

    if (types.includes("street_number")) {
      streetNumber = component.long_name;
    }
    if (types.includes("route")) {
      route = component.long_name;
    }
    if (types.includes("locality")) {
      result.city = component.long_name;
    }
    // Some addresses use sublocality for city
    if (types.includes("sublocality_level_1") && !result.city) {
      result.city = component.long_name;
    }
    if (types.includes("administrative_area_level_1")) {
      result.state = component.short_name; // "FL" instead of "Florida"
    }
    if (types.includes("postal_code")) {
      result.zip = component.long_name;
    }
  }

  // Combine street number and route
  result.streetAddress = [streetNumber, route].filter(Boolean).join(" ");

  return result;
}

/**
 * Autocomplete options configured for US addresses only
 */
export function getAutocompleteOptions(): google.maps.places.AutocompleteOptions {
  return {
    componentRestrictions: { country: "us" },
    fields: ["address_components", "formatted_address"],
    types: ["address"], // Only street addresses, not businesses
  };
}
