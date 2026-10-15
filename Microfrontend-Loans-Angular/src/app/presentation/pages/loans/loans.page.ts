import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterLoansByStatusUseCase } from '../../../application/use-cases/filter-loans-by-status.usecase';
import { GetLoansUseCase } from '../../../application/use-cases/get-loans.usecase';
import { SearchLoansByUserUseCase } from '../../../application/use-cases/search-loans-by-user.usecase';
import {
  LOAN_STATUSES,
  Loan,
  LoanStatusFilter,
} from '../../../domain/models/loan.model';
import { LoanRepository } from '../../../domain/repositories/loan.repository';
import { HttpLoanRepository } from '../../../infrastructure/repositories/http-loan.repository';
import { LoanCard } from '../../components/loan-card/loan-card';

/**
 * Página principal del microfrontend de Loans.
 *
 * @remarks
 * Componente de presentación que orquesta los casos de uso del
 * catálogo de préstamos y los consume el host mediante Module
 * Federation con el módulo expuesto `./LoansPage`.
 *
 * Responsabilidades:
 * - Consultar préstamos a través del microservicio Loans.
 * - Filtrar por estado y buscar por usuario.
 * - Mostrar estados de carga, error y resultados.
 */
@Component({
  selector: 'app-loans-page',
  imports: [CommonModule, FormsModule, LoanCard],
  templateUrl: './loans.page.html',
  styleUrl: './loans.page.scss',
  providers: [
    GetLoansUseCase,
    FilterLoansByStatusUseCase,
    SearchLoansByUserUseCase,
    { provide: LoanRepository, useClass: HttpLoanRepository },
  ],
})
export class LoansPage implements OnInit {
  /** Caso de uso: obtener préstamos */
  private readonly getLoans = inject(GetLoansUseCase);

  /** Caso de uso: filtrar por estado */
  private readonly filterByStatus = inject(FilterLoansByStatusUseCase);

  /** Caso de uso: buscar por usuario */
  private readonly searchByUser = inject(SearchLoansByUserUseCase);

  /** Estados disponibles para el filtro */
  readonly statuses = LOAN_STATUSES;

  /** Opciones de cantidad de préstamos a consultar */
  readonly countOptions = [6, 12, 18, 24];

  /** Cantidad de préstamos solicitados al microservicio */
  readonly count = signal(12);

  /** Préstamos cargados desde el microservicio */
  readonly loans = signal<Loan[]>([]);

  /** Estado seleccionado en el filtro */
  readonly status = signal<LoanStatusFilter>('all');

  /** Término de búsqueda por usuario */
  readonly searchTerm = signal('');

  /** Indicador de carga */
  readonly loading = signal(false);

  /** Mensaje de error, si lo hubiera */
  readonly error = signal<string | null>(null);

  /**
   * Préstamos visibles tras aplicar el filtro de estado y la búsqueda.
   *
   * @remarks
   * Combina dos casos de uso de aplicación sobre el estado actual.
   */
  readonly visibleLoans = computed(() =>
    this.searchByUser.execute(
      this.filterByStatus.execute(this.loans(), this.status()),
      this.searchTerm()
    )
  );

  /**
   * Inicializa la página cargando los préstamos.
   */
  ngOnInit(): void {
    this.reload();
  }

  /**
   * Consulta nuevamente los préstamos al microservicio.
   */
  reload(): void {
    this.loading.set(true);
    this.error.set(null);

    this.getLoans.execute(this.count()).subscribe({
      next: (loans) => {
        this.loans.set(loans);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los préstamos.');
        this.loading.set(false);
      },
    });
  }

  /**
   * Actualiza el estado seleccionado.
   *
   * @param value Nuevo estado o `'all'`
   */
  onStatusChange(value: string): void {
    this.status.set(value as LoanStatusFilter);
  }

  /**
   * Actualiza el término de búsqueda.
   *
   * @param value Nuevo término
   */
  onSearchChange(value: string): void {
    this.searchTerm.set(value);
  }

  /**
   * Actualiza la cantidad y recarga los préstamos.
   *
   * @param value Nueva cantidad
   */
  onCountChange(value: number): void {
    this.count.set(value);
    this.reload();
  }
}
