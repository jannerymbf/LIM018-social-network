// Este es el punto de entrada de tu aplicacion
import { login } from './views/login.js';
import { changeRoute } from './routes/router.js';

const init = () => {
  // window.location.host = document.getElementById('root').appendChild(login());
  changeRoute(window.location.hash);
  window.addEventListener('hashchange', () => {
    document.getElementById('root').appendChild(login());
    changeRoute(window.location.hash);
  });
};

window.addEventListener('load', init());
