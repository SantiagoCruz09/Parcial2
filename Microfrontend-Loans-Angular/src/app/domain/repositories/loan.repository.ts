import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

/**
 * Contrato (puerto) de acceso a préstamos.
 *
 * @remarks
 * Define la abstracción que la capa de aplicación utiliza para
 * obtener préstamos, sin conocer los detalles de infraestructura.
 * Cualquier fuente de datos (HTTP, mock, almacenamiento local)
 * debe implementar este contrato, siguiendo el principio de
 * inversión de dependencias de la Arquitectura Limpia.
 */
export abstract class LoanRepository {
  /**
   * Obtiene un listado de préstamos.
   *
   * @param count Cantidad de préstamos a obtener
   * @returns Observable con el arreglo de préstamos
   */
  /** Consulta el listado de préstamos. */
  abstract getLoans(count: number): Observable<Loan[]>;
  /** Consulta préstamos filtrados por estado. */
  abstract getLoansByStatus(status: string, count: number): Observable<Loan[]>;
  /** Consulta un préstamo por identificador. */
  abstract getLoanById(id: number): Observable<Loan>;
  /** Consulta préstamos relacionados con un usuario. */
  abstract searchLoans(userName: string, count: number): Observable<Loan[]>;
}
