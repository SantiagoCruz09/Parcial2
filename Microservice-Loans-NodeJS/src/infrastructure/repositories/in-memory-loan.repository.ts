import { faker } from "@faker-js/faker";
import { LoanEntity } from "../../domain/entities/loan.entity";
import { Loan, LoanStatus } from "../../domain/interfaces/loan.interface";
import { LoanRepository } from "../../domain/repositories/loan.repository";

const statuses: LoanStatus[] = ["Activo", "Devuelto", "Vencido"];

export class InMemoryLoanRepository implements LoanRepository {
  async findAll(count: number): Promise<Loan[]> {
    return Array.from({ length: count }, (_, index) => this.generate(index + 1));
  }

  async findById(id: number): Promise<Loan> {
    return this.generate(id);
  }

  async findByStatus(status: LoanStatus, count: number): Promise<Loan[]> {
    return Array.from({ length: count }, (_, index) => this.generate(index + 1, status));
  }

  private generate(id: number, status?: LoanStatus): Loan {
    const loanDate = faker.date.past({ years: 1 });
    return new LoanEntity(
      id,
      faker.commerce.productName(),
      `${faker.person.firstName()} ${faker.person.lastName()}`,
      loanDate.toISOString().split("T")[0] as string,
      faker.date.soon({ days: 30, refDate: loanDate }).toISOString().split("T")[0] as string,
      status ?? faker.helpers.arrayElement(statuses),
    );
  }
}
