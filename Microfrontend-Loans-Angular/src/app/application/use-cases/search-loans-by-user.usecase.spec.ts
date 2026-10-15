import { Loan } from '../../../domain/models/loan.model';
import { SearchLoansByUserUseCase } from './search-loans-by-user.usecase';

/**
 * Pruebas del caso de uso "buscar préstamos por usuario".
 */
describe('SearchLoansByUserUseCase', () => {
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

  const useCase = new SearchLoansByUserUseCase();

  it('retorna todos los préstamos cuando el término está vacío', () => {
    expect(useCase.execute(loans, '   ')).toEqual(loans);
  });

  it('busca sin distinguir mayúsculas y minúsculas', () => {
    const result = useCase.execute(loans, 'ANA');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('retorna un arreglo vacío si no hay coincidencias', () => {
    expect(useCase.execute(loans, 'inexistente')).toEqual([]);
  });

  it('consulta el repositorio para la búsqueda remota', () => {
    const repository = {
      getLoans: jest.fn().mockReturnValue([]),
      getLoansByStatus: jest.fn().mockReturnValue([]),
      getLoanById: jest.fn().mockReturnValue([]),
      searchLoans: jest.fn().mockReturnValue([]),
    };
    const remoteUseCase = new SearchLoansByUserUseCase(repository);

    remoteUseCase.execute('Ana', 3);

    expect(repository.searchLoans).toHaveBeenCalledWith('Ana', 3);
  });

  it('rechaza la búsqueda remota sin repositorio', () => {
    expect(() => useCase.execute('Ana', 3)).toThrow(
      'LoanRepository is required for HTTP searching'
    );
  });
});
