import { Injectable } from '@angular/core';
import { Author } from '../../domain/models/author.model';

/**
 * Caso de uso: buscar autores por nombre.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de autores por
 * coincidencia parcial (sin distinguir mayúsculas) en el nombre.
 * Un término vacío desactiva la búsqueda.
 */
@Injectable()
export class SearchAuthorsByNameUseCase {
  /**
   * Ejecuta el caso de uso.
   *
   * @param authors Listado de autores sobre el que buscar
   * @param term Término de búsqueda
   * @returns Nuevo arreglo con los autores que coinciden
   */
  execute(authors: Author[], term: string): Author[] {
    const query = term.trim().toLowerCase();
    if (!query) {
      return authors;
    }
    return authors.filter((author) => author.name.toLowerCase().includes(query));
  }
}
