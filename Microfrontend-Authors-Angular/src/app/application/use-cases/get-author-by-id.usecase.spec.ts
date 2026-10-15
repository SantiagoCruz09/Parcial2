import { of } from 'rxjs';
import { Author } from '../../domain/models/author.model';
import { AuthorRepository } from '../../domain/repositories/author.repository';
import { GetAuthorByIdUseCase } from './get-author-by-id.usecase';

describe('GetAuthorByIdUseCase', () => {
  it('consulta un autor por id en el repositorio', () => {
    const author: Author = { id: 1, name: 'Gabriel García Márquez', nationality: 'Colombiana', booksWritten: 10 };
    const repository: AuthorRepository = {
      getAuthors: jest.fn(),
      getAuthorsByNationality: jest.fn(),
      getAuthorById: jest.fn().mockReturnValue(of(author)),
    };
    const useCase = new GetAuthorByIdUseCase(repository);

    useCase.execute(1).subscribe((result) => expect(result).toEqual(author));

    expect(repository.getAuthorById).toHaveBeenCalledWith(1);
  });
});
