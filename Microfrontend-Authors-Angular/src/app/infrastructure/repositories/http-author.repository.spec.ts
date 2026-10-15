import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Author } from '../../../domain/models/author.model';
import { API_CONFIG } from '../config/api.config';
import { HttpAuthorRepository } from './http-author.repository';

/**
 * Pruebas del repositorio HTTP de autores.
 */
describe('HttpAuthorRepository', () => {
  let repository: HttpAuthorRepository;
  let httpMock: HttpTestingController;

  const authors: Author[] = [
    {
      id: 1,
      name: 'Isabel Allende',
      nationality: 'Chilena',
      booksWritten: 20,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpAuthorRepository,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    repository = TestBed.inject(HttpAuthorRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crea el repositorio', () => {
    expect(repository).toBeTruthy();
  });

  it('consulta la URL del microservicio Authors con la cantidad indicada', () => {
    repository.getAuthors(4).subscribe((result) => {
      expect(result).toEqual(authors);
    });

    const req = httpMock.expectOne(
      `${API_CONFIG.authorsApiUrl}/api/authors/4`
    );
    expect(req.request.method).toBe('GET');
    req.flush(authors);
  });
});
