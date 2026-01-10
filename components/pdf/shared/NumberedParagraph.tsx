import { View, Text } from "@react-pdf/renderer";
import { ReactNode } from "react";
import { pleadingStyles } from "./styles/pleading";

interface NumberedParagraphProps {
  number: number;
  children: ReactNode;
}

interface SubParagraphProps {
  letter: string;
  children: ReactNode;
}

/**
 * NumberedParagraph - Court-style numbered paragraph
 *
 * Format:
 * 1.      [Content text goes here, double-spaced and justified...]
 */
export function NumberedParagraph({
  number,
  children,
}: NumberedParagraphProps) {
  return (
    <View style={pleadingStyles.numberedParagraph}>
      <Text style={pleadingStyles.paragraphNumber}>{number}.</Text>
      <View style={pleadingStyles.paragraphContent}>
        {typeof children === "string" ? (
          <Text style={pleadingStyles.bodyText}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

/**
 * SubParagraph - Indented sub-paragraph with letter
 *
 * Format:
 *         (a)     [Sub-content text...]
 */
export function SubParagraph({ letter, children }: SubParagraphProps) {
  return (
    <View style={pleadingStyles.subParagraph}>
      <Text style={pleadingStyles.subParagraphLetter}>({letter})</Text>
      <View style={pleadingStyles.subParagraphContent}>
        {typeof children === "string" ? (
          <Text style={pleadingStyles.bodyTextSingle}>{children}</Text>
        ) : (
          children
        )}
      </View>
    </View>
  );
}

/**
 * CheckboxItem - Checkbox-style item for violation lists
 */
export function CheckboxItem({
  checked,
  children,
}: {
  checked: boolean;
  children: ReactNode;
}) {
  return (
    <View style={pleadingStyles.checkboxRow}>
      <View
        style={checked ? pleadingStyles.checkboxChecked : pleadingStyles.checkbox}
      />
      <Text style={pleadingStyles.checkboxLabel}>{children}</Text>
    </View>
  );
}
