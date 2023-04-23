import { initializeApp } from 'firebase/app';
import { GoogleAuthProvider, FacebookAuthProvider, getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyC5dhhRsKd3aGzD2foo1IV7PR6CYtGbp7U',
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const googleAuthProvider = new GoogleAuthProvider();
const facebookAuthProvider = new FacebookAuthProvider();

export { 
  auth,
  googleAuthProvider,
  facebookAuthProvider 
};
