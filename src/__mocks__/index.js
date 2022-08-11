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

// eslint-disable-next-line prefer-promise-reject-errors
export const registerGoogle = () => Promise.reject({ code: 12, message: '', customData: { email: '' } });

export const saveComment = () => Promise.resolve({});

export const exit = () => Promise.resolve();
