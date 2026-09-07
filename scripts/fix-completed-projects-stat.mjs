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

await updateDoc(doc(db, "settings", "companyProfile"), {
  completeProjects: "5+",
  updatedAt: serverTimestamp(),
});

console.log("Updated completeProjects to 5+");
process.exit(0);
