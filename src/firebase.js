import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// import { getFirestore, doc, setDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
// eslint-disable-next-line import/no-unresolved
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import {
  getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification,
} from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCdM3Ba63lj2cLq2Af34tLZjEYpKUrWQ7k',
  authDomain: 'socialnetwork-paw.firebaseapp.com',
  projectId: 'socialnetwork-paw',
  storageBucket: 'socialnetwork-paw.appspot.com',
  messagingSenderId: '896414615855',
  appId: '1:896414615855:web:f5b323d429da8e1cd679da',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

export {
  doc,
  setDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  auth,
  db,
};
