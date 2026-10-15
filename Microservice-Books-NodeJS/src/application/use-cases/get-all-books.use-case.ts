import { CustomError } from "../../domain/erros/custom.error";
import { Book } from "../../domain/interfaces/book.interface";
import { BookRepository } from "../../domain/repositories/book.repository";

export class GetAllBooksUseCase {
  constructor(private readonly repository: BookRepository) {}

  execute(count: number): Promise<Book[]> {
    if (!Number.isInteger(count) || count < 1) {
      return Promise.reject(CustomError.badRequest("La cantidad debe ser un número entero positivo"));
    }
    return this.repository.findAll(count);
  }
}
