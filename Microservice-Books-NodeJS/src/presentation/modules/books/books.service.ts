import { faker } from '@faker-js/faker';
import { Book, BookGenre } from '../../../domain/interfaces/book.interface';

/**
 * Servicio encargado de la generación y gestión de libros.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar libros
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class BooksService {

  /**
   * Géneros disponibles para los libros.
   */
  private genres: BookGenre[] = [
    'Novela',
    'Cuento',
    'Poesía',
    'Ensayo',
    'Ciencia Ficción',
  ];

  /**
   * Obtiene un listado de libros generados dinámicamente.
   *
   * @param countBooks Cantidad de libros a generar
   * @returns Promesa que resuelve un arreglo de libros
   */
  public async getAllBooks(countBooks: number): Promise<Book[]> {
    const books: Promise<Book>[] = [];

    for (let i = 1; i <= countBooks; i++) {
      books.push(this.generateBook(i));
    }

    return Promise.all(books);
  }

  /**
   * Genera un libro ficticio.
   *
   * @param id Identificador único del libro
   * @returns Promesa que resuelve un libro generado
   */
  private generateBook(id: number): Promise<Book> {
    return Promise.resolve({
      id,
      title: faker.commerce.productName(),
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      genre: faker.helpers.arrayElement(this.genres),
      year: faker.number.int({ min: 1900, max: 2024 }),
      price: Number(faker.commerce.price({ min: 10000, max: 120000, dec: 0 })),
    });
  }
}
