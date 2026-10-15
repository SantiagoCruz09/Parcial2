import { CustomError } from "../../domain/erros/custom.error";
import { Loan, LoanStatus } from "../../domain/interfaces/loan.interface";
import { LoanRepository } from "../../domain/repositories/loan.repository";

const statuses: LoanStatus[] = ["Activo", "Devuelto", "Vencido"];

export class GetLoansByStatusUseCase {
  constructor(private readonly repository: LoanRepository) {}

  execute(status: string, count: number): Promise<Loan[]> {
    if (!statuses.includes(status as LoanStatus)) {
      return Promise.reject(CustomError.badRequest(`Estado inválido. Estados válidos: ${statuses.join(", ")}`));
    }
    if (!Number.isInteger(count) || count < 1) {
      return Promise.reject(CustomError.badRequest("La cantidad debe ser un número entero positivo"));
    }
    return this.repository.findByStatus(status as LoanStatus, count);
  }
}
