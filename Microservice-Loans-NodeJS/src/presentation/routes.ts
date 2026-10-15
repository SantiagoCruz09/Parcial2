import { Router } from "express";
import { LoansRoutes } from "./modules/loans/loans.routes";

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
    router.use("/api/loans", LoansRoutes.routes);

    return router;
  }
}
