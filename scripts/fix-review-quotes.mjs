// Run with: node scripts/fix-review-quotes.mjs <admin-email> <admin-password>
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
  console.error("Usage: node scripts/fix-review-quotes.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

await updateDoc(doc(db, "reviews", "8fauUxSIAaCVjbnHlQt3"), {
  description:
    "We were struggling with inventory mismatches and delayed reports. After implementation, our accuracy improved by 90%. The transition was smooth and support was excellent.",
  updatedAt: serverTimestamp(),
});

console.log("Fixed Ayesha Khan review quotes");
process.exit(0);
