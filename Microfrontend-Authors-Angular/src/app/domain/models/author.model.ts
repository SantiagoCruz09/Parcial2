/**
 * Modelo de dominio que representa un autor del catálogo.
 *
 * @remarks
 * Este modelo es la representación de negocio de un autor dentro
 * del microfrontend de Authors. No depende de ninguna tecnología
 * externa (HTTP, framework, etc.), manteniendo el núcleo
 * desacoplado de la infraestructura.
 *
 * @example
 * ```ts
 * const autor: Author = {
 *   id: 1,
 *   name: 'Gabriel García Márquez',
 *   nationality: 'Colombiana',
 *   booksWritten: 25,
 * };
 * ```
 */
export interface Author {
  /** Identificador único del autor */
  id: number;

  /** Nombre completo del autor */
  name: string;

  /** Nacionalidad del autor */
  nationality: string;

  /** Cantidad de libros escritos */
  booksWritten: number;
}

/**
 * Valor especial de filtro que representa "todas las nacionalidades".
 */
export type NationalityFilter = string | 'all';
