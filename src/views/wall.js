export const wall = () => {
  const viewWall = `
    <header>
      <section class="logo">
      <img class="logo-img" src="pictures/paw.png">
        <p class="logo-text">PawProtection</p>
      </section>

      <a href="#/login">Salir</a>
    </header>

    <section class="user">
      <img class="user-img" src="pictures/user.png">
      <p class="user-text">Hola, <p class="user-name"></p></p>
    </section>

    <section class="post">
      <textarea name="textarea" rows="10" cols="50" class="post-editableText">Write something here</textarea>
      <button class="post-btnpost"></button>
    </section>

    <section class="published-posts">
      <div class="published-posts-first">
       <div class="published-posts-box"></div>
       <select class="published-posts-btn">
        <option value="edit">Editar</option>
        <option value="delete">Eliminar</option>
       </select>
      </div>
      <div class="published-posts-likes">
        <picture class="published-posts-likes-img"></picture>
        <p class="published-posts-likes-number"></p>
      </div>
    </section>
  `;

  const containerWall = document.createElement('div');
  containerWall.innerHTML = viewWall;
  containerWall.className = 'view-wall';

  return containerWall;
};
