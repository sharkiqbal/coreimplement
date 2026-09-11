// Run with: node scripts/update-services-copy-reduce-repetition.mjs <admin-email> <admin-password>
//
// The four core service pillars each named "Claude and ChatGPT" explicitly
// in their solution copy, which read as repetitive back to back on the
// homepage. This drops the explicit model names from the pillar copy and
// leaves the "Powered By Leading AI" block (which already names Claude and
// ChatGPT once) as the single place that calls them out by name.
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
  console.error("Usage: node scripts/update-services-copy-reduce-repetition.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const COLLECTION_NAME = "services";

// Doc IDs from the live "services" collection (see update-services-content.mjs)
const UPDATES = [
  {
    id: "9KSSZexFgg9SRkdGmNsN", // Business Process Automation
    solution:
      "We connect the tools you already use (like QuickBooks, HubSpot, and Salesforce) and layer in AI to read documents, extract data, and route it automatically, turning multi-step manual processes into one smooth, hands-off workflow.",
  },
  {
    id: "hYe0jF0icibzcCOYboRP", // AI-Powered Customer Communication
    solution:
      "We deploy AI voice agents and AI-managed email to answer calls, respond to messages, qualify leads, and book appointments directly on your calendar, with the same consistency every time.",
  },
  {
    id: "ddouYCaYFsJOeHNZCDLx", // Custom AI Software & Integrations
    solution:
      "We build custom AI-powered tools (dashboards, portals, and internal systems), wired directly into the software you already run, like QuickBooks, Salesforce, Slack, and Google Sheets.",
  },
  {
    id: "odLZpe2koewOuFt9idfr", // AI-Powered Marketing & Growth
    solution:
      "We use AI to generate high-converting content and ad copy, automate social posting, and optimize targeting across platforms like Meta and Google, creating always-on marketing workflows that turn attention into revenue.",
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
