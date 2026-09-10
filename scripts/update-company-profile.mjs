// One-time script to update the live company profile copy in Firestore.
// Run with: node scripts/update-company-profile.mjs <admin-email> <admin-password>
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";

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
  console.error("Usage: node scripts/update-company-profile.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const updates = {
  description:
    "We help growing businesses automate the manual, repetitive work slowing them down using AI, so teams spend less time on data entry, quotes, and reports, and more time on what matters.",
  updatedAt: serverTimestamp(),
};

const run = async () => {
  const ref = doc(db, "settings", "companyProfile");
  await setDoc(ref, updates, { merge: true });
  console.log("companyProfile description updated.");
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to update companyProfile:", error);
  process.exit(1);
});
