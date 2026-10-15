import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterBooksByGenreUseCase } from '../../../application/use-cases/filter-books-by-genre.usecase';
import { GetBooksUseCase } from '../../../application/use-cases/get-books.usecase';
import { GetBookByIdUseCase } from '../../../application/use-cases/get-book-by-id.usecase';
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
 * - Filtrar por género y consultar el detalle de un libro.
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
    { provide: GetBookByIdUseCase, useClass: GetBookByIdUseCase, deps: [BookRepository] },
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

  /** Caso de uso: consultar detalle por ID */
  private readonly getBookById = inject(GetBookByIdUseCase);

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

  /** Libro seleccionado para mostrar su detalle */
  readonly selectedBook = signal<Book | null>(null);

  /** Indicador de carga */
  readonly loading = signal(false);

  /** Mensaje de error, si lo hubiera */
  readonly error = signal<string | null>(null);

  /**
   * Libros visibles tras aplicar el filtro de género.
   */
  readonly visibleBooks = computed(() => this.filterByGenre.execute(this.books(), this.genre()));

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

  /** Consulta el detalle de un libro. */
  onDetail(id: number): void {
    this.loading.set(true);
    this.getBookById.execute(id).subscribe({
      next: (book) => { this.selectedBook.set(book); this.loading.set(false); },
      error: () => { this.error.set('No se pudo cargar el detalle del libro.'); this.loading.set(false); },
    });
  }

  /** Cierra el detalle seleccionado. */
  closeDetail(): void {
    this.selectedBook.set(null);
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
