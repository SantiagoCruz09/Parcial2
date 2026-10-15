import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { LoansService } from "./loans.service";

/**
 * Controlador de préstamos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con préstamos,
 * delegando la lógica de negocio al `LoansService`.
 */
export class LoansController {

  /** Servicio de préstamos. */
  private readonly loansService = new LoansService();

  /**
   * Maneja la petición HTTP para obtener un listado de préstamos.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/loans/10
   * ```
   */
  getAllLoans = (req: Request, res: Response): void => {
    const { countLoans } = req.params;

    this.loansService
      .getAllLoans(Number(countLoans))
      .then((loans) => res.status(200).json(loans))
      .catch((error) => HandleError.error(error, res));
  };
}
