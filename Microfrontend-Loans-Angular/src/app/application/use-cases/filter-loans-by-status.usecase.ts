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
  /** Crea el caso de uso con el repositorio opcional para consultas HTTP. */
  constructor(private readonly repository?: LoanRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param loans Listado de préstamos a filtrar
   * @param status Estado por el que filtrar o `'all'` para todos
   * @returns Nuevo arreglo con los préstamos que cumplen el criterio
   */
  /** Filtra en memoria una colección de préstamos. */
  execute(loans: Loan[], status: LoanStatusFilter): Loan[];
  /** Consulta al servicio los préstamos de un estado. */
  execute(status: LoanStatusFilter, count: number): Observable<Loan[]>;
  /** Ejecuta la variante local o remota según los argumentos recibidos. */
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
