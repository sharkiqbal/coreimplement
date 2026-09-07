import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7metrkgJw9WJo9RWUF_XsY5nnaZn5qvk",
  authDomain: "website-44684.firebaseapp.com",
  projectId: "website-44684",
  storageBucket: "website-44684.firebasestorage.app",
  messagingSenderId: "819313129901",
  appId: "1:819313129901:web:f37497a346e0b1385f4924",
  measurementId: "G-HG4P7XWR0L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with long-polling auto-detection - the default WebChannel
// streaming connection can hang (ERR_TIMED_OUT on Listen/channel) behind certain
// proxies, ad blockers, or headless/CI browsers like Lighthouse.
export const db = initializeFirestore(app, {
  experimentalAutoDetectLongPolling: true,
});

// Initialize Storage
export const storage = getStorage(app);

export default app;
