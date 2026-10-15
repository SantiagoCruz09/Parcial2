import { Type } from '@angular/core';
import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { RemoteFallbackComponent } from './remote-fallback.component';

/**
 * Carga un componente remoto y devuelve una vista alternativa si falla.
 *
 * @param remoteEntry URL del archivo de entrada federado
 * @param exposedModule Nombre del módulo expuesto por el remoto
 * @returns Promesa con el componente remoto o el fallback
 */
function loadRemoteWithFallback(
  remoteEntry: string,
  exposedModule: string
): Promise<Type<unknown>> {
  return loadRemoteModule({ type: 'module', remoteEntry, exposedModule })
    .then(
      (module) =>
        module[exposedModule.replace('./', '')] as Type<unknown>
    )
    .catch(() => RemoteFallbackComponent);
}

/** Carga la página remota de libros. */
const loadBooksPage = () =>
  loadRemoteWithFallback('http://localhost:4201/remoteEntry.js', './BooksPage');

/** Carga la página remota de autores. */
const loadAuthorsPage = () =>
  loadRemoteWithFallback(
    'http://localhost:4202/remoteEntry.js',
    './AuthorsPage'
  );

/** Carga la página remota de préstamos. */
const loadLoansPage = () =>
  loadRemoteWithFallback(
    'http://localhost:4203/remoteEntry.js',
    './LoansPage'
  );

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
/** Define las rutas federadas del host y sus componentes de respaldo. */
export const routes: Routes = [
  /**
   * Ruta de libros (Microfrontend Books).
   */
  {
    path: 'books',
    loadComponent: loadBooksPage,
  },

  /**
   * Ruta de autores (Microfrontend Authors).
   */
  {
    path: 'authors',
    loadComponent: loadAuthorsPage,
  },

  /**
   * Ruta de préstamos (Microfrontend Loans).
   */
  {
    path: 'loans',
    loadComponent: loadLoansPage,
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
