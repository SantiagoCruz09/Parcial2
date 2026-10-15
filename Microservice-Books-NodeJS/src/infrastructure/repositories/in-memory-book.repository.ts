import { faker } from "@faker-js/faker";
import { BookEntity } from "../../domain/entities/book.entity";
import { Book, BookGenre } from "../../domain/interfaces/book.interface";
import { BookRepository } from "../../domain/repositories/book.repository";

const genres: BookGenre[] = ["Novela", "Cuento", "Poesía", "Ensayo", "Ciencia Ficción"];

export class InMemoryBookRepository implements BookRepository {
  async findAll(count: number): Promise<Book[]> {
    return Array.from({ length: count }, (_, index) => this.generate(index + 1));
  }

  async findById(id: number): Promise<Book> {
    return this.generate(id);
  }

  async findByGenre(genre: BookGenre, count: number): Promise<Book[]> {
    return Array.from({ length: count }, (_, index) => this.generate(index + 1, genre));
  }

  private generate(id: number, genre?: BookGenre): Book {
    return new BookEntity(
      id,
      faker.commerce.productName(),
      `${faker.person.firstName()} ${faker.person.lastName()}`,
      genre ?? faker.helpers.arrayElement(genres),
      faker.number.int({ min: 1900, max: 2024 }),
      Number(faker.commerce.price({ min: 10000, max: 120000, dec: 0 })),
    );
  }
}
