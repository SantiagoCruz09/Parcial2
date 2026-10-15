import { Loan, LoanStatus } from "../interfaces/loan.interface";

export interface LoanRepository {
  findAll(count: number): Promise<Loan[]>;
  findById(id: number): Promise<Loan>;
  findByStatus(status: LoanStatus, count: number): Promise<Loan[]>;
}
