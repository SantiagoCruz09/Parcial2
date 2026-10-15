import { Book } from '../../../domain/models/book.model';
import { FilterBooksByGenreUseCase } from './filter-books-by-genre.usecase';

/**
 * Pruebas del caso de uso "filtrar libros por género".
 */
describe('FilterBooksByGenreUseCase', () => {
  const books: Book[] = [
    {
      id: 1,
      title: 'El Quijote',
      author: 'Miguel de Cervantes',
      genre: 'Novela',
      year: 1605,
      price: 30000,
    },
    {
      id: 2,
      title: 'Poemas',
      author: 'Autor Anónimo',
      genre: 'Poesía',
      year: 1990,
      price: 25000,
    },
  ];

  const useCase = new FilterBooksByGenreUseCase();

  it('retorna todos los libros cuando el filtro es "all"', () => {
    expect(useCase.execute(books, 'all')).toEqual(books);
  });

  it('filtra los libros por el género indicado', () => {
    const result = useCase.execute(books, 'Poesía');
    expect(result).toHaveLength(1);
    expect(result[0].genre).toBe('Poesía');
  });

  it('retorna un arreglo vacío si no hay coincidencias', () => {
    expect(useCase.execute(books, 'Ensayo')).toEqual([]);
  });

  it('consulta el repositorio para el filtro remoto', () => {
    const repository = {
      getBooks: jest.fn().mockReturnValue([]),
      getBooksByGenre: jest.fn().mockReturnValue([]),
      getBookById: jest.fn().mockReturnValue([]),
      searchBooks: jest.fn().mockReturnValue([]),
    };
    const remoteUseCase = new FilterBooksByGenreUseCase(repository);

    remoteUseCase.execute('Novela', 3);
    remoteUseCase.execute('all', 3);

    expect(repository.getBooksByGenre).toHaveBeenCalledWith('Novela', 3);
    expect(repository.getBooks).toHaveBeenCalledWith(3);
  });

  it('rechaza la consulta remota sin repositorio', () => {
    expect(() => useCase.execute('Novela', 3)).toThrow(
      'BookRepository is required for HTTP filtering'
    );
  });
});
