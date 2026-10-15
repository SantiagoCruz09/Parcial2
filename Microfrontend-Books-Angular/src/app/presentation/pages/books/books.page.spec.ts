import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Book } from '../../../domain/models/book.model';
import { BooksPage } from './books.page';

/**
 * Pruebas de la página del microfrontend de Books.
 */
describe('BooksPage', () => {
  let fixture: ComponentFixture<BooksPage>;
  let httpMock: HttpTestingController;

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
      title: 'Veinte poemas de amor',
      author: 'Pablo Neruda',
      genre: 'Poesía',
      year: 1924,
      price: 38000,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /** Responde la petición HTTP de carga de libros. */
  function flushBooks(data: Book[] = books): void {
    httpMock.expectOne((req) => req.url.includes('/api/books/')).flush(data);
  }

  it('crea la página', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('carga los libros al iniciar', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);

    flushBooks();

    expect(fixture.componentInstance.books()).toEqual(books);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('gestiona el error de carga del microservicio', () => {
    fixture.detectChanges();

    httpMock
      .expectOne((req) => req.url.includes('/api/books/'))
      .flush('error', { status: 500, statusText: 'Server Error' });

    expect(fixture.componentInstance.error()).toBe(
      'No se pudieron cargar los libros.'
    );
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('filtra los libros por género', () => {
    fixture.detectChanges();
    flushBooks();

    fixture.componentInstance.onGenreChange('Poesía');
    flushBooks();

    const visible = fixture.componentInstance.visibleBooks();
    expect(visible).toHaveLength(1);
    expect(visible[0].genre).toBe('Poesía');
  });

  it('busca los libros por título', () => {
    fixture.detectChanges();
    flushBooks();

    fixture.componentInstance.onSearchChange('soledad');
    flushBooks();

    const visible = fixture.componentInstance.visibleBooks();
    expect(visible).toHaveLength(1);
    expect(visible[0].id).toBe(1);
  });

  it('recarga los libros al cambiar la cantidad', () => {
    fixture.detectChanges();
    flushBooks();

    fixture.componentInstance.onCountChange(6);

    expect(fixture.componentInstance.count()).toBe(6);
    httpMock.expectOne((req) => req.url.includes('/api/books/6')).flush(books);
  });
});
