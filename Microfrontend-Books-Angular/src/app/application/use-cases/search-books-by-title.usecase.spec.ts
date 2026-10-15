import { Book } from '../../../domain/models/book.model';
import { SearchBooksByTitleUseCase } from './search-books-by-title.usecase';

/**
 * Pruebas del caso de uso "buscar libros por título".
 */
describe('SearchBooksByTitleUseCase', () => {
  const books: Book[] = [
    {
      id: 1,
      title: 'Cien años de soledad',
      author: 'Gabriel García Márquez',
      genre: 'Novela',
      year: 1967,
      price: 45000,
    },
    {
      id: 2,
      title: 'El amor en los tiempos del cólera',
      author: 'Gabriel García Márquez',
      genre: 'Novela',
      year: 1985,
      price: 50000,
    },
  ];

  const useCase = new SearchBooksByTitleUseCase();

  it('retorna todos los libros cuando el término está vacío', () => {
    expect(useCase.execute(books, '   ')).toEqual(books);
  });

  it('busca sin distinguir mayúsculas y minúsculas', () => {
    const result = useCase.execute(books, 'SOLEDAD');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it('retorna un arreglo vacío si no hay coincidencias', () => {
    expect(useCase.execute(books, 'inexistente')).toEqual([]);
  });

  it('consulta el repositorio para la búsqueda remota', () => {
    const repository = {
      getBooks: jest.fn().mockReturnValue([]),
      getBooksByGenre: jest.fn().mockReturnValue([]),
      getBookById: jest.fn().mockReturnValue([]),
      searchBooks: jest.fn().mockReturnValue([]),
    };
    const remoteUseCase = new SearchBooksByTitleUseCase(repository);

    remoteUseCase.execute('soledad', 3);

    expect(repository.searchBooks).toHaveBeenCalledWith('soledad', 3);
  });

  it('rechaza la búsqueda remota sin repositorio', () => {
    expect(() => useCase.execute('soledad', 3)).toThrow(
      'BookRepository is required for HTTP searching'
    );
  });
});
