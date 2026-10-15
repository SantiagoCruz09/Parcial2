import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterAuthorsByNationalityUseCase } from '../../../application/use-cases/filter-authors-by-nationality.usecase';
import { GetAuthorsUseCase } from '../../../application/use-cases/get-authors.usecase';
import { GetAuthorByIdUseCase } from '../../../application/use-cases/get-author-by-id.usecase';
import {
  Author,
  NationalityFilter,
} from '../../../domain/models/author.model';
import { AuthorRepository } from '../../../domain/repositories/author.repository';
import { HttpAuthorRepository } from '../../../infrastructure/repositories/http-author.repository';
import { AuthorCard } from '../../components/author-card/author-card';

/**
 * Página principal del microfrontend de Authors.
 *
 * @remarks
 * Componente de presentación que orquesta los casos de uso del
 * catálogo de autores y los consume el host mediante Module
 * Federation con el módulo expuesto `./AuthorsPage`.
 *
 * Responsabilidades:
 * - Consultar autores a través del microservicio Authors.
 * - Filtrar por nacionalidad y consultar el detalle de un autor.
 * - Mostrar estados de carga, error y resultados.
 */
@Component({
  selector: 'app-authors-page',
  imports: [CommonModule, FormsModule, AuthorCard],
  templateUrl: './authors.page.html',
  styleUrl: './authors.page.scss',
  providers: [
    { provide: GetAuthorsUseCase, useClass: GetAuthorsUseCase, deps: [AuthorRepository] },
    { provide: FilterAuthorsByNationalityUseCase, useClass: FilterAuthorsByNationalityUseCase, deps: [AuthorRepository] },
    { provide: GetAuthorByIdUseCase, useClass: GetAuthorByIdUseCase, deps: [AuthorRepository] },
    {
      provide: AuthorRepository,
      useFactory: (http: HttpClient) => new HttpAuthorRepository(http),
      deps: [HttpClient],
    },
  ],
})
export class AuthorsPage implements OnInit {
  /** Caso de uso: obtener autores */
  private readonly getAuthors = inject(GetAuthorsUseCase);

  /** Caso de uso: filtrar por nacionalidad */
  private readonly filterByNationality = inject(
    FilterAuthorsByNationalityUseCase
  );

  /** Caso de uso: consultar detalle por ID */
  private readonly getAuthorById = inject(GetAuthorByIdUseCase);

  /** Opciones de cantidad de autores a consultar */
  readonly countOptions = [6, 12, 18, 24];

  /** Cantidad de autores solicitados al microservicio */
  readonly count = signal(12);

  /** Autores cargados desde el microservicio */
  readonly authors = signal<Author[]>([]);

  /** Nacionalidad seleccionada en el filtro */
  readonly nationality = signal<NationalityFilter>('all');

  /** Autor seleccionado para mostrar su detalle */
  readonly selectedAuthor = signal<Author | null>(null);

  /** Indicador de carga */
  readonly loading = signal(false);

  /** Mensaje de error, si lo hubiera */
  readonly error = signal<string | null>(null);

  /** Nacionalidades disponibles, derivadas de los autores cargados */
  readonly nationalities = computed(() =>
    [...new Set(this.authors().map((author) => author.nationality))].sort()
  );

  /**
   * Autores visibles tras aplicar el filtro de nacionalidad.
   */
  readonly visibleAuthors = computed(() =>
    this.filterByNationality.execute(this.authors(), this.nationality())
  );

  /**
   * Inicializa la página cargando los autores.
   */
  ngOnInit(): void {
    this.reload();
  }

  /**
   * Consulta nuevamente los autores al microservicio.
   */
  reload(): void {
    this.loading.set(true);
    this.error.set(null);

    this.getAuthors.execute(this.count()).subscribe({
      next: (authors) => {
        this.authors.set(authors);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los autores.');
        this.loading.set(false);
      },
    });
  }

  /**
   * Actualiza la nacionalidad seleccionada.
   *
   * @param value Nueva nacionalidad o `'all'`
   */
  onNationalityChange(value: string): void {
    this.nationality.set(value as NationalityFilter);
    this.loading.set(true);
    this.filterByNationality.execute(this.nationality(), this.count()).subscribe({
      next: (authors) => { this.authors.set(authors); this.loading.set(false); },
      error: () => { this.error.set('No se pudieron filtrar los autores.'); this.loading.set(false); },
    });
  }

  /** Consulta el detalle de un autor. */
  onDetail(id: number): void {
    this.loading.set(true);
    this.getAuthorById.execute(id).subscribe({
      next: (author) => { this.selectedAuthor.set(author); this.loading.set(false); },
      error: () => { this.error.set('No se pudo cargar el detalle del autor.'); this.loading.set(false); },
    });
  }

  /** Cierra el detalle seleccionado. */
  closeDetail(): void {
    this.selectedAuthor.set(null);
  }

  /**
   * Actualiza la cantidad y recarga los autores.
   *
   * @param value Nueva cantidad
   */
  onCountChange(value: number): void {
    this.count.set(value);
    this.reload();
  }
}
