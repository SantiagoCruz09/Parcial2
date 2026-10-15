import { Component } from '@angular/core';

/**
 * Componente de respaldo para un microfrontend remoto no disponible.
 *
 * Presenta un mensaje al usuario cuando falla la carga federada.
 */
@Component({
  standalone: true,
  selector: 'app-remote-fallback',
  templateUrl: './remote-fallback.component.html',
})
export class RemoteFallbackComponent {}
