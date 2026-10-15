import { Observable } from 'rxjs';
import { Author, NationalityFilter } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';

/**
 * Caso de uso: filtrar autores por nacionalidad.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de autores según
 * la nacionalidad seleccionada. El valor `'all'` desactiva el filtro.
 */
export class FilterAuthorsByNationalityUseCase {
  /** Crea el caso de uso con el repositorio opcional para consultas HTTP. */
  constructor(private readonly repository?: AuthorRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param authors Listado de autores a filtrar
   * @param nationality Nacionalidad por la que filtrar o `'all'` para todas
   * @returns Nuevo arreglo con los autores que cumplen el criterio
   */
  /** Filtra en memoria una colección de autores. */
  execute(authors: Author[], nationality: NationalityFilter): Author[];
  /** Consulta al servicio los autores de una nacionalidad. */
  execute(nationality: NationalityFilter, count: number): Observable<Author[]>;
  /** Ejecuta la variante local o remota según los argumentos recibidos. */
  execute(
    authorsOrNationality: Author[] | NationalityFilter,
    nationalityOrCount: NationalityFilter | number
  ): Author[] | Observable<Author[]> {
    if (!Array.isArray(authorsOrNationality)) {
      if (!this.repository) throw new Error('AuthorRepository is required for HTTP filtering');
      return authorsOrNationality === 'all'
        ? this.repository.getAuthors(nationalityOrCount as number)
        : this.repository.getAuthorsByNationality(authorsOrNationality, nationalityOrCount as number);
    }
    const authors = authorsOrNationality;
    const nationality = nationalityOrCount as NationalityFilter;
    if (nationality === 'all') {
      return authors;
    }
    return authors.filter((author) => author.nationality === nationality);
  }
}
