import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { API_CONFIG } from '../config/api.config';

/**
 * Implementación del repositorio de autores basada en HTTP.
 *
 * @remarks
 * Adapta el contrato de dominio `AuthorRepository` a la API REST
 * expuesta por el microservicio Authors (Spring Boot) en
 * `GET /api/authors/{count}`.
 */
@Injectable()
export class HttpAuthorRepository extends AuthorRepository {
  /**
   * @param http Cliente HTTP de Angular
   */
  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Obtiene un listado de autores desde el microservicio.
   *
   * @param count Cantidad de autores a obtener
   * @returns Observable con el arreglo de autores
   */
  override getAuthors(count: number): Observable<Author[]> {
    return this.http.get<Author[]>(
      `${API_CONFIG.authorsApiUrl}/api/authors/${count}`
    );
  }

  override getAuthorsByNationality(
    nationality: string,
    count: number
  ): Observable<Author[]> {
    return this.http.get<Author[]>(
      `${API_CONFIG.authorsApiUrl}/api/authors/nationality/${encodeURIComponent(nationality)}/${count}`
    );
  }

  override getAuthorById(id: number): Observable<Author> {
    return this.http.get<Author>(`${API_CONFIG.authorsApiUrl}/api/authors/detail/${id}`);
  }

  override searchAuthors(name: string, count: number): Observable<Author[]> {
    return this.getAuthors(count).pipe(
      map((authors) => {
        const query = name.trim().toLowerCase();
        return query ? authors.filter((author) => author.name.toLowerCase().includes(query)) : authors;
      })
    );
  }
}
