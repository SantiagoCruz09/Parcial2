import { Component } from '@angular/core';
import { BooksPage } from './presentation/pages/books/books.page';

/**
 * Componente raíz del microfrontend de Books.
 *
 * @remarks
 * Permite ejecutar el microfrontend de forma independiente
 * (modo desarrollo) renderizando la página de libros. Cuando el
 * host lo consume mediante Module Federation, carga directamente
 * el módulo expuesto `./BooksPage`.
 */
@Component({
  selector: 'app-root',
  imports: [BooksPage],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {}
