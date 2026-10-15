import { Observable } from 'rxjs';
import { Author } from '../models/author.model';

/**
 * Contrato (puerto) de acceso a autores.
 *
 * @remarks
 * Define la abstracción que la capa de aplicación utiliza para
 * obtener autores, sin conocer los detalles de infraestructura.
 * Cualquier fuente de datos (HTTP, mock, almacenamiento local)
 * debe implementar este contrato, siguiendo el principio de
 * inversión de dependencias de la Arquitectura Limpia.
 */
export abstract class AuthorRepository {
  /**
   * Obtiene un listado de autores.
   *
   * @param count Cantidad de autores a obtener
   * @returns Observable con el arreglo de autores
   */
  abstract getAuthors(count: number): Observable<Author[]>;
  abstract getAuthorsByNationality(
    nationality: string,
    count: number
  ): Observable<Author[]>;
  abstract getAuthorById(id: number): Observable<Author>;
  abstract searchAuthors(name: string, count: number): Observable<Author[]>;
}
