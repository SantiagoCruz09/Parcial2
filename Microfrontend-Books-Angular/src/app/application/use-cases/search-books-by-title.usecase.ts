import { Observable } from 'rxjs';
import { Book } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';

/**
 * Caso de uso: buscar libros por título.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de libros por
 * coincidencia parcial (sin distinguir mayúsculas) en el título.
 * Un término vacío desactiva la búsqueda.
 */
export class SearchBooksByTitleUseCase {
  /** Crea el caso de uso con el repositorio opcional para consultas HTTP. */
  constructor(private readonly repository?: BookRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param books Listado de libros sobre el que buscar
   * @param term Término de búsqueda
   * @returns Nuevo arreglo con los libros que coinciden
   */
  /** Busca en memoria por título. */
  execute(books: Book[], term: string): Book[];
  /** Consulta al servicio libros relacionados con un título. */
  execute(term: string, count: number): Observable<Book[]>;
  /** Ejecuta la variante local o remota según los argumentos recibidos. */
  execute(
    booksOrTerm: Book[] | string,
    termOrCount: string | number
  ): Book[] | Observable<Book[]> {
    if (typeof booksOrTerm === 'string') {
      if (!this.repository) throw new Error('BookRepository is required for HTTP searching');
      return this.repository.searchBooks(booksOrTerm, termOrCount as number);
    }
    const books = booksOrTerm;
    const term = termOrCount as string;
    const query = term.trim().toLowerCase();
    if (!query) {
      return books;
    }
    return books.filter((book) => book.title.toLowerCase().includes(query));
  }
}
