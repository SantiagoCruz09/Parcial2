import { Observable } from 'rxjs';
import { Loan, LoanStatusFilter } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';

/**
 * Caso de uso: filtrar préstamos por estado.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de préstamos según
 * el estado seleccionado. El valor `'all'` desactiva el filtro.
 */
export class FilterLoansByStatusUseCase {
  constructor(private readonly repository?: LoanRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param loans Listado de préstamos a filtrar
   * @param status Estado por el que filtrar o `'all'` para todos
   * @returns Nuevo arreglo con los préstamos que cumplen el criterio
   */
  execute(loans: Loan[], status: LoanStatusFilter): Loan[];
  execute(status: LoanStatusFilter, count: number): Observable<Loan[]>;
  execute(
    loansOrStatus: Loan[] | LoanStatusFilter,
    statusOrCount: LoanStatusFilter | number
  ): Loan[] | Observable<Loan[]> {
    if (!Array.isArray(loansOrStatus)) {
      if (!this.repository) throw new Error('LoanRepository is required for HTTP filtering');
      return loansOrStatus === 'all'
        ? this.repository.getLoans(statusOrCount as number)
        : this.repository.getLoansByStatus(loansOrStatus, statusOrCount as number);
    }
    const loans = loansOrStatus;
    const status = statusOrCount as LoanStatusFilter;
    if (status === 'all') {
      return loans;
    }
    return loans.filter((loan) => loan.status === status);
  }
}
