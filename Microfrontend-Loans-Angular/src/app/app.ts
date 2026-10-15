import { Component } from '@angular/core';
import { LoansPage } from './presentation/pages/loans/loans.page';

/**
 * Componente raíz del microfrontend de Loans.
 *
 * @remarks
 * Permite ejecutar el microfrontend de forma independiente
 * (modo desarrollo) renderizando la página de préstamos. Cuando el
 * host lo consume mediante Module Federation, carga directamente
 * el módulo expuesto `./LoansPage`.
 */
@Component({
  selector: 'app-root',
  imports: [LoansPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
