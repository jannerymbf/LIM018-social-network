/**
 * @jest-environment jsdom
 */

import { login } from '../src/views/login.js';

jest.mock('../src/index.js');
jest.mock('../src/firebase.js');

describe('testeando la función login()', () => {
  it('debería mostrar el boton Iniciar Sesión', () => {
    document.body.appendChild(login());
    const btnLogin = document.querySelector('.login-btnLogin');
    expect(btnLogin instanceof HTMLElement).toBe(true);
  });

  it('en el errorText debe decir que El correo y/o contraseña ingresados no están conectados a ninguna cuenta.', () => {
    document.body.appendChild(login());
    const btnLogin = document.querySelector('.login-btnLogin');
    const email = document.querySelector('.login-email');
    email.value = '';

    btnLogin.click();
    const errorText = document.querySelector('.login-errortext');
    expect(errorText.textContent).toEqual('El correo y/o contraseña ingresados no están conectados a ninguna cuenta.');
  });

  it('debería mostrar error al pasar al catch', () => {
    document.body.appendChild(login());
    const btnLogin = document.querySelector('.login-btnLogin');
    const email = document.querySelector('.login-email');
    const password = document.querySelector('.login-password');
    email.value = 'jannerygmail.com';
    password.value = '1';

    btnLogin.click();
    const errorText = document.querySelector('.login-errortext');
    expect(errorText.textContent).toEqual('El correo y/o contraseña ingresados no están conectados a ninguna cuenta.');
  });

  it('debería mostrar el botón de Google', () => {
    document.body.appendChild(login());
    const btnGoogle = document.querySelector('.login-google-img');
    expect(btnGoogle instanceof HTMLElement).toBe(true);
  });

  it('al hacer click al botón de Google debería pasar al catch', () => {
    document.body.appendChild(login());
    const btnGoogle = document.querySelector('.login-google-img');

    btnGoogle.click();
    expect(btnGoogle instanceof HTMLElement).toBe(true);
  });
});
