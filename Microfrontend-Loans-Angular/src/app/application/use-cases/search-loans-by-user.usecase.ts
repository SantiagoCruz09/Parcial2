import { Injectable } from '@angular/core';
import { Loan } from '../../domain/models/loan.model';

/**
 * Caso de uso: buscar préstamos por usuario.
 *
 * @remarks
 * Regla de negocio pura que filtra una colección de préstamos por
 * coincidencia parcial (sin distinguir mayúsculas) en el nombre del
 * usuario. Un término vacío desactiva la búsqueda.
 */
@Injectable()
export class SearchLoansByUserUseCase {
  /**
   * Ejecuta el caso de uso.
   *
   * @param loans Listado de préstamos sobre el que buscar
   * @param term Término de búsqueda
   * @returns Nuevo arreglo con los préstamos que coinciden
   */
  execute(loans: Loan[], term: string): Loan[] {
    const query = term.trim().toLowerCase();
    if (!query) {
      return loans;
    }
    return loans.filter((loan) =>
      loan.userName.toLowerCase().includes(query)
    );
  }
}
