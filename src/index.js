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
  collection,
  getDocs,
  querySnapshot,
  getDoc,
  onAuthStateChanged,
  signOut,
  //user,
  updateProfile,
  addDoc,
  updateDoc,
  deleteDoc,
  Timestamp,
} from './firebase.js';
// eslint-disable-next-line import/no-unresolved, max-len
export const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;
    changeRoute('#/wall');
    if (user.emailVerified) {
      changeRoute('#/wall');
    }
  });

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

export const saveComment = (comment, name, date, userId, likes, likesCounter) => addDoc(collection(db, 'comments'), { comment, date, name, userId, likes, likesCounter });

// Funcion para editar datos
export const updatePost = (id, newInput) => updateDoc(doc(db, 'comments', id), newInput);

// Funcion para eliminar datos
export const deletePost = (id) => deleteDoc(doc(db, 'comments', id));

export const exit = () => {
  signOut(auth).then(() => {
    changeRoute('#/login');
  }).catch((error) => {
    console.log(error);
  });
};
