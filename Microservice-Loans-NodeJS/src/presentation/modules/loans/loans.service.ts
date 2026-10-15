import { faker } from '@faker-js/faker';
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
   * Genera un préstamo ficticio.
   *
   * @param id Identificador único del préstamo
   * @returns Promesa que resuelve un préstamo generado
   */
  private generateLoan(id: number): Promise<Loan> {
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
      status: faker.helpers.arrayElement(this.statuses),
    });
  }
}
