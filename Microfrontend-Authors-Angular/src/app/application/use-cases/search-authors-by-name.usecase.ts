import { Observable } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

/**
 * Caso de uso: buscar autores por nombre.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de autores por
 * coincidencia parcial (sin distinguir mayúsculas) en el nombre.
 * Un término vacío desactiva la búsqueda.
 */
export class SearchAuthorsByNameUseCase {
  /** Crea el caso de uso con el repositorio opcional para consultas HTTP. */
  constructor(private readonly repository?: AuthorRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param authors Listado de autores sobre el que buscar
   * @param term Término de búsqueda
   * @returns Nuevo arreglo con los autores que coinciden
   */
  /** Busca en memoria por nombre. */
  execute(authors: Author[], term: string): Author[];
  /** Consulta al servicio autores relacionados con un nombre. */
  execute(term: string, count: number): Observable<Author[]>;
  /** Ejecuta la variante local o remota según los argumentos recibidos. */
  execute(
    authorsOrTerm: Author[] | string,
    termOrCount: string | number
  ): Author[] | Observable<Author[]> {
    if (typeof authorsOrTerm === 'string') {
      if (!this.repository) throw new Error('AuthorRepository is required for HTTP searching');
      return this.repository.searchAuthors(authorsOrTerm, termOrCount as number);
    }
    const authors = authorsOrTerm;
    const term = termOrCount as string;
    const query = term.trim().toLowerCase();
    if (!query) {
      return authors;
    }
    return authors.filter((author) => author.name.toLowerCase().includes(query));
  }
}
