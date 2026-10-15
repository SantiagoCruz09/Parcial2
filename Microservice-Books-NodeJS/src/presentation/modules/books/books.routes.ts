import { Router } from "express";
import { BooksController } from "./books.controller";

export class BooksRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new BooksController();

    /**
     * @openapi
     * /api/books/{countBooks}:
     *   get:
     *     summary: Obtener listado de libros
     *     description: Retorna una lista de libros generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: countBooks
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de libros a generar
     *     responses:
     *       200:
     *         description: Lista de libros generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countBooks", controller.getAllBooks);

    return router;
  }
}
