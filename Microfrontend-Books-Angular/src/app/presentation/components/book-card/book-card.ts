import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { Book } from '../../../domain/models/book.model';

/**
 * Componente de presentación que muestra la tarjeta de un libro.
 *
 * @remarks
 * Componente "tonto" (presentacional): recibe un libro como
 * entrada y únicamente se encarga de renderizarlo. No contiene
 * lógica de negocio ni acceso a datos.
 */
@Component({
  selector: 'app-book-card',
  imports: [CurrencyPipe],
  templateUrl: './book-card.html',
  styleUrl: './book-card.scss',
})
export class BookCard {
  /** Libro a renderizar (entrada obligatoria) */
  readonly book = input.required<Book>();
}
