import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { GetAllLoansUseCase } from "../../../application/use-cases/get-all-loans.use-case";
import { GetLoanByIdUseCase } from "../../../application/use-cases/get-loan-by-id.use-case";
import { GetLoansByStatusUseCase } from "../../../application/use-cases/get-loans-by-status.use-case";

/**
 * Controlador de préstamos.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con préstamos,
 * delegando la lógica de negocio al `LoansService`.
 */
export class LoansController {
  constructor(
    private readonly allLoansUseCase: GetAllLoansUseCase,
    private readonly loanByIdUseCase: GetLoanByIdUseCase,
    private readonly loansByStatusUseCase: GetLoansByStatusUseCase,
  ) {}

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

    this.allLoansUseCase
      .execute(Number(countLoans))
      .then((loans) => res.status(200).json(loans))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener un préstamo por su id.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/loans/detail/5
   * ```
   */
  getLoanById = (req: Request, res: Response): void => {
    const { id } = req.params;

    this.loanByIdUseCase
      .execute(Number(id))
      .then((loan) => res.status(200).json(loan))
      .catch((error) => HandleError.error(error, res));
  };

  /**
   * Maneja la petición HTTP para obtener préstamos por estado.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /api/loans/status/Activo/10
   * ```
   */
  getLoansByStatus = (req: Request, res: Response): void => {
    const { status, countLoans } = req.params;

    this.loansByStatusUseCase
      .execute(status as string, Number(countLoans))
      .then((loans) => res.status(200).json(loans))
      .catch((error) => HandleError.error(error, res));
  };
}
