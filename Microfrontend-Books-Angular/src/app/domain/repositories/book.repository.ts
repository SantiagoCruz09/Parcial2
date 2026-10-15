import { Observable } from 'rxjs';
import { Book } from '../models/book.model';

/**
 * Contrato (puerto) de acceso a libros.
 *
 * @remarks
 * Define la abstracción que la capa de aplicación utiliza para
 * obtener libros, sin conocer los detalles de infraestructura.
 * Cualquier fuente de datos (HTTP, mock, almacenamiento local)
 * debe implementar este contrato, siguiendo el principio de
 * inversión de dependencias de la Arquitectura Limpia.
 */
export abstract class BookRepository {
  /**
   * Obtiene un listado de libros.
   *
   * @param count Cantidad de libros a obtener
   * @returns Observable con el arreglo de libros
   */
  /** Consulta el listado de libros. */
  abstract getBooks(count: number): Observable<Book[]>;
  /** Consulta libros filtrados por género. */
  abstract getBooksByGenre(genre: string, count: number): Observable<Book[]>;
  /** Consulta un libro por identificador. */
  abstract getBookById(id: number): Observable<Book>;
  /** Consulta libros relacionados con un título. */
  abstract searchBooks(title: string, count: number): Observable<Book[]>;
}
