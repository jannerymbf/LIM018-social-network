import { registerUser } from '../index.js';

export const signup = () => {
  const viewSignup = `
    <section class="logo flex">
      <img class="logo-img" src="pictures/paw.png">
      <p class="logo-text">PawProtection</p>
    </section>

    <section class="signup">
      <form class="signup-form-group flex">
        <input type="text" class="signup-name input-paw" placeholder="Nombre" required>
        <input type="text" class="signup-lastName input-paw" placeholder="Apellidos" required>
        <input id="emailSignup" type="email" class="signup-email input-paw" placeholder="Correo" required>
        <input id="passSignup" type="text" class="signup-password input-paw" placeholder="Contraseña" required>
        <button id="btnSignup" class="signup-btnSignup btn-paw"><a href="#/login">Registrar</a></button>
      </form>
      <p class="signup-login-text">¿Ya tienes cuenta?<a href="#/login"><strong class="login-signup-btn"> Inicia sesión.</strong></a></p>
    </section>
  `;

  const containerSignup = document.createElement('div');
  containerSignup.innerHTML = viewSignup;
  containerSignup.className = 'view-signup';

  const btnSignup = containerSignup.querySelector('.signup-btnSignup');
  const email = containerSignup.querySelector('.signup-email');
  const password = containerSignup.querySelector('.signup-password');
  const name = containerSignup.querySelector('.signup-name');
  const lastName = containerSignup.querySelector('.signup-lastName');
  btnSignup.addEventListener('click', () => {
    registerUser(name.value, lastName.value, email.value, password.value);
  });
  return containerSignup;
};
