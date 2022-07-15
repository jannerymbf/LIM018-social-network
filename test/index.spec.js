// importamos la funcion que vamos a testear
import { myFunction } from '../src/lib/index';
jest.mock('../src/firebase.js');
describe('myFunction', () => {
  it('debería ser una función', () => {
    expect(typeof myFunction).toBe('function');
  });
});
