import { Observable } from 'rxjs';
import { Book } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';

/**
 * Caso de uso: obtener libros del catálogo.
 *
 * @remarks
 * Orquesta la obtención de libros delegando en el contrato
 * `BookRepository`, manteniendo la capa de aplicación
 * independiente de la infraestructura.
 */
export class GetBooksUseCase {
  /**
   * Inicializa el caso de uso.
   *
   * @param repository Puerto de acceso a libros
   */
  constructor(private readonly repository: BookRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param count Cantidad de libros a obtener
   * @returns Observable con el arreglo de libros
   */
  execute(count: number): Observable<Book[]> {
    return this.repository.getBooks(count);
  }
}
