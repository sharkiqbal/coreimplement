// One-time migration: reads every collection from the OLD Firebase project (client SDK,
// public reads) and writes it into the NEW project (Admin SDK, via service account key -
// bypasses security rules entirely so the new project's rules never need to be loosened).
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  getDoc,
  Timestamp,
} from "firebase/firestore";
import { initializeApp as initializeAdminApp, cert } from "firebase-admin/app";
import { getFirestore as getAdminFirestore } from "firebase-admin/firestore";
import { readFileSync } from "fs";

const OLD_CONFIG = {
  apiKey: "AIzaSyC7metrkgJw9WJo9RWUF_XsY5nnaZn5qvk",
  authDomain: "website-44684.firebaseapp.com",
  projectId: "website-44684",
  storageBucket: "website-44684.firebasestorage.app",
  messagingSenderId: "819313129901",
  appId: "1:819313129901:web:f37497a346e0b1385f4924",
};

const SERVICE_ACCOUNT_PATH = process.argv[2];
if (!SERVICE_ACCOUNT_PATH) {
  console.error("Usage: node migrate-to-new-project.mjs <path-to-service-account.json>");
  process.exit(1);
}

const oldApp = initializeApp(OLD_CONFIG, "old");
const oldDb = getFirestore(oldApp);

const serviceAccount = JSON.parse(readFileSync(SERVICE_ACCOUNT_PATH, "utf8"));
const adminApp = initializeAdminApp({
  credential: cert(serviceAccount),
});
const newDb = getAdminFirestore(adminApp);

// Recursively convert client-SDK Timestamp instances to JS Dates, which the
// Admin SDK correctly re-converts to its own Timestamp type on write.
function sanitize(value) {
  if (value instanceof Timestamp) {
    return value.toDate();
  }
  if (Array.isArray(value)) {
    return value.map(sanitize);
  }
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) {
      out[k] = sanitize(v);
    }
    return out;
  }
  return value;
}

const COLLECTIONS = [
  "services",
  "blogPosts",
  "caseStudies",
  "reviews",
  "contactSubmissions",
  "rfpSubmissions",
];

async function migrateCollection(name) {
  const snap = await getDocs(collection(oldDb, name));
  let count = 0;
  const batch = newDb.batch();
  snap.forEach((d) => {
    const ref = newDb.collection(name).doc(d.id);
    batch.set(ref, sanitize(d.data()));
    count++;
  });
  if (count > 0) {
    await batch.commit();
  }
  console.log(`${name}: migrated ${count} document(s)`);
}

async function migrateCompanyProfile() {
  const snap = await getDoc(doc(oldDb, "settings", "companyProfile"));
  if (!snap.exists()) {
    console.log("settings/companyProfile: not found in old project, skipping");
    return;
  }
  await newDb.collection("settings").doc("companyProfile").set(sanitize(snap.data()));
  console.log("settings/companyProfile: migrated");
}

async function run() {
  for (const name of COLLECTIONS) {
    await migrateCollection(name);
  }
  await migrateCompanyProfile();
  console.log("Migration complete.");
  process.exit(0);
}

run().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
