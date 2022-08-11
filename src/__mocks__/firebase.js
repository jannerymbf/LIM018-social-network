// export const GoogleAuthProvider = () => null; // momentaneo

export const GoogleAuthProvider = { credentialFromResult: function() {}, credentialFromError: function() {} };
export const updateProfile = () => Promise.resolve();
export const setDoc = jest.fn();
export const doc = jest.fn();
export const db = jest.fn();
export const auth = { currentUser: { displayName: 'Jannery', photoURL: null } };
export const collection = jest.fn();
export const query = jest.fn();
export const orderBy = jest.fn();
export const getDocs = () => Promise.resolve({ docs: [] });
export const Timestamp = { fromDate() {} };
export const addDoc = jest.fn();
// return Promise.resolve({
//     user: {
//     },
//   });
