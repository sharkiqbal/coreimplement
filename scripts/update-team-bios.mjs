// One-time script to update the live team member bios in Firestore.
// Run with: node scripts/update-team-bios.mjs <admin-email> <admin-password>
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
  console.error("Usage: node scripts/update-team-bios.mjs <admin-email> <admin-password>");
  process.exit(1);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
console.log("Signed in as:", auth.currentUser.email);

const teamMembers = [
  {
    id: 1759811304476,
    name: "Shar Iqbal",
    role: "Head of Client Strategy",
    location: "Houston, Texas",
    description:
      "Three years consulting on major enterprise implementations for Fortune 500 companies at a Big Four firm, plus firsthand experience building and running his own business. That combination shapes how he helps clients find automation that actually delivers.",
    linkedin: "https://www.linkedin.com/in/shar-iqbal/",
  },
  {
    id: 1761245692400,
    name: "Saif Iqbal",
    role: "Head of Operations",
    location: "Houston, Texas",
    description:
      "Five years leading digital transformation at one of the world's largest energy companies. He channels that experience into helping growing businesses adopt AI with the same enterprise-grade rigor.",
    linkedin: "https://www.linkedin.com/in/saif-mohammad-iqbal-303117175/",
  },
  {
    id: 1761245661440,
    name: "Faisal Khan",
    role: "Head of Engineering",
    location: "Pakistan",
    description:
      "Extensive hands-on experience in AI and automation, leading the engineering behind every solution we build.",
  },
  {
    id: 1762000000000,
    name: "Alber Sultan",
    role: "Head of Data Science",
    location: "Chicago, Illinois",
    description:
      "Many years of experience in data science and analytics at a Fortune 500 technology leader. He channels that expertise into building the data-driven backbone behind every automation we deliver.",
  },
];

const run = async () => {
  const ref = doc(db, "settings", "companyProfile");
  await setDoc(ref, { teamMembers, updatedAt: serverTimestamp() }, { merge: true });
  console.log("Team member bios updated.");
  process.exit(0);
};

run().catch((error) => {
  console.error("Failed to update team bios:", error);
  process.exit(1);
});
