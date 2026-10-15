/**
 * @openapi
 * components:
 *   schemas:
 *     Loan:
 *       type: object
 *       description: Representa un préstamo de libro del sistema
 *       required:
 *         - id
 *         - bookTitle
 *         - userName
 *         - loanDate
 *         - returnDate
 *         - status
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         bookTitle:
 *           type: string
 *           example: Cien años de soledad
 *         userName:
 *           type: string
 *           example: Ana Torres
 *         loanDate:
 *           type: string
 *           format: date
 *           example: 2024-05-01
 *         returnDate:
 *           type: string
 *           format: date
 *           example: 2024-05-15
 *         status:
 *           type: string
 *           enum:
 *             - Activo
 *             - Devuelto
 *             - Vencido
 *           example: Activo
 */
export {};
