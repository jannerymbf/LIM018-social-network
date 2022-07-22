import { exit, observer } from '../index.js';
import { auth, querySnapshot } from '../firebase.js';

export const wall = () => {
  const viewWall = `
    <header class="header-wall flex-wall">
      <section class="logo-wall flex-wall">
        <img class="logo-img logo-img-wall" src="pictures/paw.png">
        <p class="logo-text">PawProtection</p>
      </section>
      <a class="btn-exit">Salir</a>
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

  observer();
  const containerWall = document.createElement('div');
  containerWall.innerHTML = viewWall;
  containerWall.className = 'view-wall';

  const btnSignOut = containerWall.querySelector('.btn-exit');
  const greeting = containerWall.querySelector('.user-text');

  // greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;
  console.log(auth.currentUser);
  btnSignOut.addEventListener('click', () => {
    exit();
  });

  const prueba = () => {
    querySnapshot.forEach((doc) => {
      greeting.innerHTML = `¡Hola, ${doc.data().Name}!`;
      console.log(`${doc.id} => ${doc.data().Name}`);
    });
  };
  prueba();

  return containerWall;
};
