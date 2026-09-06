// One-time script to update the live team member bios in Firestore.
// Run with: node scripts/update-team-bios.mjs
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

const teamMembers = [
  {
    id: 1759811304476,
    name: "Shar Iqbal",
    role: "Co-Founder",
    location: "Houston, Texas",
    description:
      "Three years consulting on major enterprise implementations for Fortune 500 companies at a Big Four firm, plus firsthand experience building and running his own business — a combination he channels into helping clients find automation that actually delivers.",
    linkedin: "https://www.linkedin.com/in/shar-iqbal/",
  },
  {
    id: 1761245692400,
    name: "Saif Iqbal",
    role: "Co-Founder",
    location: "Houston, Texas",
    description:
      "Five years leading digital transformation at one of the world's largest energy companies — experience he channels into helping growing businesses adopt AI with that same enterprise-grade rigor.",
    linkedin: "https://www.linkedin.com/in/saif-mohammad-iqbal-303117175/",
  },
  {
    id: 1761245661440,
    name: "Faisal Khan",
    role: "Technical Co-Founder",
    location: "Pakistan",
    description:
      "Extensive hands-on experience in AI and automation, leading the engineering behind every solution we build.",
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
