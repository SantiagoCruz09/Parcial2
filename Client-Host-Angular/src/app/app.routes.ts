import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 */
export const routes: Routes = [
  /**
   * Ruta de libros (Microfrontend Books).
   */
  {
    path: 'books',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './BooksPage',
      }).then((m) => m.BooksPage),
  },

  /**
   * Ruta de autores (Microfrontend Authors).
   */
  {
    path: 'authors',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4202/remoteEntry.js',
        exposedModule: './AuthorsPage',
      }).then((m) => m.AuthorsPage),
  },

  /**
   * Ruta de préstamos (Microfrontend Loans).
   */
  {
    path: 'loans',
    loadComponent: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4203/remoteEntry.js',
        exposedModule: './LoansPage',
      }).then((m) => m.LoansPage),
  },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de libros.
   */
  { path: '**', redirectTo: 'books' },
];
