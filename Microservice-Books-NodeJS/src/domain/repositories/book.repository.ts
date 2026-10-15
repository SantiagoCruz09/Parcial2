import { Book, BookGenre } from "../interfaces/book.interface";

export interface BookRepository {
  findAll(count: number): Promise<Book[]>;
  findById(id: number): Promise<Book>;
  findByGenre(genre: BookGenre, count: number): Promise<Book[]>;
}
