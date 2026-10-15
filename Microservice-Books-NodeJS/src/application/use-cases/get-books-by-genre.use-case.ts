import { CustomError } from "../../domain/erros/custom.error";
import { Book, BookGenre } from "../../domain/interfaces/book.interface";
import { BookRepository } from "../../domain/repositories/book.repository";

const genres: BookGenre[] = ["Novela", "Cuento", "Poesía", "Ensayo", "Ciencia Ficción"];

export class GetBooksByGenreUseCase {
  constructor(private readonly repository: BookRepository) {}

  execute(genre: string, count: number): Promise<Book[]> {
    if (!genres.includes(genre as BookGenre)) {
      return Promise.reject(CustomError.badRequest(`Género inválido. Géneros válidos: ${genres.join(", ")}`));
    }
    if (!Number.isInteger(count) || count < 1) {
      return Promise.reject(CustomError.badRequest("La cantidad debe ser un número entero positivo"));
    }
    return this.repository.findByGenre(genre as BookGenre, count);
  }
}
