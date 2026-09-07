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

await updateDoc(doc(db, "reviews", "8fauUxSIAaCVjbnHlQt3"), {
  description:
    "We were struggling with inventory mismatches and delayed reports. After implementation, our accuracy improved by 90%. The transition was smooth and support was excellent.",
  updatedAt: serverTimestamp(),
});

console.log("Fixed Ayesha Khan review quotes");
process.exit(0);
