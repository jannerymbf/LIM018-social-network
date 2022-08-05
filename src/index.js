// Import the functions you need from the SDKs you need
// eslint-disable-next-line import/no-cycle
import {
  doc,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  auth,
  db,
  signInWithPopup,
  provider,
  collection,
  signOut,
  addDoc,
  updateDoc,
  deleteDoc,
} from './firebase.js';
// eslint-disable-next-line import/no-unresolved, max-len
export const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password);

export const loginUser = (email, password) => signInWithEmailAndPassword(auth, email, password);

export const registerGoogle = () => signInWithPopup(auth, provider);

export const saveComment = (comment, name, date, userId, likes, likesCounter) => addDoc(collection(db, 'comments'), { comment, date, name, userId, likes, likesCounter });

// Funcion para editar datos
export const updatePost = (id, newInput) => updateDoc(doc(db, 'comments', id), newInput);

// Funcion para eliminar datos
export const deletePost = (id) => deleteDoc(doc(db, 'comments', id));

export const exit = () => signOut(auth);
