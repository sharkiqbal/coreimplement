// One-time seed for the hidden /platform-preview demo (dummy clients, integrations,
// automations). Same pattern as this project's other maintenance scripts: sign in
// as the real admin via the client SDK (satisfies the Data Connect mutations'
// @auth(level: USER) check) rather than needing a service account key.
//
// Usage: node scripts/seed-demo-data.mjs <admin-email> <admin-password>

import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  createClient,
  createIntegration,
  createClientIntegration,
  createAutomation,
  createAutomationRun,
  createCommunication,
  createMetricsSnapshot,
} from "@dataconnect/generated";

const firebaseConfig = {
  apiKey: "AIzaSyCM1vB1cIMFDiHGE0fsYMlbynd-AQSx5Kg",
  authDomain: "core-implement.firebaseapp.com",
  projectId: "core-implement",
  storageBucket: "core-implement.firebasestorage.app",
  messagingSenderId: "412198618668",
  appId: "1:412198618668:web:6b150c9ddd5affd8eff389",
};

const [adminEmail, adminPassword] = process.argv.slice(2);
if (!adminEmail || !adminPassword) {
  console.error("Usage: node seed-demo-data.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const daysAgo = (n, hour = 10) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - n);
  d.setUTCHours(hour, 0, 0, 0);
  return d.toISOString();
};
const dateDaysAgo = (n) => daysAgo(n).slice(0, 10);

// --- Master integration catalog ---
const INTEGRATIONS = [
  { name: "QuickBooks", category: "Accounting" },
  { name: "HubSpot", category: "CRM" },
  { name: "Salesforce", category: "CRM" },
  { name: "Twilio", category: "Communication" },
  { name: "Google Sheets", category: "Productivity" },
  { name: "Slack", category: "Communication" },
  { name: "Stripe", category: "Payments" },
  { name: "Zendesk", category: "Support" },
];

// --- Dummy clients, each with connected integrations, automations, and comms ---
const CLIENTS = [
  {
    name: "Bayou City Tax & Accounting",
    industry: "Accounting",
    contactName: "Maria Gonzalez",
    contactEmail: "maria@bayoucitytax.example",
    integrations: [
      { name: "QuickBooks", status: "connected" },
      { name: "Google Sheets", status: "connected" },
      { name: "HubSpot", status: "pending" },
    ],
    automations: [
      {
        name: "Invoice → QuickBooks Sync",
        description:
          "Reads incoming invoice emails, extracts line items, and posts them directly to QuickBooks.",
        triggerType: "email",
        runs: [
          { status: "success", summary: "Processed 22 invoices, synced to QuickBooks", recordsProcessed: 22 },
          { status: "success", summary: "Processed 18 invoices, synced to QuickBooks", recordsProcessed: 18 },
          { status: "success", summary: "Processed 31 invoices, synced to QuickBooks", recordsProcessed: 31 },
          { status: "failed", summary: "QuickBooks API timeout - 4 invoices held for retry", recordsProcessed: 4 },
          { status: "success", summary: "Processed 26 invoices, synced to QuickBooks", recordsProcessed: 26 },
        ],
      },
      {
        name: "Client Document Intake",
        description: "Sorts and files incoming tax documents by client and document type.",
        triggerType: "email",
        runs: [
          { status: "success", summary: "Filed 14 documents across 9 client folders", recordsProcessed: 14 },
          { status: "success", summary: "Filed 8 documents across 5 client folders", recordsProcessed: 8 },
          { status: "success", summary: "Filed 19 documents across 12 client folders", recordsProcessed: 19 },
        ],
      },
    ],
    communications: [
      { channel: "email", direction: "inbound", handledBy: "ai", summary: "Client asking about W-2 upload deadline" },
      { channel: "email", direction: "outbound", handledBy: "ai", summary: "Auto-reply sent with upload portal link" },
      { channel: "voice", direction: "inbound", handledBy: "human", summary: "Complex amended-return question, routed to staff" },
    ],
    metrics: [
      { daysAgo: 21, hoursSaved: 9, tasksAutomated: 38, avgResponseSeconds: 95 },
      { daysAgo: 14, hoursSaved: 12, tasksAutomated: 51, avgResponseSeconds: 80 },
      { daysAgo: 7, hoursSaved: 15, tasksAutomated: 67, avgResponseSeconds: 62 },
    ],
  },
  {
    name: "Lonestar Insurance Group",
    industry: "Insurance",
    contactName: "David Chen",
    contactEmail: "dchen@lonestarinsurance.example",
    integrations: [
      { name: "Salesforce", status: "connected" },
      { name: "Twilio", status: "connected" },
      { name: "Zendesk", status: "pending" },
    ],
    automations: [
      {
        name: "Policy Renewal Reminders",
        description: "Automatically emails and texts clients ahead of policy renewal dates.",
        triggerType: "schedule",
        runs: [
          { status: "success", summary: "Sent 47 renewal reminders", recordsProcessed: 47 },
          { status: "success", summary: "Sent 52 renewal reminders", recordsProcessed: 52 },
          { status: "success", summary: "Sent 39 renewal reminders", recordsProcessed: 39 },
          { status: "success", summary: "Sent 61 renewal reminders", recordsProcessed: 61 },
        ],
      },
      {
        name: "AI Voice Agent Call Triage",
        description: "Answers inbound calls, qualifies the request, and routes or resolves it.",
        triggerType: "webhook",
        runs: [
          { status: "success", summary: "Handled 33 inbound calls, 4 escalated to human agent", recordsProcessed: 33 },
          { status: "success", summary: "Handled 28 inbound calls, 2 escalated to human agent", recordsProcessed: 28 },
          { status: "failed", summary: "Twilio webhook delay - 3 calls fell back to voicemail", recordsProcessed: 3 },
        ],
      },
    ],
    communications: [
      { channel: "voice", direction: "inbound", handledBy: "ai", summary: "Caller requesting proof of insurance" },
      { channel: "voice", direction: "inbound", handledBy: "ai", summary: "New quote request for auto policy" },
      { channel: "email", direction: "outbound", handledBy: "ai", summary: "Renewal reminder with updated premium" },
      { channel: "voice", direction: "inbound", handledBy: "human", summary: "Claim dispute, escalated to adjuster" },
    ],
    metrics: [
      { daysAgo: 21, hoursSaved: 11, tasksAutomated: 44, avgResponseSeconds: 40 },
      { daysAgo: 14, hoursSaved: 14, tasksAutomated: 58, avgResponseSeconds: 33 },
      { daysAgo: 7, hoursSaved: 17, tasksAutomated: 71, avgResponseSeconds: 28 },
    ],
  },
  {
    name: "Riverside Home Services",
    industry: "Professional Services",
    contactName: "Tom Whitfield",
    contactEmail: "tom@riversidehomeservices.example",
    integrations: [
      { name: "Twilio", status: "connected" },
      { name: "HubSpot", status: "connected" },
    ],
    automations: [
      {
        name: "24/7 AI Phone Agent",
        description: "Answers every call, books jobs, and syncs appointments to the calendar.",
        triggerType: "webhook",
        runs: [
          { status: "success", summary: "Answered 41 calls, booked 12 appointments", recordsProcessed: 41 },
          { status: "success", summary: "Answered 37 calls, booked 15 appointments", recordsProcessed: 37 },
          { status: "success", summary: "Answered 44 calls, booked 19 appointments", recordsProcessed: 44 },
          { status: "success", summary: "Answered 29 calls, booked 9 appointments", recordsProcessed: 29 },
        ],
      },
    ],
    communications: [
      { channel: "voice", direction: "inbound", handledBy: "ai", summary: "After-hours call, booked next-day appointment" },
      { channel: "voice", direction: "inbound", handledBy: "ai", summary: "Emergency leak, escalated to on-call technician" },
      { channel: "email", direction: "outbound", handledBy: "ai", summary: "Appointment confirmation sent" },
    ],
    metrics: [
      { daysAgo: 21, hoursSaved: 8, tasksAutomated: 29, avgResponseSeconds: 12 },
      { daysAgo: 14, hoursSaved: 10, tasksAutomated: 35, avgResponseSeconds: 10 },
      { daysAgo: 7, hoursSaved: 13, tasksAutomated: 44, avgResponseSeconds: 9 },
    ],
  },
  {
    name: "Urban Fit Studios",
    industry: "Hospitality",
    contactName: "Ashley Brooks",
    contactEmail: "ashley@urbanfitstudios.example",
    integrations: [
      { name: "Slack", status: "connected" },
      { name: "HubSpot", status: "connected" },
      { name: "Stripe", status: "connected" },
    ],
    automations: [
      {
        name: "Lead Follow-Up Sequence",
        description: "Reaches out to new trial sign-ups within minutes instead of days.",
        triggerType: "webhook",
        runs: [
          { status: "success", summary: "Followed up with 18 new trial leads", recordsProcessed: 18 },
          { status: "success", summary: "Followed up with 24 new trial leads", recordsProcessed: 24 },
          { status: "success", summary: "Followed up with 21 new trial leads", recordsProcessed: 21 },
        ],
      },
      {
        name: "Social Content Scheduler",
        description: "Generates and schedules social posts across all 3 studio locations.",
        triggerType: "schedule",
        runs: [
          { status: "success", summary: "Published 9 posts across 3 locations", recordsProcessed: 9 },
          { status: "success", summary: "Published 12 posts across 3 locations", recordsProcessed: 12 },
        ],
      },
    ],
    communications: [
      { channel: "email", direction: "outbound", handledBy: "ai", summary: "Trial follow-up sent 8 minutes after sign-up" },
      { channel: "email", direction: "inbound", handledBy: "ai", summary: "Membership pricing question" },
    ],
    metrics: [
      { daysAgo: 21, hoursSaved: 6, tasksAutomated: 22, avgResponseSeconds: 140 },
      { daysAgo: 14, hoursSaved: 8, tasksAutomated: 31, avgResponseSeconds: 95 },
      { daysAgo: 7, hoursSaved: 10, tasksAutomated: 40, avgResponseSeconds: 70 },
    ],
  },
  {
    name: "Northgate Auto Parts",
    industry: "Retail",
    contactName: "Ken Sato",
    contactEmail: "ken@northgateautoparts.example",
    integrations: [
      { name: "QuickBooks", status: "connected" },
      { name: "Google Sheets", status: "connected" },
      { name: "Stripe", status: "pending" },
    ],
    automations: [
      {
        name: "Inventory Sync Dashboard",
        description: "Syncs stock levels across the storefront, Amazon, and the physical shop in real time.",
        triggerType: "schedule",
        runs: [
          { status: "success", summary: "Synced 340 SKUs across 3 channels", recordsProcessed: 340 },
          { status: "success", summary: "Synced 358 SKUs across 3 channels", recordsProcessed: 358 },
          { status: "failed", summary: "Amazon rate limit hit - 22 SKUs retried next cycle", recordsProcessed: 22 },
          { status: "success", summary: "Synced 351 SKUs across 3 channels", recordsProcessed: 351 },
        ],
      },
    ],
    communications: [
      { channel: "email", direction: "inbound", handledBy: "ai", summary: "Bulk order inquiry from a repair shop" },
      { channel: "voice", direction: "inbound", handledBy: "ai", summary: "Part availability check" },
    ],
    metrics: [
      { daysAgo: 21, hoursSaved: 7, tasksAutomated: 26, avgResponseSeconds: 55 },
      { daysAgo: 14, hoursSaved: 9, tasksAutomated: 33, avgResponseSeconds: 48 },
      { daysAgo: 7, hoursSaved: 11, tasksAutomated: 41, avgResponseSeconds: 40 },
    ],
  },
  {
    name: "Pixel Forge Games",
    industry: "E-Commerce",
    contactName: "Priya Nair",
    contactEmail: "priya@pixelforgegames.example",
    integrations: [
      { name: "Stripe", status: "connected" },
      { name: "Zendesk", status: "connected" },
      { name: "Slack", status: "pending" },
    ],
    automations: [
      {
        name: "Game Key Activation",
        description: "Verifies purchase, retrieves the activation code, and delivers it within a minute.",
        triggerType: "webhook",
        runs: [
          { status: "success", summary: "Delivered 210 activation keys", recordsProcessed: 210 },
          { status: "success", summary: "Delivered 198 activation keys", recordsProcessed: 198 },
          { status: "success", summary: "Delivered 245 activation keys", recordsProcessed: 245 },
          { status: "success", summary: "Delivered 231 activation keys", recordsProcessed: 231 },
        ],
      },
      {
        name: "Support Ticket Triage",
        description: "Categorizes and routes incoming support tickets by urgency and topic.",
        triggerType: "email",
        runs: [
          { status: "success", summary: "Triaged 64 tickets, auto-resolved 40", recordsProcessed: 64 },
          { status: "success", summary: "Triaged 58 tickets, auto-resolved 33", recordsProcessed: 58 },
        ],
      },
    ],
    communications: [
      { channel: "email", direction: "inbound", handledBy: "ai", summary: "Activation code not received" },
      { channel: "email", direction: "outbound", handledBy: "ai", summary: "Resent activation code automatically" },
      { channel: "email", direction: "inbound", handledBy: "human", summary: "Refund dispute, escalated to support lead" },
    ],
    metrics: [
      { daysAgo: 21, hoursSaved: 10, tasksAutomated: 48, avgResponseSeconds: 20 },
      { daysAgo: 14, hoursSaved: 13, tasksAutomated: 63, avgResponseSeconds: 15 },
      { daysAgo: 7, hoursSaved: 16, tasksAutomated: 79, avgResponseSeconds: 11 },
    ],
  },
];

async function run() {
  // 1. Integrations catalog
  const integrationIds = {};
  for (const integ of INTEGRATIONS) {
    const res = await createIntegration({ name: integ.name, category: integ.category });
    integrationIds[integ.name] = res.data.integration_insert.id;
    console.log("Integration:", integ.name);
  }

  // 2. Clients + their integrations, automations, runs, communications, metrics
  for (const client of CLIENTS) {
    const clientRes = await createClient({
      name: client.name,
      industry: client.industry,
      contactName: client.contactName,
      contactEmail: client.contactEmail,
      status: "active",
    });
    const clientId = clientRes.data.client_insert.id;
    console.log("\nClient:", client.name);

    for (const ci of client.integrations) {
      await createClientIntegration({
        clientId,
        integrationId: integrationIds[ci.name],
        status: ci.status,
        connectedAt: ci.status === "connected" ? daysAgo(20) : null,
      });
      console.log("  Integration connected:", ci.name, `(${ci.status})`);
    }

    for (const auto of client.automations) {
      const autoRes = await createAutomation({
        clientId,
        name: auto.name,
        description: auto.description,
        triggerType: auto.triggerType,
        status: "active",
      });
      const automationId = autoRes.data.automation_insert.id;
      console.log("  Automation:", auto.name);

      let offset = auto.runs.length * 3;
      for (const run of auto.runs) {
        await createAutomationRun({
          automationId,
          runAt: daysAgo(offset),
          status: run.status,
          summary: run.summary,
          recordsProcessed: run.recordsProcessed,
        });
        offset -= 3;
      }
      console.log(`    ${auto.runs.length} run(s) logged`);
    }

    let commOffset = client.communications.length * 2;
    for (const comm of client.communications) {
      await createCommunication({
        clientId,
        channel: comm.channel,
        direction: comm.direction,
        summary: comm.summary,
        occurredAt: daysAgo(commOffset),
        handledBy: comm.handledBy,
      });
      commOffset -= 2;
    }
    console.log(`  ${client.communications.length} communication(s) logged`);

    for (const snap of client.metrics) {
      await createMetricsSnapshot({
        clientId,
        snapshotDate: dateDaysAgo(snap.daysAgo),
        hoursSaved: snap.hoursSaved,
        tasksAutomated: snap.tasksAutomated,
        avgResponseSeconds: snap.avgResponseSeconds,
      });
    }
    console.log(`  ${client.metrics.length} metrics snapshot(s) logged`);
  }

  console.log("\nSeed complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
