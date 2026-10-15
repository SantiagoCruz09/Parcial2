import { Injectable } from '@angular/core';
import { Book } from '../../domain/models/book.model';

/**
 * Caso de uso: buscar libros por título.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de libros por
 * coincidencia parcial (sin distinguir mayúsculas) en el título.
 * Un término vacío desactiva la búsqueda.
 */
@Injectable()
export class SearchBooksByTitleUseCase {
  /**
   * Ejecuta el caso de uso.
   *
   * @param books Listado de libros sobre el que buscar
   * @param term Término de búsqueda
   * @returns Nuevo arreglo con los libros que coinciden
   */
  execute(books: Book[], term: string): Book[] {
    const query = term.trim().toLowerCase();
    if (!query) {
      return books;
    }
    return books.filter((book) => book.title.toLowerCase().includes(query));
  }
}
