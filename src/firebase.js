// Import only what you need from Firebase v9+
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZTNdQxJWanTek17y9qTuciwerPOB2s4Q",
  authDomain: "e-commerce-1c618.firebaseapp.com",
  projectId: "e-commerce-1c618",
  storageBucket: "e-commerce-1c618.appspot.com",
  messagingSenderId: "1027695418350",
  appId: "1:1027695418350:web:de8eaa8602311b9e3d0cff",
  measurementId: "G-PMW0Q8MHDH"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Export Firestore and Auth
const db = getFirestore(firebaseApp);
const auth = getAuth(firebaseApp);

export { db, auth };
