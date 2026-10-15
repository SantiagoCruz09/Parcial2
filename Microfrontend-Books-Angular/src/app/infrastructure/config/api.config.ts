/**
 * Configuración de acceso a las APIs de los microservicios.
 *
 * @remarks
 * Centraliza las URLs base de los microservicios consumidos por
 * los microfrontends. El microfrontend de Books consume
 * exclusivamente el microservicio de Books.
 */
export const API_CONFIG = {
  /** URL base del microservicio Books (Node.js) */
  booksApiUrl: 'http://localhost:3001',
} as const;
