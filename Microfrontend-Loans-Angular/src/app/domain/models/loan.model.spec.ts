import { Loan, LOAN_STATUSES } from './loan.model';

/**
 * Pruebas del modelo de dominio de préstamos.
 */
describe('Loan model', () => {
  it('expone los estados de préstamo soportados', () => {
    expect(LOAN_STATUSES).toEqual(['Activo', 'Devuelto', 'Vencido']);
  });

  it('permite construir un préstamo válido', () => {
    const loan: Loan = {
      id: 1,
      bookTitle: 'Cien años de soledad',
      userName: 'Ana Torres',
      loanDate: '2024-05-01',
      returnDate: '2024-05-15',
      status: 'Activo',
    };

    expect(loan.status).toBe('Activo');
    expect(loan.loanDate).toBe('2024-05-01');
  });
});
