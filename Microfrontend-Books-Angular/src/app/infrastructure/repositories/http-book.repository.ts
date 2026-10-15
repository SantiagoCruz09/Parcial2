import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';
import { API_CONFIG } from '../config/api.config';

/**
 * Implementación del repositorio de libros basada en HTTP.
 *
 * @remarks
 * Adapta el contrato de dominio `BookRepository` a la API REST
 * expuesta por el microservicio Books (Node.js) en
 * `GET /api/books/{count}`.
 */
@Injectable()
export class HttpBookRepository extends BookRepository {
  /**
   * @param http Cliente HTTP de Angular
   */
  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Obtiene un listado de libros desde el microservicio.
   *
   * @param count Cantidad de libros a obtener
   * @returns Observable con el arreglo de libros
   */
  override getBooks(count: number): Observable<Book[]> {
    return this.http.get<Book[]>(
      `${API_CONFIG.booksApiUrl}/api/books/${count}`
    );
  }
}
