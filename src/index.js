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
// eslint-disable-next-line import/no-unresolved
export const registerUser = (name, lastName, email, password) => createUserWithEmailAndPassword(auth, email, password)
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
    updateProfile(user, {
      displayName: `${name} ${lastName}`,
    }).then(() => {
      // Profile updated!
      // ...
    }).catch((error) => {
      // An error occurred
      // ...
    });
    setDoc(doc(db, 'users', user.uid), {
      Name: name,
      LastName: lastName,
      Email: email,
      Password: password,
    });

    // Si el usuario verifico mail puede ingresar al wall
    // (estará comentado porque no tenemos muchos correos reales)
    sendEmailVerification(auth.currentUser)
      .then(() => {
        console.log('enviando correo');
      });
    console.log(user);
    // termina
    // changeRoute('#/login');
    // return user;
  });

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

// export const saveComment = (comment, name) => {
//   const date = new Date();
//   addDoc(collection(db, 'comments'), { comment, name, date });

// };

// export const saveComment = (comment, name) => addDoc(collection(db, 'comments'), { comment, name });

export const saveComment = (comment, name, date, userId, likes, likesCounter) => addDoc(collection(db, 'comments'), { comment, date, name, userId, likes, likesCounter });

// export const saveWall = () => {
//   const colRef = collection(db, 'comments');
//   let posts = [];
//   getDocs(colRef)
//     .then((onSnapshot) => {
//       onSnapshot.docs.forEach((document) => {
//         //posts.push({ ...doc.data(), id: doc.id });
//         posts.push({ name: document.data().name, post: document.data().comment });
//         return posts;
//       });
//     });
// };

// ******* observer
// export const observer = () => {
//   onAuthStateChanged(auth, (activeUser) => {
//     if (activeUser) {
//       // console.log(user);
//       const uid = activeUser.uid;
//       console.log('Usuario activo', uid);

//       // **jalando nombre de firestore
//       const docRef = doc(db, 'users', uid);
//       const docSnap = getDoc(docRef);
//       docSnap
//         .then((result) => {
//           const nameUser = result.data().Name;
//           console.log(nameUser);
//           localStorage.setItem('nameUser', nameUser);
//           //printTitle();
//         })
//         .catch((err) => {
//           console.log(err);
//           //return err;
//         });
//       // ** acaá termina

//       // if (docSnap.exists()) {
//       //   console.log('Document data:', docSnap.data());
//       // } else {
//       //   // doc.data() will be undefined in this case
//       //   console.log('No such document!');
//       // }
//       // ...
//     } else {
//       // User is signed out
//       console.log('No existe usuario activo');
//     }
//     // console.log(user);
//   });
// };
// ******termina observer

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
