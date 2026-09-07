import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  deleteDoc,
  addDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

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

// Inserted oldest -> newest so the last one (Business Process Automation)
// shows first, since the site queries orderBy("createdAt", "desc").
const NEW_SERVICES = [
  {
    name: "AI-Powered Marketing & Growth",
    logoId: "rocket",
    problem:
      "Modern businesses don't need more tools — they need more clients, higher conversion rates, and scalable growth. Generic marketing tactics waste budget without a system behind them.",
    solution:
      "We use AI to automate social media, optimize ad targeting, generate high-converting content, and capture leads — creating always-on marketing workflows that turn attention into revenue.",
    points: [
      "Increase client acquisition without increasing headcount",
      "Reduce marketing costs through automation and optimization",
      "Make data-driven decisions instead of relying on guesswork",
      "Scale campaigns faster while maintaining performance",
      "Convert attention into measurable revenue growth",
    ],
  },
  {
    name: "Custom AI Software & Integrations",
    logoId: "sparkles",
    problem:
      "Off-the-shelf tools rarely fit the way your business actually works. Many small businesses get stuck with outdated systems, manual workarounds, and disconnected software that wastes time and money.",
    solution:
      "We build custom AI-powered tools designed around your exact operations — dashboards, portals, and internal systems that automate, track, and scale as your business grows.",
    points: [
      "Fully custom AI-driven applications and internal tools",
      "Dashboards, portals, and lightweight CRMs built for your workflow",
      "Automated reporting and analytics",
      "Integration with your existing apps and databases",
      "Systems that scale with you, not against you",
    ],
  },
  {
    name: "AI-Powered Customer Communication",
    logoId: "zap",
    problem:
      "Businesses lose leads and burn hours every week on manual phone calls and emails — missed calls, delayed replies, and inconsistent responses that frustrate customers and overwhelm staff.",
    solution:
      "We deploy AI voice agents and AI-managed email systems that answer calls, respond to messages, qualify leads, and book appointments around the clock — with the same consistency every time.",
    points: [
      "24/7 AI phone agents for inbound and outbound calls",
      "AI that reads, drafts, and routes email like your best team member",
      "Lead qualification, appointment booking, and CRM updates",
      "Auto-generated replies you review, edit, or send automatically",
      "Natural, human-like voice and writing tailored to your business",
    ],
  },
  {
    name: "Business Process Automation",
    logoId: "target",
    problem:
      "Teams lose hours to manual data entry, repetitive workflows, spreadsheets, approvals, and reporting. These bottlenecks slow growth, increase errors, and keep employees away from higher-value work.",
    solution:
      "We automate end-to-end workflows using AI, integrations, and custom logic — connecting your existing tools and eliminating repetitive tasks so your team can focus on higher-value work.",
    points: [
      "Automation of repetitive tasks across day-to-day operations",
      "Integrations with the tools you already use (CRM, ERP, QuickBooks, and more)",
      "AI-driven workflows for approvals, documentation, and reporting",
      "Automated data syncing between apps and systems",
      "Intelligent reminders, triggers, and follow-ups",
    ],
  },
];

async function run() {
  const existing = await getDocs(collection(db, COLLECTION_NAME));
  for (const d of existing.docs) {
    await deleteDoc(doc(db, COLLECTION_NAME, d.id));
    console.log("Deleted old service:", d.id);
  }

  for (const service of NEW_SERVICES) {
    const ref = await addDoc(collection(db, COLLECTION_NAME), {
      ...service,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    console.log("Added service:", service.name, ref.id);
  }

  console.log("Done.");
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
