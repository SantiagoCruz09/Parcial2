import { Component, input } from '@angular/core';
import { Loan, LoanStatus } from '../../../domain/models/loan.model';

/**
 * Componente de presentación que muestra la tarjeta de un préstamo.
 *
 * @remarks
 * Componente "tonto" (presentacional): recibe un préstamo como
 * entrada y únicamente se encarga de renderizarlo. No contiene
 * lógica de negocio ni acceso a datos.
 */
@Component({
  selector: 'app-loan-card',
  templateUrl: './loan-card.html',
  styleUrl: './loan-card.scss',
})
export class LoanCard {
  /** Préstamo a renderizar (entrada obligatoria) */
  readonly loan = input.required<Loan>();

  /** Clases de Bootstrap asociadas a cada estado del préstamo */
  readonly statusBadgeClass: Record<LoanStatus, string> = {
    Activo: 'text-bg-primary',
    Devuelto: 'text-bg-success',
    Vencido: 'text-bg-danger',
  };
}
