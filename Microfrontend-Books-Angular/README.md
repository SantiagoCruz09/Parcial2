# Microfrontend Books Angular

Microfrontend federado de libros. Escucha en el puerto 4201 y consume únicamente
`Microservice-Books-NodeJS` en el puerto 3001.

## Module Federation

- Nombre remoto: `mf-books`.
- Módulo expuesto: `./BooksPage`.
- Archivo remoto: `http://localhost:4201/remoteEntry.js`.

## Clean Architecture y casos de uso

- `domain`: modelo `Book` y contrato `BookRepository`.
- `application`: `GetBooksUseCase`, `FilterBooksByGenreUseCase` y
  `GetBookByIdUseCase`.
- `infrastructure`: `HttpBookRepository` y configuración de la API.
- `presentation`: `BooksPage` y `BookCard`.

Los casos de uso no dependen de Angular. La página usa los casos de uso y el repositorio
usa `HttpClient` para llamar a `/api/books/{countBooks}`, `/api/books/genre/{genre}/{countBooks}`
y `/api/books/detail/{id}`.

## Ejecución, pruebas y documentación

```bash
npm install
npm start
npm test -- --runInBand
npm run test:coverage
npm run build
npm run docs:coverage
```
