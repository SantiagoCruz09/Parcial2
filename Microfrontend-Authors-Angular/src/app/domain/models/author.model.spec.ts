import { Author } from './author.model';

/**
 * Pruebas del modelo de dominio de autores.
 */
describe('Author model', () => {
  it('permite construir un autor válido', () => {
    const author: Author = {
      id: 1,
      name: 'Gabriel García Márquez',
      nationality: 'Colombiana',
      booksWritten: 25,
    };

    expect(author.nationality).toBe('Colombiana');
    expect(author.booksWritten).toBe(25);
  });
});
