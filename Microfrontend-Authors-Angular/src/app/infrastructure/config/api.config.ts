/**
 * Configuración de acceso a las APIs de los microservicios.
 *
 * @remarks
 * Centraliza las URLs base de los microservicios consumidos por
 * los microfrontends. El microfrontend de Authors consume
 * exclusivamente el microservicio de Authors.
 */
export const API_CONFIG = {
  /** URL base del microservicio Authors (Spring Boot) */
  authorsApiUrl: 'http://localhost:3002',
} as const;
