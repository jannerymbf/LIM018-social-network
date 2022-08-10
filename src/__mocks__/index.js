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

export const loginUser = (email, password) => {
  if (email === 'jannerygmail.com' && password === '1') {
    return Promise.reject(new Error());
  }
  return Promise.resolve({
    user: {
    },
  });
};

export const registerGoogle = () => Promise.reject(new Error());
