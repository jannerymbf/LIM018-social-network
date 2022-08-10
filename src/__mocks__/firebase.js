// export const GoogleAuthProvider = () => null; // momentaneo

export const GoogleAuthProvider = jest.fn();
export const updateProfile = () => Promise.resolve();
export const setDoc = jest.fn();
export const doc = jest.fn();
export const db = jest.fn();
