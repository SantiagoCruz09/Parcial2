import { CustomError } from "../../domain/erros/custom.error";
import { Loan } from "../../domain/interfaces/loan.interface";
import { LoanRepository } from "../../domain/repositories/loan.repository";

export class GetLoanByIdUseCase {
  constructor(private readonly repository: LoanRepository) {}

  execute(id: number): Promise<Loan> {
    if (!Number.isInteger(id) || id < 1) {
      return Promise.reject(CustomError.badRequest("El id debe ser un número entero positivo"));
    }
    return this.repository.findById(id);
  }
}
