import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Book } from '../../../domain/models/book.model';
import { API_CONFIG } from '../config/api.config';
import { HttpBookRepository } from './http-book.repository';

/**
 * Pruebas del repositorio HTTP de libros.
 */
describe('HttpBookRepository', () => {
  let repository: HttpBookRepository;
  let httpMock: HttpTestingController;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpBookRepository,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    repository = TestBed.inject(HttpBookRepository);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('crea el repositorio', () => {
    expect(repository).toBeTruthy();
  });

  it('consulta la URL del microservicio Books con la cantidad indicada', () => {
    repository.getBooks(4).subscribe((result) => {
      expect(result).toEqual(books);
    });

    const req = httpMock.expectOne(
      `${API_CONFIG.booksApiUrl}/api/books/4`
    );
    expect(req.request.method).toBe('GET');
    req.flush(books);
  });
});
