import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';

/**
 * Caso de uso: obtener préstamos del catálogo.
 *
 * @remarks
 * Orquesta la obtención de préstamos delegando en el contrato
 * `LoanRepository`, manteniendo la capa de aplicación
 * independiente de la infraestructura.
 */
@Injectable()
export class GetLoansUseCase {
  /**
   * @param repository Puerto de acceso a préstamos
   */
  constructor(private readonly repository: LoanRepository) {}

  /**
   * Ejecuta el caso de uso.
   *
   * @param count Cantidad de préstamos a obtener
   * @returns Observable con el arreglo de préstamos
   */
  execute(count: number): Observable<Loan[]> {
    return this.repository.getLoans(count);
  }
}
