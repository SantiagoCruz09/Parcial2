import { Component, input } from '@angular/core';
import { Author } from '../../../domain/models/author.model';

/**
 * Componente de presentación que muestra la tarjeta de un autor.
 *
 * @remarks
 * Componente "tonto" (presentacional): recibe un autor como
 * entrada y únicamente se encarga de renderizarlo. No contiene
 * lógica de negocio ni acceso a datos.
 */
@Component({
  selector: 'app-author-card',
  templateUrl: './author-card.html',
  styleUrl: './author-card.scss',
})
export class AuthorCard {
  /** Autor a renderizar (entrada obligatoria) */
  readonly author = input.required<Author>();
}
