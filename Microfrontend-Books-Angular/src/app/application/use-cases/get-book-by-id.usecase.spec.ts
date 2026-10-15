import { of } from 'rxjs';
import { Book } from '../../domain/models/book.model';
import { BookRepository } from '../../domain/repositories/book.repository';
import { GetBookByIdUseCase } from './get-book-by-id.usecase';

describe('GetBookByIdUseCase', () => {
  it('consulta un libro por id en el repositorio', () => {
    const book: Book = {
      id: 1, title: 'El Quijote', author: 'Miguel de Cervantes',
      genre: 'Novela', year: 1605, price: 30000,
    };
    const repository: BookRepository = {
      getBooks: jest.fn(),
      getBooksByGenre: jest.fn(),
      getBookById: jest.fn().mockReturnValue(of(book)),
    };
    const useCase = new GetBookByIdUseCase(repository);

    useCase.execute(1).subscribe((result) => expect(result).toEqual(book));

    expect(repository.getBookById).toHaveBeenCalledWith(1);
  });
});
