import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqBz8hNatL1MbmbuwisRiPLam2f5eeCXc",
  authDomain: "my-splash-33b47.firebaseapp.com",
  projectId: "my-splash-33b47",
  storageBucket: "my-splash-33b47.appspot.com",
  messagingSenderId: "311496275594",
  appId: "1:311496275594:web:e0f490a14d8f6c6a6e5f73",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
