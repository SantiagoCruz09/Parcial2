import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBooksByGenreUseCase } from '../../../application/use-cases/filter-books-by-genre.usecase';
import { GetBooksUseCase } from '../../../application/use-cases/get-books.usecase';
import { SearchBooksByTitleUseCase } from '../../../application/use-cases/search-books-by-title.usecase';
import {
  BOOK_GENRES,
  Book,
  BookGenreFilter,
} from '../../../domain/models/book.model';
import { BookRepository } from '../../../domain/repositories/book.repository';
import { HttpBookRepository } from '../../../infrastructure/repositories/http-book.repository';
import { BookCard } from '../../components/book-card/book-card';

/**
 * Página principal del microfrontend de Books.
 *
 * @remarks
 * Componente de presentación que orquesta los casos de uso del
 * catálogo de libros y los consume el host mediante Module
 * Federation con el módulo expuesto `./BooksPage`.
 *
 * Responsabilidades:
 * - Consultar libros a través del microservicio Books.
 * - Filtrar por género y buscar por título.
 * - Mostrar estados de carga, error y resultados.
 */
@Component({
  selector: 'app-books-page',
  imports: [CommonModule, FormsModule, BookCard],
  templateUrl: './books.page.html',
  styleUrl: './books.page.scss',
  providers: [
    { provide: GetBooksUseCase, useClass: GetBooksUseCase, deps: [BookRepository] },
    { provide: FilterBooksByGenreUseCase, useClass: FilterBooksByGenreUseCase, deps: [BookRepository] },
    { provide: SearchBooksByTitleUseCase, useClass: SearchBooksByTitleUseCase, deps: [BookRepository] },
    {
      provide: BookRepository,
      useFactory: (http: HttpClient) => new HttpBookRepository(http),
      deps: [HttpClient],
    },
  ],
})
export class BooksPage implements OnInit {
  /** Caso de uso: obtener libros */
  private readonly getBooks = inject(GetBooksUseCase);

  /** Caso de uso: filtrar por género */
  private readonly filterByGenre = inject(FilterBooksByGenreUseCase);

  /** Caso de uso: buscar por título */
  private readonly searchByTitle = inject(SearchBooksByTitleUseCase);

  /** Géneros disponibles para el filtro */
  readonly genres = BOOK_GENRES;

  /** Opciones de cantidad de libros a consultar */
  readonly countOptions = [6, 12, 18, 24];

  /** Cantidad de libros solicitados al microservicio */
  readonly count = signal(12);

  /** Libros cargados desde el microservicio */
  readonly books = signal<Book[]>([]);

  /** Género seleccionado en el filtro */
  readonly genre = signal<BookGenreFilter>('all');

  /** Término de búsqueda por título */
  readonly searchTerm = signal('');

  /** Indicador de carga */
  readonly loading = signal(false);

  /** Mensaje de error, si lo hubiera */
  readonly error = signal<string | null>(null);

  /**
   * Libros visibles tras aplicar el filtro de género y la búsqueda.
   *
   * @remarks
   * Combina dos casos de uso de aplicación sobre el estado actual.
   */
  readonly visibleBooks = computed(() =>
    this.searchByTitle.execute(
      this.filterByGenre.execute(this.books(), this.genre()),
      this.searchTerm()
    )
  );

  /**
   * Inicializa la página cargando los libros.
   */
  ngOnInit(): void {
    this.reload();
  }

  /**
   * Consulta nuevamente los libros al microservicio.
   */
  reload(): void {
    this.loading.set(true);
    this.error.set(null);

    this.getBooks.execute(this.count()).subscribe({
      next: (books) => {
        this.books.set(books);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los libros.');
        this.loading.set(false);
      },
    });
  }

  /**
   * Actualiza el género seleccionado.
   *
   * @param value Nuevo género o `'all'`
   */
  onGenreChange(value: string): void {
    this.genre.set(value as BookGenreFilter);
    this.loading.set(true);
    this.filterByGenre.execute(this.genre(), this.count()).subscribe({
      next: (books) => { this.books.set(books); this.loading.set(false); },
      error: () => { this.error.set('No se pudieron filtrar los libros.'); this.loading.set(false); },
    });
  }

  /**
   * Actualiza el término de búsqueda.
   *
   * @param value Nuevo término
   */
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
    this.loading.set(true);
    this.searchByTitle.execute(value, this.count()).subscribe({
      next: (books) => { this.books.set(books); this.loading.set(false); },
      error: () => { this.error.set('No se pudieron buscar los libros.'); this.loading.set(false); },
    });
  }

  /**
   * Actualiza la cantidad y recarga los libros.
   *
   * @param value Nueva cantidad
   */
  onCountChange(value: number): void {
    this.count.set(value);
    this.reload();
  }
}
