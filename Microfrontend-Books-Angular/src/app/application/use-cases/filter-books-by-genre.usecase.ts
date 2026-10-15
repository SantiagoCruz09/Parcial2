import { Injectable } from '@angular/core';
import { Book, BookGenreFilter } from '../../domain/models/book.model';

/**
 * Caso de uso: filtrar libros por género.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de libros según
 * el género seleccionado. El valor `'all'` desactiva el filtro.
 */
@Injectable()
export class FilterBooksByGenreUseCase {
  /**
   * Ejecuta el caso de uso.
   *
   * @param books Listado de libros a filtrar
   * @param genre Género por el que filtrar o `'all'` para todos
   * @returns Nuevo arreglo con los libros que cumplen el criterio
   */
  execute(books: Book[], genre: BookGenreFilter): Book[] {
    if (genre === 'all') {
      return books;
    }
    return books.filter((book) => book.genre === genre);
  }
}
