import { CustomError } from "../../domain/erros/custom.error";
import { Loan } from "../../domain/interfaces/loan.interface";
import { LoanRepository } from "../../domain/repositories/loan.repository";

export class GetAllLoansUseCase {
  constructor(private readonly repository: LoanRepository) {}

  execute(count: number): Promise<Loan[]> {
    if (!Number.isInteger(count) || count < 1) {
      return Promise.reject(CustomError.badRequest("La cantidad debe ser un número entero positivo"));
    }
    return this.repository.findAll(count);
  }
}
