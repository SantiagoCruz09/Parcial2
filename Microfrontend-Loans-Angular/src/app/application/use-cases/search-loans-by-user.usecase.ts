import { Observable } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';

/**
 * Caso de uso: buscar préstamos por usuario.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de préstamos por
 * coincidencia parcial (sin distinguir mayúsculas) en el nombre del
 * usuario. Un término vacío desactiva la búsqueda.
 */
export class SearchLoansByUserUseCase {
  constructor(private readonly repository?: LoanRepository) {}
  /**
   * Ejecuta el caso de uso.
   *
   * @param loans Listado de préstamos sobre el que buscar
   * @param term Término de búsqueda
   * @returns Nuevo arreglo con los préstamos que coinciden
   */
  execute(loans: Loan[], term: string): Loan[];
  execute(term: string, count: number): Observable<Loan[]>;
  execute(
    loansOrTerm: Loan[] | string,
    termOrCount: string | number
  ): Loan[] | Observable<Loan[]> {
    if (typeof loansOrTerm === 'string') {
      if (!this.repository) throw new Error('LoanRepository is required for HTTP searching');
      return this.repository.searchLoans(loansOrTerm, termOrCount as number);
    }
    const loans = loansOrTerm;
    const term = termOrCount as string;
    const query = term.trim().toLowerCase();
    if (!query) {
      return loans;
    }
    return loans.filter((loan) =>
      loan.userName.toLowerCase().includes(query)
    );
  }
}
