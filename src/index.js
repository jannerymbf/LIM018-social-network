// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
// initializeApp(firebaseConfig);
const auth = getAuth();
// const db = getFirestore(app);

export const registerUser = (email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // eslint-disable-next-line no-console
      console.log(user);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);// eslint-disable-next-line no-alert
      alert(errorCode, errorMessage);
    });
};
