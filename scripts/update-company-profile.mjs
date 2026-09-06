// One-time script to update the live company profile copy in Firestore.
// Run with: node scripts/update-company-profile.mjs
import { initializeApp } from "firebase/app";
import { doc, getFirestore, setDoc, serverTimestamp } from "firebase/firestore";

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
