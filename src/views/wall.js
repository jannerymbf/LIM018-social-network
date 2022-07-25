import { exit, saveComment } from '../index.js';
import { auth, collection, db, getDocs } from '../firebase.js';

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
      <div class="published-posts-container">
        <!--<div class="published-posts-box"></div>
              <select class="published-posts-btn">
                <option value="edit">Editar</option>
                <option value="delete">Eliminar</option>
              </select>-->
      </div>
      <!--<div class="published-posts-likes flex-wall">
        <img class="published-posts-likes-img" src="pictures/heart.png">
        <p class="published-posts-likes-number">30</p>
      </div>-->
    </section>
  `;

  //observer();
  const containerWall = document.createElement('div');
  containerWall.innerHTML = viewWall;
  containerWall.className = 'view-wall';

  const btnSignOut = containerWall.querySelector('.btn-exit');
  const greeting = containerWall.querySelector('.user-text');
  const commentPost = containerWall.querySelector('.post-editableText');
  const btnPostComment = containerWall.querySelector('.post-btnpost');
  const publishedPostsContainer = containerWall.querySelector('.published-posts-container');

  greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;
  // console.log(auth.currentUser.email);
  // getName();
  function increaseLikes() {
    let counter = 0;
    counter++;
    return counter;
  }

  function createDivs(post) {
    const containerPost = document.createElement('div');
    const containerLikes = document.createElement('div');
    const imgLikes = document.createElement('img');
    const countLikes = document.createElement('p');
    containerPost.innerHTML = post;
    publishedPostsContainer.appendChild(containerPost);
    // para los likes
    imgLikes.setAttribute('src', 'pictures/heart.png');
    imgLikes.setAttribute('class', 'published-posts-likes-img');
    containerLikes.setAttribute('class', 'containerLikes');
    countLikes.setAttribute('class', 'published-posts-likes-number');
    containerLikes.appendChild(imgLikes);
    containerLikes.appendChild(countLikes);
    publishedPostsContainer.appendChild(containerLikes);
    imgLikes.addEventListener('click', () => {
      countLikes.innerHTML = increaseLikes();
      // dar y quitar likes usar toggle?
    });
  }

  function firstLoad() {
    const colRef = collection(db, 'comments');
    let posts = [];
    getDocs(colRef)
      .then((onSnapshot) => {
        onSnapshot.docs.forEach((document) => {
          //posts.push({ ...doc.data(), id: doc.id });
          posts.push({ name: document.data().name, post: document.data().comment });
          createDivs(document.data().comment);
        });
      });
  }

  firstLoad();

  btnPostComment.addEventListener('click', () => {
    if (commentPost.value !== '') {
      createDivs(commentPost.value);
      saveComment(commentPost.value, auth.currentUser.displayName);

      commentPost.value = '';
    }
  });

  btnSignOut.addEventListener('click', () => {
    exit();
  });

  return containerWall;
};
