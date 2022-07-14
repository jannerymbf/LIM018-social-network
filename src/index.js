// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js';
// import { getFirestore, doc, setDoc, collection, addDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import { getFirestore, doc, setDoc } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-firestore.js';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, sendEmailVerification } from 'https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js';
import { changeRoute } from './routes/router.js';

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

export const registerUser = (name, lastName, email, password) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // eslint-disable-next-line no-console
      // console.log(user);
      // Añadir datos al firestore con diferente ID
      // addDoc(collection(db, 'users'), {
      //   Name: name,
      //   LastName: lastName,
      //   Email: email,
      //   Password: password,
      // });
      // Añadir datos al firestore con mismo ID
      setDoc(doc(db, 'users', user.uid), {
        Name: name,
        LastName: lastName,
        Email: email,
        Password: password,
      });
      // Si el usuario verifico mail puede ingresar al wall
      sendEmailVerification(auth.currentUser)
        .then(() => {
          console.log('enviando correo');
        });
      console.log(user);
      // termina
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);// eslint-disable-next-line no-alert
      alert(errorCode, errorMessage);
    });
};

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
      console.log(user);
      if (user.emailVerified) {
        changeRoute('#/wall');
      } else {
        alert('Primero verifica email');
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert("Usuario y/o contraseña incorrectos");
    });
};

// const observer = () => {
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const uid = user.uid;
//       console.log('Usuario activo');
//       changeRoute('#/wall');
//       // ...
//     } else {
//       // User is signed out
//       console.log('No existe usuario activo');
//     }
//   });
// };

// observer();
