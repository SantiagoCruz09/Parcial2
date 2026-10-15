import { Observable } from 'rxjs';
import { Book, BookGenreFilter } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';

/**
 * Caso de uso: filtrar libros por género.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de libros según
 * el género seleccionado. El valor `'all'` desactiva el filtro.
 */
export class FilterBooksByGenreUseCase {
  /** Crea el caso de uso con el repositorio opcional para consultas HTTP. */
  constructor(private readonly repository?: BookRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param books Listado de libros a filtrar
   * @param genre Género por el que filtrar o `'all'` para todos
   * @returns Nuevo arreglo con los libros que cumplen el criterio
   */
  /** Filtra en memoria una colección de libros. */
  execute(books: Book[], genre: BookGenreFilter): Book[];
  /** Consulta al servicio los libros de un género. */
  execute(genre: BookGenreFilter, count: number): Observable<Book[]>;
  /** Ejecuta la variante local o remota según los argumentos recibidos. */
  execute(
    booksOrGenre: Book[] | BookGenreFilter,
    genreOrCount: BookGenreFilter | number
  ): Book[] | Observable<Book[]> {
    if (!Array.isArray(booksOrGenre)) {
      if (!this.repository) throw new Error('BookRepository is required for HTTP filtering');
      return booksOrGenre === 'all'
        ? this.repository.getBooks(genreOrCount as number)
        : this.repository.getBooksByGenre(booksOrGenre, genreOrCount as number);
    }
    const books = booksOrGenre;
    const genre = genreOrCount as BookGenreFilter;
    if (genre === 'all') {
      return books;
    }
    return books.filter((book) => book.genre === genre);
  }
}
