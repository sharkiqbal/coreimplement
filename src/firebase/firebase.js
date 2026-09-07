import { initializeApp } from "firebase/app";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
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

// Initialize Auth (admin sign-in)
export const auth = getAuth(app);

export default app;
