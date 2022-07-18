import { loginUser } from '../index.js';
import { changeRoute } from '../routes/router.js';

export const login = () => {
  const viewLogin = `
    <section class="logo flex">
      <img class="logo-img" src="pictures/paw.png">
      <p class="logo-text">PawProtection</p>
    </section>
  
    <section class="login flex">
      <form class="login-form-group flex">
        <input type="text" class="login-email input-paw" placeholder="Correo">
        <input type="password" class="login-password input-paw" placeholder="Contraseña">
        <div class="login-errortext"></div>
        <button class="login-btnLogin btn-paw"><a class="login-btnLogin-ref">Iniciar Sesión</a></button>
      </form>
      <p class="login-text">O bien ingresa con</p>
      <img class="login-google-img" src="pictures/google.png">
      <p class="login-signup-text">¿No tienes cuenta?<a href="#/signup"><strong class="login-signup-btn"> Regístrate.</strong></a></p>
    </section>
  `;

  const containerLogin = document.createElement('div');
  containerLogin.innerHTML = viewLogin;
  containerLogin.className = 'view-login';

  const btnLogin = containerLogin.querySelector('.login-btnLogin');
  const email = containerLogin.querySelector('.login-email');
  const password = containerLogin.querySelector('.login-password');
  const errorText = containerLogin.querySelector('.login-errortext');

  btnLogin.addEventListener('click', () => {
    if (email.value !== '' || password.value !== '') {
      loginUser(email.value, password.value);
        /*.then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
          console.log(user);
          if (user.emailVerified) {
            changeRoute('#/wall');
          } else {
            errorText.innerHTML = 'No olvides verificar tu email.';
            console.log(errorText);
          }
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          errorText.innerHTML = 'El correo y/o contraseña ingresados no están conectados a ninguna cuenta.';
        });*/
    } else {
      // btnLoginref.setAttribute('href', '#/login');
      errorText.innerHTML = 'El correo y/o contraseña ingresados no están conectados a ninguna cuenta.';
      email.classList.add('errorInput');
      password.classList.add('errorInput');
    }
  });

  return containerLogin;
};
