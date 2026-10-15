import { Author } from '../../../domain/models/author.model';
import { FilterAuthorsByNationalityUseCase } from './filter-authors-by-nationality.usecase';

/**
 * Pruebas del caso de uso "filtrar autores por nacionalidad".
 */
describe('FilterAuthorsByNationalityUseCase', () => {
  const authors: Author[] = [
    {
      id: 1,
      name: 'Isabel Allende',
      nationality: 'Chilena',
      booksWritten: 20,
    },
    {
      id: 2,
      name: 'Julio Cortázar',
      nationality: 'Argentina',
      booksWritten: 15,
    },
  ];

  const useCase = new FilterAuthorsByNationalityUseCase();

  it('retorna todos los autores cuando el filtro es "all"', () => {
    expect(useCase.execute(authors, 'all')).toEqual(authors);
  });

  it('filtra los autores por la nacionalidad indicada', () => {
    const result = useCase.execute(authors, 'Chilena');
    expect(result).toHaveLength(1);
    expect(result[0].nationality).toBe('Chilena');
  });

  it('retorna un arreglo vacío si no hay coincidencias', () => {
    expect(useCase.execute(authors, 'Peruana')).toEqual([]);
  });
});
