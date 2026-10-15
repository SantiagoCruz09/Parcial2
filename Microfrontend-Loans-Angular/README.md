# Microfrontend Loans Angular

Microfrontend federado de préstamos. Escucha en el puerto 4203 y consume únicamente
`Microservice-Loans-NodeJS` en el puerto 3003.

## Module Federation

- Nombre remoto: `mf-loans`.
- Módulo expuesto: `./LoansPage`.
- Archivo remoto: `http://localhost:4203/remoteEntry.js`.

## Clean Architecture y casos de uso

- `domain`: modelo `Loan` y contrato `LoanRepository`.
- `application`: `GetLoansUseCase`, `FilterLoansByStatusUseCase` y
  `GetLoanByIdUseCase`.
- `infrastructure`: `HttpLoanRepository` y configuración de la API.
- `presentation`: `LoansPage` y `LoanCard`.

Los casos de uso no dependen de Angular. La página usa los casos de uso y el repositorio
usa `HttpClient` para llamar a `/api/loans/{countLoans}`,
`/api/loans/status/{status}/{countLoans}` y `/api/loans/detail/{id}`.

## Ejecución, pruebas y documentación

```bash
npm install
npm start
npm test -- --runInBand
npm run test:coverage
npm run build
npm run docs:coverage
```
