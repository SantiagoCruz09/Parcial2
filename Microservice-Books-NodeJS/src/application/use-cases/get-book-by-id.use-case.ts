import { CustomError } from "../../domain/erros/custom.error";
import { Book } from "../../domain/interfaces/book.interface";
import { BookRepository } from "../../domain/repositories/book.repository";

export class GetBookByIdUseCase {
  constructor(private readonly repository: BookRepository) {}

  execute(id: number): Promise<Book> {
    if (!Number.isInteger(id) || id < 1) {
      return Promise.reject(CustomError.badRequest("El id debe ser un número entero positivo"));
    }
    return this.repository.findById(id);
  }
}
