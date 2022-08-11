/**
 * @jest-environment jsdom
 */

import { signup } from '../src/views/signup.js';

jest.mock('../src/index.js');
jest.mock('../src/firebase.js');

describe('signup', () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = jest.fn();
    HTMLDialogElement.prototype.showModal = jest.fn();
    HTMLDialogElement.prototype.close = jest.fn();
  });

  it('debería mostrar el botón Registrar', () => {
    document.body.appendChild(signup());
    const btnSignup = document.querySelector('.signup-btnSignup');
    expect(btnSignup instanceof HTMLElement).toBe(true);
  });

  it('en el errorText debe decir que Los datos ingresados no son válidos.', () => {
    document.body.appendChild(signup());
    const btnSignup = document.querySelector('.signup-btnSignup');
    const name = document.querySelector('.signup-name');
    name.value = '';

    btnSignup.click();
    const errorText = document.querySelector('.signup-errortext');
    expect(errorText.textContent).toEqual('Los datos ingresados no son válidos.');
  });

  it('debería mostrar modal', () => {
    document.body.appendChild(signup());
    const btnSignup = document.querySelector('.signup-btnSignup');
    const name = document.querySelector('.signup-name');
    const email = document.querySelector('.signup-email');
    const password = document.querySelector('.signup-password');
    const lastName = document.querySelector('.signup-lastName');
    name.value = 'Jannery';
    email.value = 'jannery@gmail.com';
    password.value = '12345678';
    lastName.value = 'Franco';

    btnSignup.click();
    const modal = document.querySelector('.signup-modal');
    // const errorText = document.querySelector('.signup-errortext');
    expect(modal instanceof HTMLElement).toBe(true);
  });

  it('debería mostrar error', () => {
    document.body.appendChild(signup());
    const btnSignup = document.querySelector('.signup-btnSignup');
    const email = document.querySelector('.signup-email');
    const password = document.querySelector('.signup-password');
    email.value = 'jannerygmail.com';
    password.value = '1';

    btnSignup.click();
    const errorText = document.querySelector('.signup-errortext');
    expect(errorText.textContent).toEqual('Los datos ingresados no son válidos.');
  });

  it('click del boton Cerrar Modal', () => {
    document.body.appendChild(signup());
    const btnCloseModal = document.querySelector('.signup-closeModal');
    expect(btnCloseModal instanceof HTMLElement).toBe(true);
  });

  it('debería cerrar el modal', () => {
    document.body.appendChild(signup());
    const root = document.createElement('div');
    root.setAttribute('id', 'root');
    document.body.appendChild(root);

    const btnCloseModal = document.querySelector('.signup-closeModal');
    btnCloseModal.click();
    console.log(window.location.hash);
    expect(window.location.hash).toBe('#/login');
    // entrar a changeRoute y testear esa línea
  });
});

// testear signup()
// los tests son los que prueban la funcionalidad específica del código
// solamente mockear cuando sea necesario, cuando los tests lo exija

// s = signup()
// document.body.appendchild(s)
// jsdom (package.json --env=jsdom)
// inputs
// click
// expect
// mock regiserUser
// toHaveBeenCalledWith
