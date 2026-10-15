/**
 * Modelo de dominio que representa un préstamo de libro.
 *
 * @remarks
 * Este modelo es la representación de negocio de un préstamo dentro
 * del microfrontend de Loans. No depende de ninguna tecnología
 * externa (HTTP, framework, etc.), manteniendo el núcleo
 * desacoplado de la infraestructura.
 *
 * @example
 * ```ts
 * const prestamo: Loan = {
 *   id: 1,
 *   bookTitle: 'Cien años de soledad',
 *   userName: 'Ana Torres',
 *   loanDate: '2024-05-01',
 *   returnDate: '2024-05-15',
 *   status: 'Activo',
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
 * Estados soportados por el dominio para un préstamo.
 *
 * @remarks
 * Restringe los estados a un conjunto cerrado de valores válidos.
 */
export type LoanStatus = 'Activo' | 'Devuelto' | 'Vencido';

/**
 * Lista de estados disponibles para filtros de la interfaz.
 */
export const LOAN_STATUSES: readonly LoanStatus[] = [
  'Activo',
  'Devuelto',
  'Vencido',
] as const;

/**
 * Valor especial de filtro que representa "todos los estados".
 */
export type LoanStatusFilter = LoanStatus | 'all';
