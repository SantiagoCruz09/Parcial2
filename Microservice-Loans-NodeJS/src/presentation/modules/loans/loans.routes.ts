import { Router } from "express";
import { LoansController } from "./loans.controller";

export class LoansRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new LoansController();

    /**
     * @openapi
     * /api/loans/{countLoans}:
     *   get:
     *     summary: Obtener listado de préstamos
     *     description: Retorna una lista de préstamos generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Loans
     *     parameters:
     *       - in: path
     *         name: countLoans
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de préstamos a generar
     *     responses:
     *       200:
     *         description: Lista de préstamos generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Loan'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countLoans", controller.getAllLoans);

    return router;
  }
}
