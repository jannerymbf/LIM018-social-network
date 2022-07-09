export const signup = () => {
  const viewSignup = `
    <section class="logo">
      <img class="logo-img" src="pictures/paw.png">
      <p class="logo-text">PawProtection</p>
    </section>

    <section class="signup">
      <form class="signup-form-group">
        <input type="text" class="signup-name" placeholder="Nombre">
        <input type="text" class="signup-lastName" placeholder="Apellidos">
        <input type="text" class="signup-email" placeholder="Correo">
        <input type="text" class="signup-password" placeholder="Contraseña">
        <button class="login-btnsignup"><a href="#/login">Registrar</a></button>
      </form>
      <p class="login-signup">¿Ya tienes cuenta?<a href="#/login"><strong>Inicia sesión</strong></a></p>
    </section>
  `;

  const containerSignup = document.createElement('div');
  containerSignup.innerHTML = viewSignup;
  containerSignup.className = 'view-signup';

  return containerSignup;
};
