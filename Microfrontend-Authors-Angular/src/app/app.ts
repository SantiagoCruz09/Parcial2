import { Component } from '@angular/core';
import { AuthorsPage } from './presentation/pages/authors/authors.page';

/**
 * Componente raíz del microfrontend de Authors.
 *
 * @remarks
 * Permite ejecutar el microfrontend de forma independiente
 * (modo desarrollo) renderizando la página de autores. Cuando el
 * host lo consume mediante Module Federation, carga directamente
 * el módulo expuesto `./AuthorsPage`.
 */
@Component({
  selector: 'app-root',
  imports: [AuthorsPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
