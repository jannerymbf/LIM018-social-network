export const wall = () => {
  const viewWall = `
    <header class="header-wall flex-wall">
      <section class="logo-wall flex-wall">
        <img class="logo-img logo-img-wall" src="pictures/paw.png">
        <p class="logo-text">PawProtection</p>
      </section>
      <a href="#/login" class="btn-exit">Salir</a>
    </header>

    <section class="user">
      <img class="user-img" src="pictures/user.png">
      <p class="user-text">¡Hola, Guillermo Morgado!</p>
    </section>

    <section class="post flex">
      <textarea name="textarea" class="post-editableText" rows="4" cols="10" placeholder="Cuéntanos..."></textarea>
      <img class="post-btnpost" src="pictures/send.png">
    </section>

    <section class="published-posts flex">
      <div class="published-posts-first">
        <div class="published-posts-box"></div>
        <!--<select class="published-posts-btn">
          <option value="edit">Editar</option>
          <option value="delete">Eliminar</option>
        </select>-->
      </div>
      <div class="published-posts-likes flex-wall">
        <img class="published-posts-likes-img" src="pictures/heart.png">
        <p class="published-posts-likes-number">30</p>
      </div>
    </section>
  `;

  const containerWall = document.createElement('div');
  containerWall.innerHTML = viewWall;
  containerWall.className = 'view-wall';

  return containerWall;
};
