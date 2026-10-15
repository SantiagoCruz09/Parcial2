import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Author } from '../../../domain/models/author.model';
import { AuthorsPage } from './authors.page';

/**
 * Pruebas de la página del microfrontend de Authors.
 */
describe('AuthorsPage', () => {
  let fixture: ComponentFixture<AuthorsPage>;
  let httpMock: HttpTestingController;

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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsPage],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthorsPage);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  /** Responde la petición HTTP de carga de autores. */
  function flushAuthors(data: Author[] = authors): void {
    httpMock.expectOne((req) => req.url.includes('/api/authors/')).flush(data);
  }

  it('crea la página', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('carga los autores al iniciar', () => {
    fixture.detectChanges();
    expect(fixture.componentInstance.loading()).toBe(true);

    flushAuthors();

    expect(fixture.componentInstance.authors()).toEqual(authors);
    expect(fixture.componentInstance.loading()).toBe(false);
    expect(fixture.componentInstance.error()).toBeNull();
  });

  it('gestiona el error de carga del microservicio', () => {
    fixture.detectChanges();

    httpMock
      .expectOne((req) => req.url.includes('/api/authors/'))
      .flush('error', { status: 500, statusText: 'Server Error' });

    expect(fixture.componentInstance.error()).toBe(
      'No se pudieron cargar los autores.'
    );
    expect(fixture.componentInstance.loading()).toBe(false);
  });

  it('deriva las nacionalidades disponibles', () => {
    fixture.detectChanges();
    flushAuthors();

    expect(fixture.componentInstance.nationalities()).toEqual([
      'Argentina',
      'Colombiana',
    ]);
  });

  it('filtra los autores por nacionalidad', () => {
    fixture.detectChanges();
    flushAuthors();

    fixture.componentInstance.onNationalityChange('Argentina');
    flushAuthors();

    const visible = fixture.componentInstance.visibleAuthors();
    expect(visible).toHaveLength(1);
    expect(visible[0].nationality).toBe('Argentina');
  });

  it('busca los autores por nombre', () => {
    fixture.detectChanges();
    flushAuthors();

    fixture.componentInstance.onSearchChange('borges');
    flushAuthors();

    const visible = fixture.componentInstance.visibleAuthors();
    expect(visible).toHaveLength(1);
    expect(visible[0].id).toBe(2);
  });

  it('recarga los autores al cambiar la cantidad', () => {
    fixture.detectChanges();
    flushAuthors();

    fixture.componentInstance.onCountChange(6);

    expect(fixture.componentInstance.count()).toBe(6);
    httpMock.expectOne((req) => req.url.includes('/api/authors/6')).flush(authors);
  });
});
