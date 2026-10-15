import { faker } from '@faker-js/faker';
import { CustomError } from '../../../domain/erros/custom.error';
import { Loan, LoanStatus } from '../../../domain/interfaces/loan.interface';

/**
 * Servicio encargado de la generación y gestión de préstamos.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar préstamos
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class LoansService {

  /**
   * Estados disponibles para los préstamos.
   */
  private statuses: LoanStatus[] = ['Activo', 'Devuelto', 'Vencido'];

  /**
   * Obtiene un listado de préstamos generados dinámicamente.
   *
   * @param countLoans Cantidad de préstamos a generar
   * @returns Promesa que resuelve un arreglo de préstamos
   */
  public async getAllLoans(countLoans: number): Promise<Loan[]> {
    const loans: Promise<Loan>[] = [];

    for (let i = 1; i <= countLoans; i++) {
      loans.push(this.generateLoan(i));
    }

    return Promise.all(loans);
  }

  /**
   * Obtiene un préstamo por su identificador.
   *
   * @param id Identificador único del préstamo
   * @returns Promesa que resuelve el préstamo solicitado
   * @throws CustomError si el id no es un entero positivo
   */
  public async getLoanById(id: number): Promise<Loan> {
    if (!Number.isInteger(id) || id < 1) {
      throw CustomError.badRequest('El id debe ser un número entero positivo');
    }

    return this.generateLoan(id);
  }

  /**
   * Obtiene un listado de préstamos de un estado específico.
   *
   * @param status Estado del préstamo solicitado
   * @param countLoans Cantidad de préstamos a generar
   * @returns Promesa que resuelve un arreglo de préstamos del estado indicado
   * @throws CustomError si el estado no es válido o la cantidad es inválida
   */
  public async getLoansByStatus(status: string, countLoans: number): Promise<Loan[]> {
    if (!this.isStatus(status)) {
      throw CustomError.badRequest(
        `Estado inválido. Estados válidos: ${this.statuses.join(', ')}`
      );
    }

    if (!Number.isInteger(countLoans) || countLoans < 1) {
      throw CustomError.badRequest('La cantidad debe ser un número entero positivo');
    }

    const loans: Promise<Loan>[] = [];

    for (let i = 1; i <= countLoans; i++) {
      loans.push(this.generateLoan(i, status));
    }

    return Promise.all(loans);
  }

  /**
   * Verifica si un valor corresponde a un estado válido.
   *
   * @param value Valor a verificar
   * @returns `true` si el valor es un estado válido
   */
  private isStatus(value: string): value is LoanStatus {
    return (this.statuses as string[]).includes(value);
  }

  /**
   * Genera un préstamo ficticio.
   *
   * @param id Identificador único del préstamo
   * @param status Estado del préstamo; si se omite, se elige aleatoriamente
   * @returns Promesa que resuelve un préstamo generado
   */
  private generateLoan(id: number, status?: LoanStatus): Promise<Loan> {
    const loanDate = faker.date.past({ years: 1 });

    return Promise.resolve({
      id,
      bookTitle: faker.commerce.productName(),
      userName: `${faker.person.firstName()} ${faker.person.lastName()}`,
      loanDate: loanDate.toISOString().split('T')[0] as string,
      returnDate: faker.date
        .soon({ days: 30, refDate: loanDate })
        .toISOString()
        .split('T')[0] as string,
      status: status ?? faker.helpers.arrayElement(this.statuses),
    });
  }
}
