import { Observable } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';

/**
 * Caso de uso: consultar el detalle de un préstamo.
 */
export class GetLoanByIdUseCase {
  /**
   * Crea el caso de uso con el puerto de préstamos.
   *
   * @param repository Puerto de acceso a préstamos
   */
  constructor(private readonly repository: LoanRepository) {}

  /**
   * Ejecuta la consulta de detalle.
   *
   * @param id Identificador del préstamo
   * @returns Observable con el préstamo solicitado
   */
  execute(id: number): Observable<Loan> {
    return this.repository.getLoanById(id);
  }
}
