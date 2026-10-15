/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       description: Representa un libro del sistema
 *       required:
 *         - id
 *         - title
 *         - author
 *         - genre
 *         - year
 *         - price
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: Cien años de soledad
 *         author:
 *           type: string
 *           example: Gabriel García Márquez
 *         genre:
 *           type: string
 *           enum:
 *             - Novela
 *             - Cuento
 *             - Poesía
 *             - Ensayo
 *             - Ciencia Ficción
 *           example: Novela
 *         year:
 *           type: number
 *           example: 1967
 *         price:
 *           type: number
 *           example: 45000
 */
export {};
