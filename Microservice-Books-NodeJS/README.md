# Microservice Books NodeJS

API REST de libros en Node.js y Express. Escucha en el puerto 3001 y es consumida por
`Microfrontend-Books-Angular`.

## Clean Architecture

- `domain`: entidad `Book` y contrato `BookRepository`.
- `application/use-cases`: `GetAllBooksUseCase`, `GetBooksByGenreUseCase` y `GetBookByIdUseCase`.
- `infrastructure/repositories`: repositorio en memoria.
- `presentation`: servidor, rutas y controlador HTTP.

Los controladores validan la entrada y delegan la operación en los casos de uso.

## Endpoints y Swagger

- `GET /api/books/{countBooks}`: lista libros.
- `GET /api/books/genre/{genre}/{countBooks}`: filtra por género.
- `GET /api/books/detail/{id}`: obtiene el detalle por id.
- Swagger UI: `http://localhost:3001/api/docs`.

## Ejecución y pruebas

```bash
npm install
npm start
npm test
npm run build
npm run typecheck
```
