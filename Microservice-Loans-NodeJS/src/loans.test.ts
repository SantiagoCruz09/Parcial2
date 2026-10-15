import request = require("supertest");
import { describe, expect, it } from "@jest/globals";
import { InMemoryLoanRepository } from "./infrastructure/repositories/in-memory-loan.repository";
import { GetAllLoansUseCase } from "./application/use-cases/get-all-loans.use-case";
import { GetLoanByIdUseCase } from "./application/use-cases/get-loan-by-id.use-case";
import { GetLoansByStatusUseCase } from "./application/use-cases/get-loans-by-status.use-case";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";

describe("Loans use cases", () => {
  const repository = new InMemoryLoanRepository();

  it("lists loans", async () => {
    await expect(new GetAllLoansUseCase(repository).execute(3)).resolves.toHaveLength(3);
  });

  it("filters loans by status", async () => {
    const loans = await new GetLoansByStatusUseCase(repository).execute("Activo", 2);
    expect(loans).toHaveLength(2);
    expect(loans.every((loan) => loan.status === "Activo")).toBe(true);
  });

  it("gets a loan by id", async () => {
    await expect(new GetLoanByIdUseCase(repository).execute(7)).resolves.toMatchObject({ id: 7 });
  });

  it("returns the same loan data from list and detail", async () => {
    const listedLoan = (await new GetAllLoansUseCase(repository).execute(1))[0]!;
    const detailedLoan = await new GetLoanByIdUseCase(repository).execute(listedLoan.id);
    expect(detailedLoan).toEqual(listedLoan);
  });
});

describe("Loans endpoints", () => {
  const app = new Server({ port: 0, publicPath: "public", routes: AppRoutes.routes }).app;

  it.each([
    ["/api/loans/3", 3],
    ["/api/loans/status/Activo/2", 2],
  ])("returns a list for %s", async (path, count) => {
    const response = await request(app).get(path);
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(count);
  });

  it("returns a loan detail", async () => {
    const response = await request(app).get("/api/loans/detail/4");
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(4);
  });
});
