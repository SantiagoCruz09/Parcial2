import { Loan } from '../../../domain/models/loan.model';
import { FilterLoansByStatusUseCase } from './filter-loans-by-status.usecase';

/**
 * Pruebas del caso de uso "filtrar préstamos por estado".
 */
describe('FilterLoansByStatusUseCase', () => {
  const loans: Loan[] = [
    {
      id: 1,
      bookTitle: 'El Quijote',
      userName: 'Ana Torres',
      loanDate: '2024-05-01',
      returnDate: '2024-05-15',
      status: 'Activo',
    },
    {
      id: 2,
      bookTitle: 'La Odisea',
      userName: 'Luis Pérez',
      loanDate: '2024-03-01',
      returnDate: '2024-03-15',
      status: 'Devuelto',
    },
  ];

  const useCase = new FilterLoansByStatusUseCase();

  it('retorna todos los préstamos cuando el filtro es "all"', () => {
    expect(useCase.execute(loans, 'all')).toEqual(loans);
  });

  it('filtra los préstamos por el estado indicado', () => {
    const result = useCase.execute(loans, 'Activo');
    expect(result).toHaveLength(1);
    expect(result[0].status).toBe('Activo');
  });

  it('retorna un arreglo vacío si no hay coincidencias', () => {
    expect(useCase.execute(loans, 'Vencido')).toEqual([]);
  });
});
