import { Book, BOOK_GENRES } from './book.model';

/**
 * Pruebas del modelo de dominio de libros.
 */
describe('Book model', () => {
  it('expone los géneros literarios soportados', () => {
    expect(BOOK_GENRES).toEqual([
      'Novela',
      'Cuento',
      'Poesía',
      'Ensayo',
      'Ciencia Ficción',
    ]);
  });

  it('permite construir un libro válido', () => {
    const book: Book = {
      id: 1,
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      genre: 'Novela',
      year: 1967,
      price: 45000,
    };

    expect(book.genre).toBe('Novela');
    expect(book.year).toBe(1967);
  });
});
