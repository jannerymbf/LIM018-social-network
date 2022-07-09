export const login = () => {
  const viewLogin = `
    <section class="logo">
      <img class="logo-img" src="pictures/paw.png">
      <p class="logo-text">PawProtection</p>
    </section>
  
    <section class="login">
      <form class="login-form-group">
        <input type="text" class="login-email" placeholder="Correo">
        <input type="text" class="login-password" placeholder="Contraseña">
        <button class="login-btnLogin"><a href="#/wall">Iniciar Sesión</a></button>
      </form>
      <p class="login-text">O bien ingresa con</p>
      <picture class="login-google-img"></picture>
      <p class="login-signup">¿No tienes cuenta?<a href="#/signup"><strong>Regístrate</strong></a></p>
    </section>
  `;

  const containerLogin = document.createElement('div');
  containerLogin.innerHTML = viewLogin;
  containerLogin.className = 'view-login';

  return containerLogin;
};
