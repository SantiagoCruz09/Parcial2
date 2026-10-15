/**
 * Configuración de acceso a las APIs de los microservicios.
 *
 * @remarks
 * Centraliza las URLs base de los microservicios consumidos por
 * los microfrontends. El microfrontend de Loans consume
 * exclusivamente el microservicio de Loans.
 */
export const API_CONFIG = {
  /** URL base del microservicio Loans (Node.js) */
  loansApiUrl: 'http://localhost:3003',
} as const;
