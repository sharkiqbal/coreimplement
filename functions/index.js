// Cloud Functions for Core Implementations.
//
// Sends an admin notification email whenever a new contact or RFP
// submission lands in Firestore. Uses Resend (https://resend.com) since it
// doesn't require SMTP setup and has a generous free tier.
//
// One-time setup before this can send anything:
//   1. Create a Resend account and get an API key.
//   2. firebase functions:secrets:set RESEND_API_KEY
//   3. (optional but recommended) Verify a sending domain in Resend and
//      update FROM_EMAIL below to use it - until then this sends from
//      Resend's shared onboarding@resend.dev address, which works but is
//      less deliverable and can only send to the Resend account's own
//      verified email while the domain is unverified.
//   4. firebase deploy --only functions

const { setGlobalOptions } = require("firebase-functions/v2");
const { onDocumentCreated } = require("firebase-functions/v2/firestore");
const { defineSecret } = require("firebase-functions/params");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");

admin.initializeApp();
setGlobalOptions({ maxInstances: 5 });

const RESEND_API_KEY = defineSecret("RESEND_API_KEY");

// TODO: switch to hello@coreimplement.com once that inbox is set up.
const ADMIN_EMAIL = "sharkiqbal@outlook.com";
const FROM_EMAIL = "Core Implementations <onboarding@resend.dev>";

const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const row = (label, value) =>
  value
    ? `<tr>
        <td style="padding:6px 12px 6px 0;color:#6b7280;font-size:13px;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td>
        <td style="padding:6px 0;color:#111827;font-size:14px;">${escapeHtml(value)}</td>
      </tr>`
    : "";

async function sendEmail({ apiKey, subject, html }) {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [ADMIN_EMAIL],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Resend API error (${response.status}): ${text}`);
  }
}

exports.onContactSubmissionCreated = onDocumentCreated(
  { document: "contactSubmissions/{id}", secrets: [RESEND_API_KEY] },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#1d4ed8;margin-bottom:4px;">New Contact Message</h2>
        <p style="color:#6b7280;font-size:13px;margin-top:0;">via coreimplement.com</p>
        <table style="border-collapse:collapse;width:100%;">
          ${row("Name", data.name)}
          ${row("Company", data.company)}
          ${row("Email", data.email)}
          ${row("Phone", data.phone)}
          ${row("Topic", data.projectType)}
        </table>
        <p style="color:#6b7280;font-size:13px;margin-top:16px;margin-bottom:6px;">Message</p>
        <div style="background:#f9fafb;padding:12px;border-radius:8px;white-space:pre-wrap;color:#111827;font-size:14px;">${escapeHtml(data.message)}</div>
      </div>
    `;

    try {
      await sendEmail({
        apiKey: RESEND_API_KEY.value(),
        subject: `New contact message from ${data.name || "a visitor"}`,
        html,
      });
    } catch (error) {
      logger.error("Failed to send contact notification email:", error);
    }
  }
);

exports.onRFPSubmissionCreated = onDocumentCreated(
  { document: "rfpSubmissions/{id}", secrets: [RESEND_API_KEY] },
  async (event) => {
    const data = event.data?.data();
    if (!data) return;

    const painPoints = Array.isArray(data.painPoints)
      ? data.painPoints
      : [data.topPain1, data.topPain2].filter(Boolean);

    let attachmentSection = "";
    if (data.attachmentPath) {
      try {
        const bucket = admin.storage().bucket();
        const [url] = await bucket.file(data.attachmentPath).getSignedUrl({
          action: "read",
          expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days
        });
        attachmentSection = `<p style="margin-top:16px;"><a href="${url}" style="color:#1d4ed8;">Download attachment: ${escapeHtml(data.attachmentName || "file")}</a></p>`;
      } catch (error) {
        logger.error("Failed to sign attachment URL:", error);
      }
    }

    const html = `
      <div style="font-family:sans-serif;max-width:560px;margin:0 auto;">
        <h2 style="color:#7c3aed;margin-bottom:4px;">New RFP Submission</h2>
        <p style="color:#6b7280;font-size:13px;margin-top:0;">via coreimplement.com</p>
        <table style="border-collapse:collapse;width:100%;">
          ${row("Name", data.name)}
          ${row("Email", data.email)}
          ${row("Company", data.company)}
          ${row("Company Size", data.companySize)}
          ${row("Systems in Use", data.systemsInUse)}
          ${row("Timeline", data.timeline)}
          ${row("Budget", data.budgetBand)}
        </table>
        ${
          painPoints.length
            ? `<p style="color:#6b7280;font-size:13px;margin-top:16px;margin-bottom:6px;">Pain Points</p>
               <ul style="color:#111827;font-size:14px;padding-left:18px;margin:0;">
                 ${painPoints.map((p) => `<li style="margin-bottom:4px;">${escapeHtml(p)}</li>`).join("")}
               </ul>`
            : ""
        }
        ${
          data.additionalDetails
            ? `<p style="color:#6b7280;font-size:13px;margin-top:16px;margin-bottom:6px;">Additional Details</p>
               <div style="background:#f9fafb;padding:12px;border-radius:8px;white-space:pre-wrap;color:#111827;font-size:14px;">${escapeHtml(data.additionalDetails)}</div>`
            : ""
        }
        ${attachmentSection}
      </div>
    `;

    try {
      await sendEmail({
        apiKey: RESEND_API_KEY.value(),
        subject: `New RFP from ${data.name || "a visitor"}${data.company ? ` (${data.company})` : ""}`,
        html,
      });
    } catch (error) {
      logger.error("Failed to send RFP notification email:", error);
    }
  }
);
