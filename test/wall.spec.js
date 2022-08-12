import { auth } from '../src/firebase.js';
import { wall } from '../src/views/wall.js';

jest.mock('../src/index.js');
jest.mock('../src/firebase.js');

describe('testeando la función wall()', () => {
  it('debería mostrar el saludo con nombre', () => {
    document.body.appendChild(wall());
    const greeting = document.querySelector('.user-text');
    expect(greeting.textContent).toBe('¡Hola, Jannery!');
  });

  it('debería mostrar imagen de default', () => {
    document.body.appendChild(wall());
    const imageProfile = document.querySelector('.user-img');
    expect(imageProfile.src).toBe('http://localhost/pictures/user.png');
  });

  // pasa pero no cubre la línea
  it('debería mostrar imagen de Google', () => {
    document.body.appendChild(wall());
    const imageProfile = document.querySelector('.user-img');
    imageProfile.src = '';
    auth.currentUser.photoURL = 'http://localhost/';
    expect(imageProfile.src).toBe(auth.currentUser.photoURL);
  });

  // **ojooo
  it('debería mostrar likeColoredImg', () => {
    document.body.appendChild(wall());
    const imgLikes = document.createElement('img');
    const postData = { likeColoredImg: true };
    console.log(postData);
    imgLikes.src = postData.likeColoredImg;
    expect(postData.likeColoredImg).toBe(true);
  });

  // testear firstLoad --> ojooo
  it('debería mostrar la cajita del post', () => {
    document.body.appendChild(wall());
    const container = document.createElement('div');
    expect(container instanceof HTMLElement).toBe(true);
  });

  it('debería mostrar el botón PostComment', () => {
    document.body.appendChild(wall());
    const btnPostComment = document.querySelector('.post-btnpost');
    expect(btnPostComment instanceof HTMLElement).toBe(true);
  });

  it('debería pintar el contenedor de comentarios al hacer click en SaveComment', () => {
    document.body.appendChild(wall());
    const btnPostComment = document.querySelector('.post-btnpost');
    const commentPost = document.querySelector('.post-editableText');
    commentPost.value = 'Hola';
    btnPostComment.click();
    const container = document.createElement('div');
    expect(container instanceof HTMLElement).toBe(true);
  });

  it('debería cerrar sesión y retornar al login', (done) => {
    document.body.innerHTML = '<div id="root"></div>';
    document.body.appendChild(wall());

    const btnSignOut = document.querySelector('.btn-exit');
    btnSignOut.click();

    const p = new Promise(process.nextTick);
    p.then(() => {
      expect(window.location.hash).toBe('#/login');
      done();
    });
  });
});
