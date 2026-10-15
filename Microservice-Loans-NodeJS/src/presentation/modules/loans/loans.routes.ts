import { Router } from "express";
import { LoansController } from "./loans.controller";

export class LoansRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new LoansController();

    /**
     * @openapi
     * /api/loans/detail/{id}:
     *   get:
     *     summary: Obtener un préstamo por id
     *     description: Retorna un préstamo generado dinámicamente con el id solicitado.
     *     tags:
     *       - Loans
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador del préstamo
     *     responses:
     *       200:
     *         description: Préstamo solicitado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Loan'
     *       400:
     *         description: Id inválido
     */
    router.get("/detail/:id", controller.getLoanById);

    /**
     * @openapi
     * /api/loans/status/{status}/{countLoans}:
     *   get:
     *     summary: Obtener préstamos por estado
     *     description: Retorna una lista de préstamos generados dinámicamente con el estado indicado.
     *     tags:
     *       - Loans
     *     parameters:
     *       - in: path
     *         name: status
     *         required: true
     *         schema:
     *           type: string
     *           enum:
     *             - Activo
     *             - Devuelto
     *             - Vencido
     *           example: Activo
     *         description: Estado de los préstamos
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
     *         description: Lista de préstamos del estado indicado
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Loan'
     *       400:
     *         description: Estado o cantidad inválidos
     */
    router.get("/status/:status/:countLoans", controller.getLoansByStatus);

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
