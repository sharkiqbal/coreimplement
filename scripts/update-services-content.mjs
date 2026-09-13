// Run with: node scripts/update-services-content.mjs <admin-email> <admin-password>
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, updateDoc, serverTimestamp } from "firebase/firestore";

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
  console.error("Usage: node scripts/update-services-content.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const COLLECTION_NAME = "services";

// Doc IDs from the current live "services" collection (created by update-core-services.mjs)
const UPDATES = [
  {
    id: "9KSSZexFgg9SRkdGmNsN", // Business Process Automation
    problem:
      "Teams lose hours to manual data entry, repetitive workflows, spreadsheets, approvals, and reporting. These bottlenecks slow growth, increase errors, and keep employees away from higher-value work.",
    solution:
      "We connect the tools you already use (like QuickBooks, HubSpot, and Salesforce) and layer in AI to read documents, extract data, and route it automatically, turning multi-step manual processes into one smooth, hands-off workflow.",
    points: [
      "Invoices, forms, and reports processed automatically, no manual re-entry",
      "Approvals, reminders, and follow-ups that fire on their own",
      "Data stays in sync across every connected system in real time",
      "New integrations added as your stack grows, not locked to what you start with",
    ],
  },
  {
    id: "hYe0jF0icibzcCOYboRP", // AI-Powered Customer Communication
    problem:
      "Businesses lose leads and burn hours every week on manual phone calls and emails: missed calls, delayed replies, and inconsistent responses that frustrate customers and overwhelm staff.",
    solution:
      "We deploy AI voice agents and AI-managed email to answer calls, respond to messages, qualify leads, and book appointments directly on your calendar, with the same consistency every time.",
    points: [
      "24/7 phone coverage for inbound and outbound calls, no missed leads",
      "Email triaged, drafted, and routed automatically, or queued for your review first",
      "Leads qualified and booked straight onto your calendar and into your CRM",
      "Sounds like your team, not a script, tuned to your business's voice",
    ],
  },
  {
    id: "ddouYCaYFsJOeHNZCDLx", // Custom AI Software & Integrations
    problem:
      "Off-the-shelf tools rarely fit the way your business actually works. Many small businesses get stuck with outdated systems, manual workarounds, and disconnected software that wastes time and money.",
    solution:
      "We build custom AI-powered tools (dashboards, portals, and internal systems) wired directly into the software you already run, like QuickBooks, Salesforce, Slack, and Google Sheets.",
    points: [
      "Custom dashboards and portals built around how your team actually works, not a generic template",
      "Automated reporting and analytics instead of manual spreadsheet pulls",
      "Wired directly into the software you already run, from QuickBooks to Slack",
      "Built to grow with you, adding new tools and workflows as you scale",
    ],
  },
  {
    id: "odLZpe2koewOuFt9idfr", // AI-Powered Marketing & Growth
    problem:
      "Modern businesses don't need more tools. They need more clients, higher conversion rates, and scalable growth. Generic marketing tactics waste budget without a system behind them.",
    solution:
      "We use AI to generate high-converting content and ad copy, automate social posting, and optimize targeting across platforms like Meta and Google, creating always-on marketing workflows that turn attention into revenue.",
    points: [
      "Content and ad copy generated and published on a consistent schedule",
      "Ad targeting adjusted automatically based on what's actually converting",
      "One system running content, social, and ads instead of three separate tools",
      "More leads and campaigns without adding headcount to manage them",
    ],
  },
];

async function run() {
  for (const update of UPDATES) {
    const { id, ...fields } = update;
    await updateDoc(doc(db, COLLECTION_NAME, id), {
      ...fields,
      updatedAt: serverTimestamp(),
    });
    console.log("Updated:", id);
  }
  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
