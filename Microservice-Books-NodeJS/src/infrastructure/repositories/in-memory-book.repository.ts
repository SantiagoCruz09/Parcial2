import { faker } from "@faker-js/faker";
import { BookEntity } from "../../domain/entities/book.entity";
import { Book, BookGenre } from "../../domain/interfaces/book.interface";
import { BookRepository } from "../../domain/repositories/book.repository";

const genres: BookGenre[] = ["Novela", "Cuento", "Poesía", "Ensayo", "Ciencia Ficción"];

export class InMemoryBookRepository implements BookRepository {
  private readonly books = new Map<number, Book>();

  async findAll(count: number): Promise<Book[]> {
    return Array.from({ length: count }, (_, index) => this.getOrCreate(index + 1));
  }

  async findById(id: number): Promise<Book> {
    return this.getOrCreate(id);
  }

  async findByGenre(genre: BookGenre, count: number): Promise<Book[]> {
    return Array.from({ length: count }, (_, index) => this.getOrCreate(index + 1, genre));
  }

  private getOrCreate(id: number, genre?: BookGenre): Book {
    const existingBook = this.books.get(id);
    if (existingBook) {
      if (genre) {
        const filteredBook = new BookEntity(
          existingBook.id,
          existingBook.title,
          existingBook.author,
          genre,
          existingBook.year,
          existingBook.price,
        );
        this.books.set(id, filteredBook);
        return filteredBook;
      }
      return existingBook;
    }

    const book = new BookEntity(
      id,
      faker.commerce.productName(),
      `${faker.person.firstName()} ${faker.person.lastName()}`,
      genre ?? faker.helpers.arrayElement(genres),
      faker.number.int({ min: 1900, max: 2024 }),
      Number(faker.commerce.price({ min: 10000, max: 120000, dec: 0 })),
    );
    this.books.set(id, book);
    return book;
  }
}
