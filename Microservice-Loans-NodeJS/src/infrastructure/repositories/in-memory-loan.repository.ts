import { faker } from "@faker-js/faker";
import { LoanEntity } from "../../domain/entities/loan.entity";
import { Loan, LoanStatus } from "../../domain/interfaces/loan.interface";
import { LoanRepository } from "../../domain/repositories/loan.repository";

const statuses: LoanStatus[] = ["Activo", "Devuelto", "Vencido"];

export class InMemoryLoanRepository implements LoanRepository {
  private readonly loans = new Map<number, Loan>();

  async findAll(count: number): Promise<Loan[]> {
    return Array.from({ length: count }, (_, index) => this.getOrCreate(index + 1));
  }

  async findById(id: number): Promise<Loan> {
    return this.getOrCreate(id);
  }

  async findByStatus(status: LoanStatus, count: number): Promise<Loan[]> {
    return Array.from({ length: count }, (_, index) => this.getOrCreate(index + 1, status));
  }

  private getOrCreate(id: number, status?: LoanStatus): Loan {
    const existingLoan = this.loans.get(id);
    if (existingLoan) {
      if (status) {
        const filteredLoan = new LoanEntity(
          existingLoan.id,
          existingLoan.bookTitle,
          existingLoan.userName,
          existingLoan.loanDate,
          existingLoan.returnDate,
          status,
        );
        this.loans.set(id, filteredLoan);
        return filteredLoan;
      }
      return existingLoan;
    }

    const loanDate = faker.date.past({ years: 1 });
    const loan = new LoanEntity(
      id,
      faker.commerce.productName(),
      `${faker.person.firstName()} ${faker.person.lastName()}`,
      loanDate.toISOString().split("T")[0] as string,
      faker.date.soon({ days: 30, refDate: loanDate }).toISOString().split("T")[0] as string,
      status ?? faker.helpers.arrayElement(statuses),
    );
    this.loans.set(id, loan);
    return loan;
  }
}
