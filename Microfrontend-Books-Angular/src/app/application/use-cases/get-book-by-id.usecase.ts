import { Observable } from 'rxjs';
import { Book } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';

/**
 * Caso de uso: consultar el detalle de un libro.
 */
export class GetBookByIdUseCase {
  /**
   * Crea el caso de uso con el puerto de libros.
   *
   * @param repository Puerto de acceso a libros
   */
  constructor(private readonly repository: BookRepository) {}

  /**
   * Ejecuta la consulta de detalle.
   *
   * @param id Identificador del libro
   * @returns Observable con el libro solicitado
   */
  execute(id: number): Observable<Book> {
    return this.repository.getBookById(id);
  }
}
