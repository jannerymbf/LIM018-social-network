// aqui exportaras las funciones que necesites
import { login } from '../views/login.js';
import { signup } from '../views/signup.js';
import { wall } from '../views/wall.js';

// export const changeRoute = (hash) => {
//   window.location.hash = hash;
//   // eslint-disable-next-line no-use-before-define
//   return showViews(hash);
// };

export const changeRoute = (hash) => {
  const containerRoot = document.getElementById('root');
  containerRoot.innerHTML = '';

  switch (hash) {
    case '':
    case '#/login':
      containerRoot.appendChild(login());
      window.location.hash = '#/login';
      break;
    case '#/signup':
      containerRoot.appendChild(signup());
      window.location.hash = '#/signup';
      break;
    case '#/wall':
      containerRoot.appendChild(wall());
      window.location.hash = '#/wall';
      break;
    default:
      containerRoot.innerHTML = `<div id='noExist'>
      <h1 style="font-size: 40px">404</h1>
      <h2>Esta página no existe.</h2></div>
      `;
  }
};
