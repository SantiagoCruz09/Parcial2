import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

/**
 * Caso de uso: consultar el detalle de un autor.
 */
export class GetAuthorByIdUseCase {
  /**
   * Crea el caso de uso con el puerto de autores.
   *
   * @param repository Puerto de acceso a autores
   */
  constructor(private readonly repository: AuthorRepository) {}

  /**
   * Ejecuta la consulta de detalle.
   *
   * @param id Identificador del autor
   * @returns Observable con el autor solicitado
   */
  execute(id: number): Observable<Author> {
    return this.repository.getAuthorById(id);
  }
}
