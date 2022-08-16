import { exit, saveComment, deletePost, updatePost } from '../index.js';
import { auth, collection, db, getDocs, querySnapshot, Timestamp, query, orderBy, doc } from '../firebase.js';
import { changeRoute } from '../routes/router.js';

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

    <section class="published-posts">
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

  greeting.innerHTML = `¡Hola, ${auth.currentUser.displayName}!`;
  function imageSee(){
    if (auth.currentUser.photoURL === null){
     imageProfile.src = "pictures/user.png";
     } else {
     console.log(auth.currentUser);
     imageProfile.src = auth.currentUser.photoURL;
   }
  }
  imageSee();
  // greeting.innerHTML = `¡Hola, ${localStorage.getItem('nameUser')}!`;
  // console.log(auth.currentUser.email);
  // getName();
  firstLoad();

  function createDivs(postData) {
    const idPost = postData.id;
    const name = postData.name;
    const post = postData.comment;
    const datePost = postData.date;
    const likes = postData.likes ?? [];
    let likesQty = likes.length;

    // Variables para las horas
    let hours = datePost.toDate().getHours() ;
    let minutes = datePost.toDate().getMinutes();
    minutes = ('0' + minutes).slice(-2);
    let jornada = hours >= 12 ? 'PM'  : 'AM';
    // hasta acá

    const weekDay = [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
    const monthYear = [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'];

    const container = document.createElement('div');
    container.setAttribute('class', 'general-container-post');
    const containerHeadPost = document.createElement('div'); // **agregué esta línea
    const containerNameDate = document.createElement('div'); // para agrupar name y date del post
    const containerName = document.createElement('p'); // **cambié esta línea
    const containerDate = document.createElement('p'); // **agregué esta línea
    const containerPost = document.createElement('textarea');
   
    // Variables para likes
    const containerLikes = document.createElement('div');
    const imgLikes = document.createElement('img');
    const countLikes = document.createElement('p');

    // ***JC
    if(postData.likeColoredImg){
      imgLikes.src = postData.likeColoredImg;
    } else {
      imgLikes.setAttribute('src', 'pictures/heart-disabled.png');
    }
    // ***

    // Variables para editar ** Cambié estas líneas
    const btnUpdate = document.createElement('button');
    const btnUpdateText = document.createTextNode('Actualizar');
    btnUpdate.appendChild(btnUpdateText);
    // const btnDelete = document.createElement('button');
    // const btnDeleteText = document.createTextNode('Eliminar');
    // btnDelete.appendChild(btnDeleteText);

    containerName.innerHTML = name;
    containerPost.innerHTML = post;
    containerDate.innerHTML = `${ weekDay[datePost.toDate().getDay()]}, ${datePost.toDate().getDate()} de ${monthYear[datePost.toDate().getMonth()]} de ${datePost.toDate().getFullYear()}, a las ${hours % 12}:${minutes}   ${jornada}`;
    containerNameDate.appendChild(containerName); // **agregue esta línea
    containerNameDate.appendChild(containerDate);
    containerHeadPost.appendChild(containerNameDate);
    //containerPost.appendChild(containerHeadPost); // **cambié esta línea
    container.appendChild(containerHeadPost);
    container.appendChild(containerPost);
    // publishedPostsContainer.appendChild(containerName);
    // publishedPostsContainer.appendChild(containerPost);
    containerHeadPost.setAttribute('class', 'container-head-post'); // **agregué esta línea
    containerNameDate.setAttribute('class', 'container-name-date'); // **agregué esta línea
    containerName.setAttribute('class', 'container-post-name');
    containerDate.setAttribute('class', 'container-post-date');
    containerPost.setAttribute('class', 'container-post');
    containerPost.setAttribute('disabled', true);
    container.setAttribute('id', idPost);
    // para los likes
    // imgLikes.setAttribute('src', 'pictures/heart-disabled.png');
    imgLikes.setAttribute('class', 'published-posts-likes-img');
    containerLikes.setAttribute('class', 'containerLikes');
    countLikes.setAttribute('class', 'published-posts-likes-number');
    // **cmabié estas líneas
    btnUpdate.setAttribute('class', 'btn-update-post');
    btnUpdate.setAttribute('data-id', idPost);
    // btnDelete.setAttribute('class', 'btn-delete-post');
    // btnDelete.setAttribute('data-id', idPost);
    //** */
    containerLikes.appendChild(imgLikes);
    containerLikes.appendChild(countLikes);
    // **Cambié estas líneas
    // containerLikes.appendChild(btnEdit);
    containerLikes.appendChild(btnUpdate);
    // **
    // publishedPostsContainer.appendChild(containerLikes);
    container.appendChild(containerLikes);
    publishedPostsContainer.appendChild(container);

    // **Agregué esta función para ñadir menú desplegable
    function dropdownMenu() {
       // **Variables para los tres puntos
      const threeDots = document.createElement('img');
      threeDots.setAttribute('src', 'pictures/three-dots-yellow.png');
      threeDots.setAttribute('class', 'three-dots');
      containerHeadPost.appendChild(threeDots);

      const dropDown = document.createElement('ul');
      dropDown.setAttribute('class', 'dropdown-menu')
      const dropDownEdit = document.createElement('li');
      dropDownEdit.innerHTML = 'Editar';
      const dropDownDelete = document.createElement('li');
      dropDownDelete.innerHTML = 'Eliminar';
      dropDownEdit.setAttribute('data-id', idPost);
      dropDownDelete.setAttribute('data-id', idPost);
      dropDown.appendChild(dropDownEdit);
      dropDown.appendChild(dropDownDelete);
      containerHeadPost.appendChild(dropDown);

      let menuStatus = false;
      threeDots.addEventListener('click', () => {
        if(!menuStatus){
          dropDown.style.display = 'block';
          menuStatus = true;
        }else{
          dropDown.style.display = 'none';
          menuStatus = false;
        }
      })

      // Modal para confirmación de delete y edit
      const modalConf = document.createElement('dialog');
      modalConf.setAttribute('class', 'modal-conf');
      const textModalConf = document.createElement('p');
      textModalConf.innerHTML = '¿Desea eliminar esta publicación?';
      const btnYesModalConf = document.createElement('button');
      btnYesModalConf.innerHTML = 'Eliminar';
      const btnNoModalConf = document.createElement('button');
      btnNoModalConf.innerHTML = 'Cancelar';
      btnYesModalConf.setAttribute('class', 'btn-modalConf-yes');
      btnNoModalConf.setAttribute('class', 'btn-modalConf-no');
      modalConf.appendChild(textModalConf);
      modalConf.appendChild(btnYesModalConf);
      modalConf.appendChild(btnNoModalConf);
      containerWall.appendChild(modalConf);
      // hasta acá modal

      dropDownEdit.addEventListener('click', (e) => {
        btnUpdate.style.display = 'block';
        containerPost.disabled = false;
        dropDown.style.display = 'none';
        containerPost.focus();

        btnUpdate.addEventListener('click', () => {
            updatePost(e.target.dataset.id, { comment: containerPost.value });
            containerPost.disabled = true;
            btnUpdate.style.display = 'none';
        })
      });

      dropDownDelete.addEventListener('click', (event) => {
        // Agregar mensaje de confirmación
        modalConf.showModal();
        dropDown.style.display = 'none';
        //pendiente
        btnYesModalConf.addEventListener('click', () => {
          deletePost(event.target.dataset.id);
          publishedPostsContainer.removeChild(container);
          modalConf.close();
        })
        btnNoModalConf.addEventListener('click', () => {
          modalConf.close();
        })
        
      });
    }

    if(postData.userId == auth.currentUser.uid){
      dropdownMenu();
    }
    // **hasta acá

    countLikes.innerHTML = likesQty;

    imgLikes.addEventListener('click', (e) => {
      e.preventDefault();
      
      const isIncluded = likes.includes(auth.currentUser.uid);

      if(isIncluded){
        const foundLike = likes.findIndex(e => e === auth.currentUser.uid);
        likes.splice(foundLike, 1);
        likesQty--;
        imgLikes.src = 'pictures/heart-disabled.png'; // **agregué esta línea y falata que aparezca el corazón activo al cargar página
        console.log('diste dislike');
      }else{
        likes.push(auth.currentUser.uid);
        likesQty++;
        imgLikes.src = 'pictures/heart.png'; // **agregué esta línea
        console.log('diste like');
      }
      countLikes.innerHTML = likesQty;
      updatePost(idPost, {likes: likes, likesCounter: likesQty});
    });
  }

  function firstLoad() {
    const colRef = collection(db, 'comments');
    const q = query(colRef, orderBy("date", "desc"));
    
    getDocs(q)
      .then((onSnapshot) => {
        onSnapshot.docs.forEach((document) => {
          let commentData = { id: document.id, ...document.data() };
          commentData = likes(commentData, auth.currentUser.uid);
          createDivs(commentData);
        });
      });
  }

  // 1. id usuario actual
  // 2. document
  // 3. la referencia de la imagen
  function likes(document, idUser) {
    if(document.likes.includes(idUser)){
      return {...document, likeColoredImg: 'pictures/heart.png' }
    }
    return document;
  }

  btnPostComment.addEventListener('click', (e) => {
    e.preventDefault;
    if (commentPost.value !== '') {
      const date = Timestamp.fromDate(new Date());
      const userId = auth.currentUser.uid;
      const likes = [];
      const likesCounter = 0;
      console.log(':D :d');
      saveComment(commentPost.value, auth.currentUser.displayName, date, userId, likes, likesCounter)
        .then((result) => {
          //console.log(result.orderBy('date', 'desc'));
          //const q = query(result, orderBy('date', 'desc'));
          publishedPostsContainer.innerHTML = '';
          firstLoad();
          const commentData = { id: result.id, name: auth.currentUser.displayName, comment: commentPost.value}
          //createDivs(commentData);
          commentPost.value = '';
          console.log(result);
        });
    }
  });

  btnSignOut.addEventListener('click', () => {
    exit()
      .then(() => {
        changeRoute('#/login');
      })
  });

  return containerWall;
};
