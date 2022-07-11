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
        <button class="login-btnLogin btn-paw"><a href="#/wall">Iniciar Sesión</a></button>
      </form>
      <p class="login-text">O bien ingresa con</p>
      <img class="login-google-img" src="pictures/google.png">
      <p class="login-signup-text">¿No tienes cuenta?<a href="#/signup"><strong class="login-signup-btn"> Regístrate.</strong></a></p>
    </section>
  `;

  const containerLogin = document.createElement('div');
  containerLogin.innerHTML = viewLogin;
  containerLogin.className = 'view-login';

  return containerLogin;
};
