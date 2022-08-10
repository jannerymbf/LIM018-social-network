export const registerUser = (email, password) => {
  if (email === 'jannerygmail.com' && password === '1') {
    return Promise.reject(new Error());
  }
  return Promise.resolve({
    user: {
      uid: '',
    },
  });
};
