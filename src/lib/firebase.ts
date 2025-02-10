import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "dreams-cloud.firebaseapp.com",
  projectId: "dreams-cloud",
  storageBucket: "dreams-cloud.appspot.com",
  messagingSenderId: "XXXXXXXXXXXX",
  appId: "1:XXXXXXXXXXXX:web:XXXXXXXXXXXXXXXXXXXXXXXX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();

// Authentication providers
export const googleProvider = new GoogleAuthProvider();

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});