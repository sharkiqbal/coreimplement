import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, serverTimestamp } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7metrkgJw9WJo9RWUF_XsY5nnaZn5qvk",
  authDomain: "website-44684.firebaseapp.com",
  projectId: "website-44684",
  storageBucket: "website-44684.firebasestorage.app",
  messagingSenderId: "819313129901",
  appId: "1:819313129901:web:f37497a346e0b1385f4924",
  measurementId: "G-HG4P7XWR0L",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const COLLECTION_NAME = "services";

// Doc IDs from the current live "services" collection (created by update-core-services.mjs)
const UPDATES = [
  {
    id: "PuY5cy35gt2RJzHo57Go", // Business Process Automation
    problem:
      "Teams lose hours to manual data entry, repetitive workflows, spreadsheets, approvals, and reporting. These bottlenecks slow growth, increase errors, and keep employees away from higher-value work.",
    solution:
      "We connect the tools you already use — like QuickBooks, HubSpot, and Salesforce — and layer in AI models like Claude and ChatGPT to read documents, extract data, and route it automatically, turning multi-step manual processes into one smooth, hands-off workflow.",
    points: [
      "Automation of repetitive tasks across day-to-day operations",
      "Integrations with the tools you already use (QuickBooks, HubSpot, Salesforce, and more)",
      "AI-powered document reading and data extraction for invoices, forms, and reports",
      "Automated data syncing between apps and systems",
      "Intelligent reminders, triggers, and follow-ups",
    ],
  },
  {
    id: "xQjjSk2iNwOvC982pOe7", // AI-Powered Customer Communication
    problem:
      "Businesses lose leads and burn hours every week on manual phone calls and emails — missed calls, delayed replies, and inconsistent responses that frustrate customers and overwhelm staff.",
    solution:
      "We deploy AI voice agents and AI-managed email — built on the same technology behind Claude and ChatGPT — to answer calls, respond to messages, qualify leads, and book appointments directly on your calendar, with the same consistency every time.",
    points: [
      "24/7 AI phone agents for inbound and outbound calls",
      "AI that reads, drafts, and routes email like your best team member",
      "Lead qualification, appointment booking, and calendar/CRM updates",
      "Auto-generated replies you review, edit, or send automatically",
      "Natural, human-like voice and writing tailored to your business",
    ],
  },
  {
    id: "46K5zHISQT8N9JTzEYWZ", // Custom AI Software & Integrations
    problem:
      "Off-the-shelf tools rarely fit the way your business actually works. Many small businesses get stuck with outdated systems, manual workarounds, and disconnected software that wastes time and money.",
    solution:
      "We build custom AI-powered tools — dashboards, portals, and internal systems — using the same underlying models that power Claude and ChatGPT, wired directly into the software you already run, like QuickBooks, Salesforce, Slack, and Google Sheets.",
    points: [
      "Fully custom AI-driven applications and internal tools",
      "Dashboards, portals, and lightweight CRMs built for your workflow",
      "Automated reporting and analytics",
      "Integration with the tools you already use (QuickBooks, Salesforce, Slack, Google Sheets, and more)",
      "Systems that scale with you, not against you",
    ],
  },
  {
    id: "snGHjRAMmjzDm4sCST2V", // AI-Powered Marketing & Growth
    problem:
      "Modern businesses don't need more tools — they need more clients, higher conversion rates, and scalable growth. Generic marketing tactics waste budget without a system behind them.",
    solution:
      "We use AI tools like Claude and ChatGPT to generate high-converting content and ad copy, automate social posting, and optimize targeting across platforms like Meta and Google — creating always-on marketing workflows that turn attention into revenue.",
    points: [
      "Increase client acquisition without increasing headcount",
      "Reduce marketing costs through automation and optimization",
      "Make data-driven decisions instead of relying on guesswork",
      "Scale campaigns faster while maintaining performance",
      "Convert attention into measurable revenue growth",
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
