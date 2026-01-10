import { View, Text } from "@react-pdf/renderer";
import { pleadingStyles } from "./styles/pleading";

interface SignatureBlockProps {
  name: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  email?: string;
  phone?: string;
  showDate?: boolean;
}

/**
 * SignatureBlock - Formal signature area for legal documents
 *
 * Format:
 *                               Respectfully submitted,
 *
 *
 *                               ________________________
 *                               [Name]
 *                               [Address]
 *                               [City, State ZIP]
 *                               [Email]
 *                               [Phone]
 */
export function SignatureBlock({
  name,
  address,
  city,
  state,
  zip,
  email,
  phone,
  showDate = false,
}: SignatureBlockProps) {
  const fullAddress =
    city && state && zip ? `${city}, ${state} ${zip}` : "";

  return (
    <View style={pleadingStyles.signatureBlock}>
      <Text style={pleadingStyles.signatureLabel}>Respectfully submitted,</Text>

      <View style={pleadingStyles.signatureLine} />

      <Text style={pleadingStyles.signatureName}>{name}</Text>

      {address && (
        <Text style={pleadingStyles.signatureAddress}>{address}</Text>
      )}

      {fullAddress && (
        <Text style={pleadingStyles.signatureAddress}>{fullAddress}</Text>
      )}

      {email && (
        <Text style={pleadingStyles.signatureAddress}>{email}</Text>
      )}

      {phone && (
        <Text style={pleadingStyles.signatureAddress}>{phone}</Text>
      )}

      {showDate && (
        <Text style={[pleadingStyles.signatureAddress, { marginTop: 12 }]}>
          Date: _______________________
        </Text>
      )}
    </View>
  );
}

/**
 * CertificateOfService - Proof of mailing section
 */
export function CertificateOfService({
  recipientName,
  recipientAddress,
  mailingMethod = "certified mail, return receipt requested",
}: {
  recipientName: string;
  recipientAddress: string;
  mailingMethod?: string;
}) {
  return (
    <View style={{ marginTop: 36 }}>
      <Text style={[pleadingStyles.sectionHeaderUnderline, { textAlign: "center" }]}>
        CERTIFICATE OF SERVICE
      </Text>

      <Text style={[pleadingStyles.bodyText, { marginTop: 16 }]}>
        I hereby certify that on _________________, 20____, I served a true and
        correct copy of the foregoing document upon the following party via{" "}
        {mailingMethod}:
      </Text>

      <View style={{ marginLeft: 48, marginTop: 16, marginBottom: 16 }}>
        <Text style={pleadingStyles.bodyTextSingle}>{recipientName}</Text>
        <Text style={pleadingStyles.bodyTextSingle}>{recipientAddress}</Text>
      </View>

      <View style={{ marginTop: 24 }}>
        <Text style={pleadingStyles.bodyTextSingle}>
          Tracking Number: ________________________________
        </Text>
      </View>

      <View style={[pleadingStyles.signatureBlock, { marginTop: 36 }]}>
        <View style={pleadingStyles.signatureLine} />
        <Text style={pleadingStyles.signatureName}>Signature</Text>
        <Text style={[pleadingStyles.signatureAddress, { marginTop: 12 }]}>
          Date: _______________________
        </Text>
      </View>
    </View>
  );
}
