import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';
import { API_CONFIG } from '../config/api.config';

/**
 * Implementación del repositorio de préstamos basada en HTTP.
 *
 * @remarks
 * Adapta el contrato de dominio `LoanRepository` a la API REST
 * expuesta por el microservicio Loans (Node.js) en
 * `GET /api/loans/{count}`.
 */
@Injectable()
export class HttpLoanRepository extends LoanRepository {
  /**
   * Inicializa el adaptador HTTP.
   *
   * @param http Cliente HTTP de Angular
   */
  constructor(private readonly http: HttpClient) {
    super();
  }

  /**
   * Obtiene un listado de préstamos desde el microservicio.
   *
   * @param count Cantidad de préstamos a obtener
   * @returns Observable con el arreglo de préstamos
   */
  override getLoans(count: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(
      `${API_CONFIG.loansApiUrl}/api/loans/${count}`
    );
  }

  /** Consulta préstamos filtrados por estado. */
  override getLoansByStatus(status: string, count: number): Observable<Loan[]> {
    return this.http.get<Loan[]>(
      `${API_CONFIG.loansApiUrl}/api/loans/status/${encodeURIComponent(status)}/${count}`
    );
  }

  /** Consulta un préstamo por identificador. */
  override getLoanById(id: number): Observable<Loan> {
    return this.http.get<Loan>(`${API_CONFIG.loansApiUrl}/api/loans/detail/${id}`);
  }

  /** Consulta préstamos relacionados con un usuario. */
  override searchLoans(userName: string, count: number): Observable<Loan[]> {
    return this.getLoans(count).pipe(
      map((loans) => {
        const query = userName.trim().toLowerCase();
        return query ? loans.filter((loan) => loan.userName.toLowerCase().includes(query)) : loans;
      })
    );
  }
}
