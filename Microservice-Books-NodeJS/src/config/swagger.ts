import swaggerJsdoc = require('swagger-jsdoc');

/**
 * Especificación de Swagger (OpenAPI) para la API de Books.
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
      title: 'API Microservice Books',
      version: '1.0.0',
      description: 'Documentación de la API de Books con Swagger',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
  },
  apis: [
    './src/presentation/modules/**/*.routes.ts',
    './src/config/swagger.schemas.ts',
  ],
});
