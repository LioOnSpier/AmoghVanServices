import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Firebase client-side keys are safe to include in source code.
// They are public keys — security is enforced via Firebase Security Rules.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDwzuXEbV30qgjlc5_N4ftkcgKII0ud3-A",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "amoghvanservices-b2a4b.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "amoghvanservices-b2a4b",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "423885886101",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:423885886101:web:ab5c06dc7856a219e2419c",
};

// Prevent duplicate app initialization during HMR
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
