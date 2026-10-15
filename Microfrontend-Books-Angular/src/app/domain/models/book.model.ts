/**
 * Modelo de dominio que representa un libro del catálogo.
 *
 * @remarks
 * Este modelo es la representación de negocio de un libro dentro
 * del microfrontend de Books. No depende de ninguna tecnología
 * externa (HTTP, framework, etc.), lo que mantiene el núcleo
 * desacoplado de la infraestructura.
 *
 * @example
 * ```ts
 * const libro: Book = {
 *   id: 1,
 *   title: 'Cien años de soledad',
 *   author: 'Gabriel García Márquez',
 *   genre: 'Novela',
 *   year: 1967,
 *   price: 45000,
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
 * Géneros literarios soportados por el dominio.
 *
 * @remarks
 * Restringe los géneros a un conjunto cerrado de valores válidos,
 * evitando cadenas arbitrarias provenientes de la infraestructura.
 */
export type BookGenre =
  | 'Novela'
  | 'Cuento'
  | 'Poesía'
  | 'Ensayo'
  | 'Ciencia Ficción';

/**
 * Lista de géneros disponibles para filtros de la interfaz.
 */
export const BOOK_GENRES: readonly BookGenre[] = [
  'Novela',
  'Cuento',
  'Poesía',
  'Ensayo',
  'Ciencia Ficción',
] as const;

/**
 * Valor especial de filtro que representa "todos los géneros".
 */
export type BookGenreFilter = BookGenre | 'all';
