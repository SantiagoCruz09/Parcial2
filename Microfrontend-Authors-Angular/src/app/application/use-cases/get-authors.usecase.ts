import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

/**
 * Caso de uso: obtener autores del catálogo.
 *
 * @remarks
 * Orquesta la obtención de autores delegando en el contrato
 * `AuthorRepository`, manteniendo la capa de aplicación
 * independiente de la infraestructura.
 */
@Injectable()
export class GetAuthorsUseCase {
  /**
   * @param repository Puerto de acceso a autores
   */
  constructor(private readonly repository: AuthorRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param count Cantidad de autores a obtener
   * @returns Observable con el arreglo de autores
   */
  execute(count: number): Observable<Author[]> {
    return this.repository.getAuthors(count);
  }
}
