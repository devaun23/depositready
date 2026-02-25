import { NextRequest } from "next/server";
import { buildChatSystemPrompt, CHAT_TOOLS } from "@/lib/chat/system-prompt";
import { executeTool } from "@/lib/chat/extract-case-data";
import { supabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const maxDuration = 60;

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const MODEL = "claude-sonnet-4-20250514";
const MAX_TOKENS = 1024;

interface ChatRequestBody {
  messages: { role: "user" | "assistant"; content: string }[];
  sessionToken: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ChatRequestBody = await request.json();
    const { messages, sessionToken } = body;

    if (!messages?.length || !sessionToken) {
      return new Response(JSON.stringify({ error: "Missing messages or session token" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "AI service not configured" }), {
        status: 503,
        headers: { "Content-Type": "application/json" },
      });
    }

    const systemPrompt = buildChatSystemPrompt();

    // Create the SSE stream
    const stream = new ReadableStream({
      async start(controller) {
        const encoder = new TextEncoder();
        const send = (data: Record<string, unknown>) => {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        };

        try {
          let fullResponse = ""; // Current iteration's text
          let totalResponse = ""; // All text across iterations
          // We may need multiple API calls if Claude uses tools
          let anthropicMessages = messages.map((m) => ({
            role: m.role,
            content: m.content,
          }));

          // Tool use loop: Claude may call tools, we execute and continue
          let iterations = 0;
          const MAX_ITERATIONS = 5; // Safety limit

          while (iterations < MAX_ITERATIONS) {
            iterations++;

            const anthropicRes = await fetch(ANTHROPIC_API, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "x-api-key": apiKey,
                "anthropic-version": "2023-06-01",
              },
              body: JSON.stringify({
                model: MODEL,
                max_tokens: MAX_TOKENS,
                system: systemPrompt,
                messages: anthropicMessages,
                tools: CHAT_TOOLS,
                stream: true,
              }),
            });

            if (!anthropicRes.ok) {
              const errText = await anthropicRes.text();
              console.error("Anthropic API error:", anthropicRes.status, errText);
              send({ type: "error", message: "AI service error" });
              break;
            }

            const reader = anthropicRes.body?.getReader();
            if (!reader) {
              send({ type: "error", message: "No response stream" });
              break;
            }

            const decoder = new TextDecoder();
            let buffer = "";
            let currentToolUse: {
              id: string;
              name: string;
              inputJson: string;
            } | null = null;
            let stopReason: string | null = null;
            let assistantContentBlocks: Array<Record<string, unknown>> = [];

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              buffer += decoder.decode(value, { stream: true });
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                if (!line.startsWith("data: ")) continue;
                const data = line.slice(6).trim();
                if (!data || data === "[DONE]") continue;

                try {
                  const event = JSON.parse(data);

                  // Text delta — stream to client
                  if (event.type === "content_block_delta") {
                    if (event.delta?.type === "text_delta" && event.delta.text) {
                      fullResponse += event.delta.text;
                      send({ type: "text", content: event.delta.text });
                    }
                    // Tool input JSON accumulating
                    if (event.delta?.type === "input_json_delta" && currentToolUse) {
                      currentToolUse.inputJson += event.delta.partial_json || "";
                    }
                  }

                  // Content block start — detect tool_use blocks
                  if (event.type === "content_block_start") {
                    if (event.content_block?.type === "tool_use") {
                      currentToolUse = {
                        id: event.content_block.id,
                        name: event.content_block.name,
                        inputJson: "",
                      };
                    }
                    if (event.content_block?.type === "text") {
                      // Track text blocks for message history
                      assistantContentBlocks.push({
                        type: "text",
                        text: "",
                      });
                    }
                  }

                  // Content block stop — execute tool if it was a tool_use block
                  if (event.type === "content_block_stop") {
                    if (currentToolUse) {
                      // Track tool_use block for message history
                      let toolInput: Record<string, unknown> = {};
                      try {
                        toolInput = JSON.parse(currentToolUse.inputJson || "{}");
                      } catch {
                        toolInput = {};
                      }
                      assistantContentBlocks.push({
                        type: "tool_use",
                        id: currentToolUse.id,
                        name: currentToolUse.name,
                        input: toolInput,
                      });
                    }
                    // Update last text block with accumulated text
                    if (!currentToolUse) {
                      const lastText = assistantContentBlocks.findLast(
                        (b) => b.type === "text"
                      );
                      if (lastText) {
                        lastText.text = fullResponse;
                      }
                    }
                  }

                  // Message delta with stop_reason
                  if (event.type === "message_delta") {
                    stopReason = event.delta?.stop_reason || null;
                  }
                } catch {
                  // Skip malformed events
                }
              }
            }

            // If Claude stopped to use a tool, execute it and continue
            if (stopReason === "tool_use" && currentToolUse) {
              let toolInput: Record<string, unknown> = {};
              try {
                toolInput = JSON.parse(currentToolUse.inputJson || "{}");
              } catch {
                toolInput = {};
              }

              // Execute the tool
              const { result, clientData } = executeTool(
                currentToolUse.name,
                toolInput
              );

              // Send tool result to client for CaseSummaryCard updates
              send({
                type: "tool_result",
                tool: currentToolUse.name,
                result: clientData,
              });

              // If it's a product recommendation, send purchase offer
              if (currentToolUse.name === "recommend_product" && clientData.purchaseOffer) {
                send({
                  type: "purchase_offer",
                  offer: clientData.purchaseOffer,
                });
              }

              // Continue conversation with tool result
              anthropicMessages = [
                ...anthropicMessages,
                {
                  role: "assistant" as const,
                  content: assistantContentBlocks as unknown as string,
                },
                {
                  role: "user" as const,
                  content: [
                    {
                      type: "tool_result",
                      tool_use_id: currentToolUse.id,
                      content: JSON.stringify(result),
                    },
                  ] as unknown as string,
                },
              ];

              // Reset for next iteration
              totalResponse += fullResponse;
              fullResponse = "";
              currentToolUse = null;
              assistantContentBlocks = [];
              continue;
            }

            // Normal stop — done
            break;
          }

          // Save session to database (fire-and-forget)
          totalResponse += fullResponse;
          saveSession(sessionToken, messages, totalResponse).catch((err) =>
            console.error("Failed to save chat session:", err)
          );

          send({ type: "done" });
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        } catch (err) {
          console.error("Chat stream error:", err);
          const encoder = new TextEncoder();
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ type: "error", message: "Stream error" })}\n\n`
            )
          );
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat route error:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}

/**
 * Save/update chat session in database (fire-and-forget).
 */
async function saveSession(
  sessionToken: string,
  messages: { role: string; content: string }[],
  lastResponse: string
) {
  const allMessages = [
    ...messages,
    ...(lastResponse ? [{ role: "assistant", content: lastResponse }] : []),
  ];

  // Upsert session
  const { error } = await supabaseAdmin
    .from("chat_sessions")
    .upsert(
      {
        session_token: sessionToken,
        messages: allMessages,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "session_token" }
    );

  if (error) {
    console.error("Failed to save chat session:", error);
  }
}
