// aqui exportaras las funciones que necesites
import { login } from '../views/login.js';
import { signup } from '../views/signup.js';
import { wall } from '../views/wall.js';

export const changeRoute = (hash) => {
  window.location.hash = hash;
  // eslint-disable-next-line no-use-before-define
  return showViews(hash);
};

const showViews = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '':
    case '#/login':
      containerRoot.appendChild(login());
      break;
    case '#/signup':
      containerRoot.appendChild(signup());
      break;
    case '#/wall':
      containerRoot.appendChild(wall());
      break;
    default:
      containerRoot.innerHTML = `
      <h1 style="font-size: 40px">404</h1>
      <h2>Esta página no existe.</h2>
      `;
  }
};
