import { Router } from "express";
import { BooksRoutes } from "./modules/books/books.routes";

/**
 * Clase encargada de centralizar todas las rutas de la aplicación.
 */
export class AppRoutes {

  /**
   * Devuelve el router principal de la aplicación.
   *
   * @returns Router de Express con todas las rutas registradas
   */
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use("/api/books", BooksRoutes.routes);

    return router;
  }
}
