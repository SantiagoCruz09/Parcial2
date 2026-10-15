import { Injectable } from '@angular/core';
import { Author, NationalityFilter } from '../../domain/models/author.model';

/**
 * Caso de uso: filtrar autores por nacionalidad.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de autores según
 * la nacionalidad seleccionada. El valor `'all'` desactiva el filtro.
 */
@Injectable()
export class FilterAuthorsByNationalityUseCase {
  /**
   * Ejecuta el caso de uso.
   *
   * @param authors Listado de autores a filtrar
   * @param nationality Nacionalidad por la que filtrar o `'all'` para todas
   * @returns Nuevo arreglo con los autores que cumplen el criterio
   */
  execute(authors: Author[], nationality: NationalityFilter): Author[] {
    if (nationality === 'all') {
      return authors;
    }
    return authors.filter((author) => author.nationality === nationality);
  }
}
