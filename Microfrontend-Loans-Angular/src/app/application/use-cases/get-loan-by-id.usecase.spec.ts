import { of } from 'rxjs';
import { Loan } from '../../domain/models/loan.model';
import { LoanRepository } from '../../domain/repositories/loan.repository';
import { GetLoanByIdUseCase } from './get-loan-by-id.usecase';

describe('GetLoanByIdUseCase', () => {
  it('consulta un préstamo por id en el repositorio', () => {
    const loan: Loan = {
      id: 1, bookTitle: 'Libro', userName: 'Ana Torres',
      status: 'Activo', loanDate: '2026-01-01', returnDate: '2026-01-10',
    };
    const repository: LoanRepository = {
      getLoans: jest.fn(),
      getLoansByStatus: jest.fn(),
      getLoanById: jest.fn().mockReturnValue(of(loan)),
    };
    const useCase = new GetLoanByIdUseCase(repository);

    useCase.execute(1).subscribe((result) => expect(result).toEqual(loan));

    expect(repository.getLoanById).toHaveBeenCalledWith(1);
  });
});
