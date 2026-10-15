import { Author } from '../../../domain/models/author.model';
import { SearchAuthorsByNameUseCase } from './search-authors-by-name.usecase';

/**
 * Pruebas del caso de uso "buscar autores por nombre".
 */
describe('SearchAuthorsByNameUseCase', () => {
  const authors: Author[] = [
    {
      id: 1,
      name: 'Gabriel García Márquez',
      nationality: 'Colombiana',
      booksWritten: 25,
    },
    {
      id: 2,
      name: 'Jorge Luis Borges',
      nationality: 'Argentina',
      booksWritten: 30,
    },
  ];

  const useCase = new SearchAuthorsByNameUseCase();

  it('retorna todos los autores cuando el término está vacío', () => {
    expect(useCase.execute(authors, '   ')).toEqual(authors);
  });

  it('busca sin distinguir mayúsculas y minúsculas', () => {
    const result = useCase.execute(authors, 'BORGES');
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(2);
  });

  it('retorna un arreglo vacío si no hay coincidencias', () => {
    expect(useCase.execute(authors, 'inexistente')).toEqual([]);
  });
});
