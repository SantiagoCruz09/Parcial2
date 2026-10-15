import { of } from 'rxjs';
import { Author } from '../../../domain/models/author.model';
import { AuthorRepository } from '../../../domain/repositories/author.repository';
import { GetAuthorsUseCase } from './get-authors.usecase';

/**
 * Pruebas del caso de uso "obtener autores".
 */
describe('GetAuthorsUseCase', () => {
  const authors: Author[] = [
    {
      id: 1,
      name: 'Isabel Allende',
      nationality: 'Chilena',
      booksWritten: 20,
    },
  ];

  let repository: { getAuthors: jest.Mock };
  let useCase: GetAuthorsUseCase;

  beforeEach(() => {
    repository = { getAuthors: jest.fn() };
    useCase = new GetAuthorsUseCase(repository as unknown as AuthorRepository);
  });

  it('crea el caso de uso', () => {
    expect(useCase).toBeTruthy();
  });

  it('delega en el repositorio con la cantidad solicitada', (done) => {
    repository.getAuthors.mockReturnValue(of(authors));

    useCase.execute(3).subscribe((result) => {
      expect(result).toEqual(authors);
      done();
    });

    expect(repository.getAuthors).toHaveBeenCalledWith(3);
  });
});
