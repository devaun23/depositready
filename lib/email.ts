import { Resend } from "resend";

// Initialize Resend client
const resendApiKey = process.env.RESEND_API_KEY;

if (!resendApiKey) {
  console.warn("RESEND_API_KEY not configured - emails will not be sent");
}

export const resend = resendApiKey ? new Resend(resendApiKey) : null;

// Email configuration
export const EMAIL_CONFIG = {
  from: process.env.RESEND_FROM_EMAIL || "DepositReady <noreply@depositready.com>",
  replyTo: "support@depositready.com",
};

// Check if email is configured
export function isEmailConfigured(): boolean {
  return !!resend;
}

// Types
export interface WelcomeEmailData {
  email: string;
  stateCode?: string;
  stateName?: string;
  depositAmount?: number;
  potentialRecovery?: number;
  source: "quiz" | "free_letter" | "eligibility_modal";
}

export interface OrderConfirmationEmailData {
  email: string;
  orderId: string;
  downloadToken: string;
  productType: "basic" | "full" | "landlord" | "pm";
  amountPaid: number;
  tenantName?: string;
  stateName?: string;
}

// Email templates as HTML strings
function getWelcomeEmailHtml(data: WelcomeEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://depositready.com";
  const recoveryText = data.potentialRecovery
    ? `Based on your information, you could potentially recover up to <strong>$${data.potentialRecovery.toLocaleString()}</strong> under ${data.stateName || "state"} law.`
    : "We can help you understand your rights and take action.";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to DepositReady</title>
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 24px; margin: 0;">DepositReady</h1>
  </div>

  <h2 style="font-size: 20px; margin-bottom: 16px;">Your Security Deposit Recovery Starts Now</h2>

  <p>${recoveryText}</p>

  <p>Here's what happens next:</p>

  <ol style="padding-left: 20px;">
    <li><strong>Understand your rights</strong> — Your landlord has specific deadlines under ${data.stateName || "state"} law</li>
    <li><strong>Send a demand letter</strong> — A formal letter puts your landlord on notice</li>
    <li><strong>Take action if needed</strong> — Small claims court is designed to be accessible</li>
  </ol>

  <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
    <p style="margin: 0 0 12px 0; font-weight: bold;">Ready to get your deposit back?</p>
    <a href="${baseUrl}/quiz" style="display: inline-block; background: #000; color: #fff; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 500;">Start Your Recovery</a>
  </div>

  <p style="font-size: 14px; color: #666;">
    Questions? Reply to this email or visit our <a href="${baseUrl}/faq" style="color: #2563eb;">FAQ</a>.
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 12px; color: #9ca3af; text-align: center;">
    DepositReady provides tools and templates based on state law. This is not legal advice.<br>
    <a href="${baseUrl}/unsubscribe" style="color: #9ca3af;">Unsubscribe</a>
  </p>
</body>
</html>
  `.trim();
}

function getOrderConfirmationHtml(data: OrderConfirmationEmailData): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://depositready.com";
  const downloadUrl = `${baseUrl}/download?token=${data.downloadToken}`;

  const productName = {
    basic: "Recovery Kit",
    full: "Full Recovery Package",
    landlord: "Landlord Response Kit",
    pm: "Deposit Disposition Packet",
  }[data.productType];

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Your ${productName} is Ready</title>
</head>
<body style="font-family: Georgia, serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="font-size: 24px; margin: 0;">DepositReady</h1>
  </div>

  <div style="background: #dcfce7; border-radius: 8px; padding: 20px; margin-bottom: 24px; text-align: center;">
    <p style="margin: 0; color: #166534; font-size: 18px; font-weight: bold;">
      ✓ Order Confirmed
    </p>
  </div>

  <h2 style="font-size: 20px; margin-bottom: 16px;">Your ${productName} is Ready</h2>

  ${data.tenantName ? `<p>Hi ${data.tenantName},</p>` : ""}

  <p>Thank you for your purchase. Your documents are ready to download.</p>

  <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin: 24px 0; text-align: center;">
    <a href="${downloadUrl}" style="display: inline-block; background: #000; color: #fff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: 500; font-size: 16px;">Download Your Documents</a>
    <p style="margin: 12px 0 0 0; font-size: 12px; color: #666;">This link doesn't expire — you can download anytime.</p>
  </div>

  <h3 style="font-size: 16px; margin: 24px 0 12px;">What's Included:</h3>
  <ul style="padding-left: 20px; color: #374151;">
    ${data.productType === "basic" ? `
    <li>State-specific demand letter</li>
    <li>Evidence checklist</li>
    <li>Deadline calculator</li>
    ` : `
    <li>Professional demand letter</li>
    <li>Complete evidence checklist</li>
    <li>Legal timeline analysis</li>
    <li>Small claims court guide</li>
    <li>Deductions dispute table</li>
    `}
  </ul>

  <h3 style="font-size: 16px; margin: 24px 0 12px;">Next Steps:</h3>
  <ol style="padding-left: 20px;">
    <li>Download and review your documents</li>
    <li>Fill in any remaining details</li>
    <li>Send via certified mail with return receipt requested</li>
    <li>Keep copies of everything</li>
  </ol>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 14px; color: #666;">
    <strong>Order ID:</strong> ${data.orderId}<br>
    <strong>Amount:</strong> $${(data.amountPaid / 100).toFixed(2)}
  </p>

  <p style="font-size: 14px; color: #666;">
    Questions? Reply to this email — we're here to help.
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">

  <p style="font-size: 12px; color: #9ca3af; text-align: center;">
    DepositReady provides tools and templates based on state law. This is not legal advice.
  </p>
</body>
</html>
  `.trim();
}

// Email sending functions
export async function sendWelcomeEmail(data: WelcomeEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log("Email not configured, skipping welcome email to:", data.email);
    return { success: false, error: "Email not configured" };
  }

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      replyTo: EMAIL_CONFIG.replyTo,
      to: data.email,
      subject: "Your Security Deposit Recovery Starts Now",
      html: getWelcomeEmailHtml(data),
    });

    if (error) {
      console.error("Failed to send welcome email:", error);
      return { success: false, error: error.message };
    }

    console.log("Welcome email sent to:", data.email);
    return { success: true };
  } catch (error) {
    console.error("Welcome email error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}

export async function sendOrderConfirmationEmail(data: OrderConfirmationEmailData): Promise<{ success: boolean; error?: string }> {
  if (!resend) {
    console.log("Email not configured, skipping order confirmation to:", data.email);
    return { success: false, error: "Email not configured" };
  }

  const productName = {
    basic: "Recovery Kit",
    full: "Full Recovery Package",
    landlord: "Landlord Response Kit",
    pm: "Deposit Disposition Packet",
  }[data.productType];

  try {
    const { error } = await resend.emails.send({
      from: EMAIL_CONFIG.from,
      replyTo: EMAIL_CONFIG.replyTo,
      to: data.email,
      subject: `Your ${productName} is Ready — Download Now`,
      html: getOrderConfirmationHtml(data),
    });

    if (error) {
      console.error("Failed to send order confirmation email:", error);
      return { success: false, error: error.message };
    }

    console.log("Order confirmation email sent to:", data.email);
    return { success: true };
  } catch (error) {
    console.error("Order confirmation email error:", error);
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" };
  }
}
