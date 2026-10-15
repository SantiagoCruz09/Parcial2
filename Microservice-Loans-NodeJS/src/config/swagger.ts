import swaggerJsdoc = require('swagger-jsdoc');

/**
 * Especificación de Swagger (OpenAPI) para la API de Loans.
 *
 * @remarks
 * Este objeto configura Swagger mediante `swagger-jsdoc`,
 * generando automáticamente la documentación OpenAPI a partir
 * de comentarios JSDoc presentes en los archivos de rutas.
 */
export const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Microservice Loans',
      version: '1.0.0',
      description: 'Documentación de la API de Loans con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3003',
      },
    ],
  },
  apis: [
    './src/presentation/modules/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
  ],
});
