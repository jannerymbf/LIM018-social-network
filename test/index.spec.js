// importamos la funcion que vamos a testear
/**
 * @jest-environment jsdom
 */

import signup from '../src/views/signup.js';

jest.mock('../src/index.js');

describe('signup', () => {
  it('click del boton Registrar', () => {
    document.body.appendChild(signup());
    const btnSignup = document.querySelector('.signup-btnSignup');
    expect(btnSignup instanceof HTMLElement).toBe('true');
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