// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-cycle
import { changeRoute } from './routes/router.js';
import {
  doc,
  setDoc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  auth,
  db,
  GoogleAuthProvider,
  signInWithPopup,
  provider,
  getDoc,
  docRef,
  docSnap,
} from './firebase.js';
// eslint-disable-next-line import/no-unresolved
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
      // changeRoute('#/login');
      return true;
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorMessage);// eslint-disable-next-line no-alert
      alert('Los datos ingresados no son válidos.');
      return false;
    });
};

export const loginUser = (email, password) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      if (user.emailVerified) {
        changeRoute('#/wall');
        return true;
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // alert('Usuario y/o contraseña incorrectos.');
      return false;
    });
};

export const registerGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // setDoc(doc(db, 'users', user.uid), {
      //   Name: user.name,
      //   LastName: user.lastName,
      //   Email: user.email,
      // });
      changeRoute('#/wall');
    // ...
    }).catch((error) => {
    // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
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

// funcion que me retorne el nombre para jalarlo en el wall
export const getName = () => {
  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
};
