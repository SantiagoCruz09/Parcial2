/**
 * Interfaz que representa un préstamo de libro.
 *
 * @remarks
 * Cada préstamo debe tener un `id` único, el `bookTitle` del libro
 * prestado, el `userName` de la persona, las fechas de préstamo y
 * devolución, y un `status`.
 *
 * @example
 * ```ts
 * const prestamo: Loan = {
 *   id: 1,
 *   bookTitle: 'Cien años de soledad',
 *   userName: 'Ana Torres',
 *   loanDate: '2024-05-01',
 *   returnDate: '2024-05-15',
 *   status: 'Activo'
 * };
 * ```
 */
export interface Loan {
  /** Identificador único del préstamo */
  id: number;

  /** Título del libro prestado */
  bookTitle: string;

  /** Nombre del usuario que solicita el préstamo */
  userName: string;

  /** Fecha de préstamo */
  loanDate: string;

  /** Fecha de devolución */
  returnDate: string;

  /** Estado del préstamo */
  status: LoanStatus;
}

/**
 * Tipo de estado de un préstamo.
 *
 * @remarks
 * Este tipo restringe los estados a los valores predefinidos:
 * - 'Activo'
 * - 'Devuelto'
 * - 'Vencido'
 *
 * @example
 * ```ts
 * const estado: LoanStatus = 'Activo';
 * ```
 */
export type LoanStatus = 'Activo' | 'Devuelto' | 'Vencido';
