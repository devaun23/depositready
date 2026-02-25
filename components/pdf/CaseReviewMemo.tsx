import { Document, View, Text } from "@react-pdf/renderer";
import { MemoPage, MemoCoverPage } from "./shared/MemoPage";
import { memoStyles, MEMO_COLORS } from "./shared/styles/memo";

export interface CaseReviewMemoProps {
  name: string;
  stateCode: string;
  depositAmount: number;
  moveOutDate: string | null;
  landlordName: string | null;
  propertyAddress: string | null;
  generatedDate: Date;
  founderNotes: string | null;
  sections: {
    yourSituation: string;
    whatTheLawSays: string;
    caseAssessment: string;
    actionPlan: string;
    keyDeadlines: string;
    whenToEscalate: string;
  };
}

// ────────────────────────────────────────────
// Markdown to React-PDF renderer
// ────────────────────────────────────────────

type ParsedLine =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "bullet"; text: string }
  | { type: "numbered"; number: string; text: string }
  | { type: "paragraph"; segments: TextSegment[] }
  | { type: "empty" };

type TextSegment =
  | { kind: "plain"; text: string }
  | { kind: "bold"; text: string }
  | { kind: "italic"; text: string };

function parseInlineFormatting(text: string): TextSegment[] {
  const segments: TextSegment[] = [];
  const pattern = /\*\*(.+?)\*\*|\*(.+?)\*/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ kind: "plain", text: text.slice(lastIndex, match.index) });
    }
    if (match[1]) {
      segments.push({ kind: "bold", text: match[1] });
    } else if (match[2]) {
      segments.push({ kind: "italic", text: match[2] });
    }
    lastIndex = pattern.lastIndex;
  }

  if (lastIndex < text.length) {
    segments.push({ kind: "plain", text: text.slice(lastIndex) });
  }

  if (segments.length === 0) {
    segments.push({ kind: "plain", text });
  }

  return segments;
}

function parseMarkdown(content: string): ParsedLine[] {
  const lines = content.split("\n");
  const parsed: ParsedLine[] = [];

  for (const raw of lines) {
    const line = raw.trim();

    if (!line) {
      parsed.push({ type: "empty" });
      continue;
    }

    if (/^###\s+/.test(line)) {
      parsed.push({ type: "subheading", text: line.replace(/^###\s+/, "") });
      continue;
    }

    if (/^#{1,2}\s+/.test(line)) {
      parsed.push({ type: "heading", text: line.replace(/^#{1,2}\s+/, "") });
      continue;
    }

    if (/^[-*]\s+/.test(line)) {
      parsed.push({ type: "bullet", text: line.replace(/^[-*]\s+/, "") });
      continue;
    }

    const numberedMatch = line.match(/^(\d+)[.)]\s+(.+)/);
    if (numberedMatch) {
      parsed.push({
        type: "numbered",
        number: numberedMatch[1],
        text: numberedMatch[2],
      });
      continue;
    }

    parsed.push({ type: "paragraph", segments: parseInlineFormatting(line) });
  }

  return parsed;
}

function isStatuteReference(text: string): boolean {
  const statutePattern =
    /\u00A7|statute|code\s+\u00A7|F\.S\.|Cal\.\s*Civ|Tex\.\s*Prop|N\.Y\.\s*Gen|O\.C\.G\.A|ILCS|N\.J\.S\.A|A\.R\.S|C\.R\.S|RCW|N\.C\.G\.S|Va\.\s*Code|O\.R\.C|Pa\.\s*C\.S|MCL|M\.G\.L/i;
  return statutePattern.test(text);
}

function stripMarkdown(text: string): string {
  return text.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1");
}

// ────────────────────────────────────────────
// Render helpers
// ────────────────────────────────────────────

function InlineText({ segments }: { segments: TextSegment[] }) {
  return (
    <Text style={memoStyles.body}>
      {segments.map((seg, i) => {
        switch (seg.kind) {
          case "bold":
            return (
              <Text key={i} style={memoStyles.bodyBold}>
                {seg.text}
              </Text>
            );
          case "italic":
            return (
              <Text key={i} style={memoStyles.bodyItalic}>
                {seg.text}
              </Text>
            );
          default:
            return <Text key={i}>{seg.text}</Text>;
        }
      })}
    </Text>
  );
}

function RenderedSection({ content }: { content: string }) {
  const lines = parseMarkdown(content);
  let prevEmpty = false;

  return (
    <View>
      {lines.map((line, i) => {
        switch (line.type) {
          case "empty":
            if (prevEmpty) return null;
            prevEmpty = true;
            return <View key={i} style={{ height: 6 }} />;

          case "heading":
            prevEmpty = false;
            return (
              <Text key={i} style={memoStyles.subsectionHeader}>
                {stripMarkdown(line.text)}
              </Text>
            );

          case "subheading":
            prevEmpty = false;
            return (
              <Text
                key={i}
                style={[memoStyles.subsectionHeader, { fontSize: 10 }]}
              >
                {stripMarkdown(line.text)}
              </Text>
            );

          case "bullet": {
            prevEmpty = false;
            if (isStatuteReference(line.text)) {
              return (
                <View key={i} style={memoStyles.calloutBox}>
                  <Text style={memoStyles.calloutLabel}>Key Statute</Text>
                  <Text style={memoStyles.calloutText}>
                    {stripMarkdown(line.text)}
                  </Text>
                </View>
              );
            }
            return (
              <View key={i} style={memoStyles.bulletRow}>
                <Text style={memoStyles.bulletDot}>{"\u2022"}</Text>
                <Text style={memoStyles.bulletText}>
                  {stripMarkdown(line.text)}
                </Text>
              </View>
            );
          }

          case "numbered":
            prevEmpty = false;
            return (
              <View key={i} style={memoStyles.checklistRow}>
                <View style={memoStyles.checklistBox} />
                <Text style={memoStyles.checklistNumber}>{line.number}.</Text>
                <Text style={memoStyles.checklistText}>
                  {stripMarkdown(line.text)}
                </Text>
              </View>
            );

          case "paragraph": {
            prevEmpty = false;
            if (
              line.segments.length === 1 &&
              line.segments[0].kind === "plain" &&
              isStatuteReference(line.segments[0].text)
            ) {
              return (
                <View key={i} style={memoStyles.calloutBox}>
                  <Text style={memoStyles.calloutLabel}>Legal Reference</Text>
                  <Text style={memoStyles.calloutText}>
                    {line.segments[0].text}
                  </Text>
                </View>
              );
            }
            return <InlineText key={i} segments={line.segments} />;
          }

          default:
            return null;
        }
      })}
    </View>
  );
}

function parseDeadlineRows(
  content: string
): { deadline: string; date: string; status: string; days: string }[] {
  const rows: {
    deadline: string;
    date: string;
    status: string;
    days: string;
  }[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const deadlineMatch = line.match(
      /[-*]?\s*\*?\*?(.+?)\*?\*?\s*[:|\u2014-]\s*(.+?)(?:\s*[-\u2014]\s*(PASSED|UPCOMING|COMPLIANT|VIOLATED|PENDING|OK))?(?:\s*\((.+?)\))?$/i
    );
    if (deadlineMatch && deadlineMatch[1].trim().length > 2) {
      rows.push({
        deadline: stripMarkdown(deadlineMatch[1].trim()),
        date: stripMarkdown(deadlineMatch[2].trim()),
        status: deadlineMatch[3]?.toUpperCase() || "\u2014",
        days: deadlineMatch[4] || "\u2014",
      });
    }
  }

  return rows;
}

// ────────────────────────────────────────────
// Main Component
// ────────────────────────────────────────────

export function CaseReviewMemo({
  name,
  stateCode,
  depositAmount,
  moveOutDate,
  landlordName,
  propertyAddress,
  generatedDate,
  founderNotes,
  sections,
}: CaseReviewMemoProps) {
  const sectionEntries = [
    { number: "1", title: "Your Situation", content: sections.yourSituation },
    {
      number: "2",
      title: "What the Law Says",
      content: sections.whatTheLawSays,
    },
    { number: "3", title: "Case Assessment", content: sections.caseAssessment },
  ];

  const deadlineRows = parseDeadlineRows(sections.keyDeadlines);

  return (
    <Document>
      {/* Cover Page */}
      <MemoCoverPage
        name={name}
        stateCode={stateCode}
        depositAmount={depositAmount}
        moveOutDate={moveOutDate}
        landlordName={landlordName}
        propertyAddress={propertyAddress}
        generatedDate={generatedDate}
      />

      {/* Analysis Sections (pages 2-3) */}
      <MemoPage name={name}>
        {sectionEntries.map((section) => (
          <View key={section.number} wrap={false}>
            <Text style={memoStyles.sectionHeader}>
              <Text style={memoStyles.sectionNumber}>{section.number}. </Text>
              {section.title}
            </Text>
            <RenderedSection content={section.content} />
          </View>
        ))}
      </MemoPage>

      {/* Action Plan + Deadlines + Escalation (pages 3-4) */}
      <MemoPage name={name}>
        {/* Action Plan */}
        <View>
          <Text style={memoStyles.sectionHeader}>
            <Text style={memoStyles.sectionNumber}>4. </Text>
            Action Plan
          </Text>
          <RenderedSection content={sections.actionPlan} />
        </View>

        {/* Key Deadlines */}
        <View style={{ marginTop: 16 }}>
          <Text style={memoStyles.sectionHeader}>
            <Text style={memoStyles.sectionNumber}>5. </Text>
            Key Deadlines
          </Text>

          {deadlineRows.length > 0 ? (
            <View style={memoStyles.table}>
              <View style={memoStyles.tableHeaderRow}>
                <Text style={[memoStyles.tableHeaderCell, { width: "35%" }]}>
                  Deadline
                </Text>
                <Text style={[memoStyles.tableHeaderCell, { width: "25%" }]}>
                  Date
                </Text>
                <Text style={[memoStyles.tableHeaderCell, { width: "20%" }]}>
                  Status
                </Text>
                <Text style={[memoStyles.tableHeaderCell, { width: "20%" }]}>
                  Days
                </Text>
              </View>

              {deadlineRows.map((row, i) => (
                <View
                  key={i}
                  style={
                    i % 2 === 1 ? memoStyles.tableRowAlt : memoStyles.tableRow
                  }
                >
                  <Text style={[memoStyles.tableCellBold, { width: "35%" }]}>
                    {row.deadline}
                  </Text>
                  <Text style={[memoStyles.tableCell, { width: "25%" }]}>
                    {row.date}
                  </Text>
                  <Text
                    style={[
                      memoStyles.tableCellStatus,
                      { width: "20%" },
                      {
                        color:
                          row.status === "PASSED" || row.status === "VIOLATED"
                            ? MEMO_COLORS.red
                            : row.status === "UPCOMING" ||
                              row.status === "PENDING"
                            ? MEMO_COLORS.amber
                            : MEMO_COLORS.teal,
                      },
                    ]}
                  >
                    {row.status}
                  </Text>
                  <Text style={[memoStyles.tableCell, { width: "20%" }]}>
                    {row.days}
                  </Text>
                </View>
              ))}
            </View>
          ) : (
            <RenderedSection content={sections.keyDeadlines} />
          )}
        </View>

        {/* When to Escalate */}
        <View style={{ marginTop: 16 }}>
          <Text style={memoStyles.sectionHeader}>
            <Text style={memoStyles.sectionNumber}>6. </Text>
            When to Escalate
          </Text>
          <RenderedSection content={sections.whenToEscalate} />
        </View>
      </MemoPage>

      {/* Notes + Disclaimer (last page) */}
      <MemoPage name={name} headerTitle="Notes & Disclaimer">
        {founderNotes && (
          <View style={memoStyles.founderBox} wrap={false}>
            <Text style={memoStyles.founderLabel}>
              Specialist&apos;s Notes
            </Text>
            <Text style={memoStyles.founderText}>{founderNotes}</Text>
          </View>
        )}

        <View style={memoStyles.disclaimer}>
          <Text style={[memoStyles.subsectionHeader, { marginTop: 0 }]}>
            Important Disclaimer
          </Text>
          <Text style={memoStyles.disclaimerText}>
            This case review is for informational purposes only and does not
            constitute legal advice. DepositReady is not a law firm, and no
            attorney-client relationship is formed by the preparation or delivery
            of this document. The information provided is based on publicly
            available state statutes and the facts as described by the client.
            Individual results may vary based on specific circumstances,
            including local ordinances, lease terms, and judicial discretion.
          </Text>
          <Text style={[memoStyles.disclaimerText, { marginTop: 6 }]}>
            For legal representation or advice specific to your situation,
            please consult a licensed attorney in your state. If your case
            involves amounts exceeding the small claims court limit, legal
            representation is recommended.
          </Text>
          <Text style={[memoStyles.disclaimerText, { marginTop: 6 }]}>
            {"\u00A9"} {generatedDate.getFullYear()} DepositReady —
            depositready.co
          </Text>
        </View>

        <View style={memoStyles.contactFooter}>
          <Text style={memoStyles.contactText}>
            Questions about your case review?
          </Text>
          <Text style={[memoStyles.contactLink, { marginTop: 4 }]}>
            hello@depositready.co
          </Text>
          <Text style={[memoStyles.contactText, { marginTop: 2 }]}>
            depositready.co
          </Text>
        </View>
      </MemoPage>
    </Document>
  );
}
