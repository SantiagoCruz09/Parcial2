import { Book, BookGenre } from "../interfaces/book.interface";

export class BookEntity implements Book {
  constructor(
    public readonly id: number,
    public readonly title: string,
    public readonly author: string,
    public readonly genre: BookGenre,
    public readonly year: number,
    public readonly price: number,
  ) {}
}
