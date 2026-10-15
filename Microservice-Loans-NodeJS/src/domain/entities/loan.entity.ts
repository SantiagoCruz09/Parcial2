import { Loan, LoanStatus } from "../interfaces/loan.interface";

export class LoanEntity implements Loan {
  constructor(
    public readonly id: number,
    public readonly bookTitle: string,
    public readonly userName: string,
    public readonly loanDate: string,
    public readonly returnDate: string,
    public readonly status: LoanStatus,
  ) {}
}
