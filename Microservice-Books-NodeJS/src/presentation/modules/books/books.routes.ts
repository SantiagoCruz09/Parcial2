import { Router } from "express";
import { BooksController } from "./books.controller";

export class BooksRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new BooksController();

    /**
     * @openapi
     * /api/books/detail/{id}:
     *   get:
     *     summary: Obtener un libro por id
     *     description: Retorna un libro generado dinámicamente con el id solicitado.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: id
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 1
     *         description: Identificador del libro
     *     responses:
     *       200:
     *         description: Libro solicitado
     *         content:
     *           application/json:
     *             schema:
     *               $ref: '#/components/schemas/Book'
     *       400:
     *         description: Id inválido
     */
    router.get("/detail/:id", controller.getBookById);

    /**
     * @openapi
     * /api/books/genre/{genre}/{countBooks}:
     *   get:
     *     summary: Obtener libros por género
     *     description: Retorna una lista de libros generados dinámicamente con el género indicado.
     *     tags:
     *       - Books
     *     parameters:
     *       - in: path
     *         name: genre
     *         required: true
     *         schema:
     *           type: string
     *           enum:
     *             - Novela
     *             - Cuento
     *             - Poesía
     *             - Ensayo
     *             - Ciencia Ficción
     *           example: Novela
     *         description: Género literario de los libros
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
     *         description: Lista de libros del género indicado
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Book'
     *       400:
     *         description: Género o cantidad inválidos
     */
    router.get("/genre/:genre/:countBooks", controller.getBooksByGenre);

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
