import { changeRoute } from '../src/routes/router';

jest.mock('../src/index.js');
jest.mock('../src/firebase.js');

describe('changeRoute', () => {
  let root = '';
  beforeAll(() => {
    root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);
  });

  it('debería la ruta cambiar a #/login', () => {
    changeRoute('#/login');
    const btnLogin = document.querySelector('.login-btnLogin');
    expect(window.location.hash).toBe('#/login');
    expect(btnLogin instanceof HTMLElement).toBe(true);
  });

  it('debería la ruta cambiar a #/signup', () => {
    changeRoute('#/signup');
    const btnSignup = document.querySelector('.signup-btnSignup');
    expect(window.location.hash).toBe('#/signup');
    expect(btnSignup instanceof HTMLElement).toBe(true);
  });

  it('debería la ruta cambiar a #/wall', () => {
    changeRoute('#/wall');
    expect(window.location.hash).toBe('#/wall');
  });

  it('debería la ruta cambiar 404', () => {
    changeRoute('#/exist');
    const notFound = document.querySelector('#noExist');
    expect(notFound instanceof HTMLElement).toBe(true);
  });
});
