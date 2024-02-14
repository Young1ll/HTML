import { initializeApp } from "firebase/app";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFunctions, connectFunctionsEmulator } from "firebase/functions";
import { connectStorageEmulator, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDDBenJU9jJ3dlY7oygms_-G9dLMSNVsGM",
  authDomain: "minimum-kanban.firebaseapp.com",
  projectId: "minimum-kanban",
  storageBucket: "minimum-kanban.appspot.com",
  messagingSenderId: "195757832376",
  appId: "1:195757832376:web:61e567ad95292c37911c4d",
};

// Initialize Firebase(https://firebase.google.com/docs/web/modular-upgrade?hl=ko)
// https://firebase.google.com/docs/web/setup?hl=ko#available-libraries
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const fbFunctions = getFunctions(app);

// eslint-disable-next-line no-undef
if (process.env.NODE_ENV === "development") {
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFirestoreEmulator(db, "localhost", 8080);
  connectFunctionsEmulator(fbFunctions, "localhost", 5001);
  connectStorageEmulator(storage, "localhost", 9199);
}
