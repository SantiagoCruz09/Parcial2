import { faker } from '@faker-js/faker';
import { CustomError } from '../../../domain/erros/custom.error';
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
   * Obtiene un libro por su identificador.
   *
   * @param id Identificador único del libro
   * @returns Promesa que resuelve el libro solicitado
   * @throws CustomError si el id no es un entero positivo
   */
  public async getBookById(id: number): Promise<Book> {
    if (!Number.isInteger(id) || id < 1) {
      throw CustomError.badRequest('El id debe ser un número entero positivo');
    }

    return this.generateBook(id);
  }

  /**
   * Obtiene un listado de libros de un género específico.
   *
   * @param genre Género literario solicitado
   * @param countBooks Cantidad de libros a generar
   * @returns Promesa que resuelve un arreglo de libros del género indicado
   * @throws CustomError si el género no es válido o la cantidad es inválida
   */
  public async getBooksByGenre(genre: string, countBooks: number): Promise<Book[]> {
    if (!this.isGenre(genre)) {
      throw CustomError.badRequest(
        `Género inválido. Géneros válidos: ${this.genres.join(', ')}`
      );
    }

    if (!Number.isInteger(countBooks) || countBooks < 1) {
      throw CustomError.badRequest('La cantidad debe ser un número entero positivo');
    }

    const books: Promise<Book>[] = [];

    for (let i = 1; i <= countBooks; i++) {
      books.push(this.generateBook(i, genre));
    }

    return Promise.all(books);
  }

  /**
   * Verifica si un valor corresponde a un género válido.
   *
   * @param value Valor a verificar
   * @returns `true` si el valor es un género válido
   */
  private isGenre(value: string): value is BookGenre {
    return (this.genres as string[]).includes(value);
  }

  /**
   * Genera un libro ficticio.
   *
   * @param id Identificador único del libro
   * @param genre Género del libro; si se omite, se elige aleatoriamente
   * @returns Promesa que resuelve un libro generado
   */
  private generateBook(id: number, genre?: BookGenre): Promise<Book> {
    return Promise.resolve({
      id,
      title: faker.commerce.productName(),
      author: `${faker.person.firstName()} ${faker.person.lastName()}`,
      genre: genre ?? faker.helpers.arrayElement(this.genres),
      year: faker.number.int({ min: 1900, max: 2024 }),
      price: Number(faker.commerce.price({ min: 10000, max: 120000, dec: 0 })),
    });
  }
}
