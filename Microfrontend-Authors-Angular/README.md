# Microfrontend Authors Angular

Microfrontend federado de autores. Escucha en el puerto 4202 y consume únicamente
`Microservice-Authors-SpringBoot` en el puerto 3002.

## Module Federation

- Nombre remoto: `mf-authors`.
- Módulo expuesto: `./AuthorsPage`.
- Archivo remoto: `http://localhost:4202/remoteEntry.js`.

## Clean Architecture y casos de uso

- `domain`: modelo `Author` y contrato `AuthorRepository`.
- `application`: `GetAuthorsUseCase`, `FilterAuthorsByNationalityUseCase` y
  `SearchAuthorsByNameUseCase`.
- `infrastructure`: `HttpAuthorRepository` y configuración de la API.
- `presentation`: `AuthorsPage` y `AuthorCard`.

Los casos de uso no dependen de Angular. La página usa los casos de uso y el repositorio
usa `HttpClient` para llamar a `/api/authors/{countAuthors}`,
`/api/authors/nationality/{nationality}/{countAuthors}` y `/api/authors/detail/{authorId}`.

## Ejecución, pruebas y documentación

```bash
npm install
npm start
npm test -- --runInBand
npm run test:coverage
npm run build
npm run docs:coverage
```
