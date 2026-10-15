import { of } from 'rxjs';
import { Book } from '../../../domain/models/book.model';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { GetBooksUseCase } from './get-books.usecase';

/**
 * Pruebas del caso de uso "obtener libros".
 */
describe('GetBooksUseCase', () => {
  const books: Book[] = [
    {
      id: 1,
      title: 'El Quijote',
      author: 'Miguel de Cervantes',
      genre: 'Novela',
      year: 1605,
      price: 30000,
    },
  ];

  let repository: { getBooks: jest.Mock };
  let useCase: GetBooksUseCase;

  beforeEach(() => {
    repository = { getBooks: jest.fn() };
    useCase = new GetBooksUseCase(repository as unknown as BookRepository);
  });

  it('crea el caso de uso', () => {
    expect(useCase).toBeTruthy();
  });

  it('delega en el repositorio con la cantidad solicitada', (done) => {
    repository.getBooks.mockReturnValue(of(books));

    useCase.execute(5).subscribe((result) => {
      expect(result).toEqual(books);
      done();
    });

    expect(repository.getBooks).toHaveBeenCalledWith(5);
  });
});
