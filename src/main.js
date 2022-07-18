// Este es el punto de entrada de tu aplicacion
// import { login } from './views/login.js';
import { changeRoute } from './routes/router.js';

const init = () => {
  // window.location.host = document.getElementById('root').appendChild(login());
  window.addEventListener('hashchange', () => {
    // document.getElementById('root').appendChild(login()); //sería en caso si tuvieramos navbar
    changeRoute(window.location.hash);
  });
  changeRoute(window.location.hash);
};

window.addEventListener('load', init());
