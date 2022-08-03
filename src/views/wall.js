import { exit, saveComment, deletePost, updatePost } from '../index.js';
import { auth, collection, db, getDocs, Timestamp } from '../firebase.js';

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
  const imageProfile = containerWall.querySelector('.user-img');

  let editStatus = false;

  greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  imageProfile.src = auth.currentUser.photoURL;
  // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;
  // console.log(auth.currentUser.email);
  // getName();
  firstLoad();

  function createDivs(postData) {
    const idPost = postData.id;
    const name = postData.name;
    const post = postData.comment;
    const likes = postData.likes ?? [];
    let likesQty = likes.length;

    const container = document.createElement('div');
    const containerName = document.createElement('div');
    const containerPost = document.createElement('textarea');
    // Variables para likes
    const containerLikes = document.createElement('div');
    const imgLikes = document.createElement('img');
    const countLikes = document.createElement('p');
    // Variables para editar
    const btnEdit = document.createElement('button');
    const btnEditText = document.createTextNode('Editar');
    btnEdit.appendChild(btnEditText);
    const btnDelete = document.createElement('button');
    const btnDeleteText = document.createTextNode('Eliminar');
    btnDelete.appendChild(btnDeleteText);

    containerName.innerHTML = name;
    containerPost.innerHTML = post;
    containerPost.appendChild(containerName);
    container.appendChild(containerName);
    container.appendChild(containerPost);
    // publishedPostsContainer.appendChild(containerName);
    // publishedPostsContainer.appendChild(containerPost);
    containerName.setAttribute('class', 'container-post-name');
    containerPost.setAttribute('class', 'container-post');
    containerPost.setAttribute('disabled', true);
    container.setAttribute('id', idPost);
    // para los likes
    imgLikes.setAttribute('src', 'pictures/heart.png');
    imgLikes.setAttribute('class', 'published-posts-likes-img');
    containerLikes.setAttribute('class', 'containerLikes');
    countLikes.setAttribute('class', 'published-posts-likes-number');
    btnEdit.setAttribute('class', 'btn-edit-post');
    btnEdit.setAttribute('data-id', idPost);
    btnDelete.setAttribute('class', 'btn-delete-post');
    btnDelete.setAttribute('data-id', idPost);
    containerLikes.appendChild(imgLikes);
    containerLikes.appendChild(countLikes);
    containerLikes.appendChild(btnEdit);
    containerLikes.appendChild(btnDelete);
    // publishedPostsContainer.appendChild(containerLikes);
    container.appendChild(containerLikes);
    publishedPostsContainer.appendChild(container);

    btnDelete.addEventListener('click', (event) => {
      deletePost(event.target.dataset.id);
      publishedPostsContainer.removeChild(container);
    });

    btnEdit.addEventListener('click', (e) => {
      if (!editStatus) {
        containerPost.disabled = false;
        btnEdit.innerHTML = 'Actualizar';
        editStatus = true;
      } else {
        updatePost(e.target.dataset.id, { comment: containerPost.value });
        containerPost.disabled = true;
        btnEdit.innerHTML = 'Editar';
        editStatus = false;
      }
    });

    countLikes.innerHTML = likesQty;

    imgLikes.addEventListener('click', (e) => {
      e.preventDefault();
      const isIncluded = likes.includes(auth.currentUser.uid);

      if(isIncluded){
        const foundLike = likes.findIndex(e => e === auth.currentUser.uid);
        likes.splice(foundLike, 1);
        likesQty--;
        console.log('diste dislike');
      }else{
        likes.push(auth.currentUser.uid);
        likesQty++;
        console.log('diste like');
      }
      countLikes.innerHTML = likesQty;
      updatePost(idPost, {likes: likes, likesCounter: likesQty});
    });
  }

  function firstLoad() {
    const colRef = collection(db, 'comments');
    let posts = [];
    getDocs(colRef)
      .then((onSnapshot) => {
        onSnapshot.docs.forEach((document) => {
          const commentData = { id: document.id, ...document.data() };
          // posts.push({ ...doc.data(), id: doc.id });
          posts.push({ name: commentData.name, post: commentData.comment });
          createDivs(commentData);
        });
      });
  }

  btnPostComment.addEventListener('click', () => {
    if (commentPost.value !== '') {
      const date = Timestamp.fromDate(new Date());
      const userId = auth.currentUser.uid;
      const likes = [];
      const likesCounter = 0;
      saveComment(commentPost.value, auth.currentUser.displayName, date, userId, likes, likesCounter)
        .then((result) => {
          const commentData = { id: result.id, name: auth.currentUser.displayName, comment: commentPost.value}
          createDivs(commentData);
          commentPost.value = '';
          console.log(result.id);
        });
    }
  });

  btnSignOut.addEventListener('click', () => {
    exit();
  });

  return containerWall;
};
