# Microservice Loans NodeJS

API REST de préstamos en Node.js y Express. Escucha en el puerto 3003 y es consumida por
`Microfrontend-Loans-Angular`.

## Clean Architecture

- `domain`: entidad `Loan` y contrato `LoanRepository`.
- `application/use-cases`: `GetAllLoansUseCase`, `GetLoansByStatusUseCase` y `GetLoanByIdUseCase`.
- `infrastructure/repositories`: repositorio en memoria.
- `presentation`: servidor, rutas y controlador HTTP.

Los controladores validan la entrada y delegan la operación en los casos de uso.

## Endpoints y Swagger

- `GET /api/loans/{countLoans}`: lista préstamos.
- `GET /api/loans/status/{status}/{countLoans}`: filtra por estado.
- `GET /api/loans/detail/{id}`: obtiene el detalle por id.
- Swagger UI: `http://localhost:3003/api/docs`.

## Ejecución y pruebas

```bash
npm install
npm start
npm test
npm run build
npm run typecheck
```
