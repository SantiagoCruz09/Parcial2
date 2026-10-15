import { of } from 'rxjs';
import { Loan } from '../../../domain/models/loan.model';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { GetLoansUseCase } from './get-loans.usecase';

/**
 * Pruebas del caso de uso "obtener préstamos".
 */
describe('GetLoansUseCase', () => {
  const loans: Loan[] = [
    {
      id: 1,
      bookTitle: 'El Quijote',
      userName: 'Ana Torres',
      loanDate: '2024-05-01',
      returnDate: '2024-05-15',
      status: 'Activo',
    },
  ];

  let repository: { getLoans: jest.Mock };
  let useCase: GetLoansUseCase;

  beforeEach(() => {
    repository = { getLoans: jest.fn() };
    useCase = new GetLoansUseCase(repository as unknown as LoanRepository);
  });

  it('crea el caso de uso', () => {
    expect(useCase).toBeTruthy();
  });

  it('delega en el repositorio con la cantidad solicitada', (done) => {
    repository.getLoans.mockReturnValue(of(loans));

    useCase.execute(7).subscribe((result) => {
      expect(result).toEqual(loans);
      done();
    });

    expect(repository.getLoans).toHaveBeenCalledWith(7);
  });
});
