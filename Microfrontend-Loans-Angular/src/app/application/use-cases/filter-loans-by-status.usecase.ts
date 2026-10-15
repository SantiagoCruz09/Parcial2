import { Injectable } from '@angular/core';
import { Loan, LoanStatusFilter } from '../../domain/models/loan.model';

/**
 * Caso de uso: filtrar préstamos por estado.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de préstamos según
 * el estado seleccionado. El valor `'all'` desactiva el filtro.
 */
@Injectable()
export class FilterLoansByStatusUseCase {
  /**
   * Ejecuta el caso de uso.
   *
   * @param loans Listado de préstamos a filtrar
   * @param status Estado por el que filtrar o `'all'` para todos
   * @returns Nuevo arreglo con los préstamos que cumplen el criterio
   */
  execute(loans: Loan[], status: LoanStatusFilter): Loan[] {
    if (status === 'all') {
      return loans;
    }
    return loans.filter((loan) => loan.status === status);
  }
}
