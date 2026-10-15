/**
 * Interfaz que representa un libro del sistema.
 *
 * @remarks
 * Cada libro debe tener un `id` único, un `title` descriptivo,
 * un `author`, un `genre` válido, un `year` de publicación
 * y un `price`.
 *
 * @example
 * ```ts
 * const libro: Book = {
 *   id: 1,
 *   title: 'Cien años de soledad',
 *   author: 'Gabriel García Márquez',
 *   genre: 'Novela',
 *   year: 1967,
 *   price: 45000
 * };
 * ```
 */
export interface Book {
  /** Identificador único del libro */
  id: number;

  /** Título del libro */
  title: string;

  /** Autor del libro */
  author: string;

  /** Género literario del libro */
  genre: BookGenre;

  /** Año de publicación */
  year: number;

  /** Precio del libro en pesos */
  price: number;
}

/**
 * Tipo de género literario de un libro.
 *
 * @remarks
 * Este tipo restringe los géneros a los valores predefinidos:
 * - 'Novela'
 * - 'Cuento'
 * - 'Poesía'
 * - 'Ensayo'
 * - 'Ciencia Ficción'
 *
 * @example
 * ```ts
 * const genero: BookGenre = 'Novela';
 * ```
 */
export type BookGenre =
  | 'Novela'
  | 'Cuento'
  | 'Poesía'
  | 'Ensayo'
  | 'Ciencia Ficción';
