# Microservice Authors Spring Boot

API REST de autores en Spring Boot. Escucha en el puerto 3002 y es consumida por
`Microfrontend-Authors-Angular`.

## Clean Architecture

- `domain`: modelo `Author` y contrato `AuthorRepository`.
- `application/usecase`: `GetAllAuthorsUseCase`, `GetAuthorsByNationalityUseCase` y
  `GetAuthorByIdUseCase`.
- `infrastructure/repository`: repositorio en memoria y configuración CORS.
- `presentation/controller`: endpoints REST y documentación OpenAPI.

## Endpoints y Swagger

- `GET /api/authors/{countAuthors}`: lista autores.
- `GET /api/authors/nationality/{nationality}/{countAuthors}`: filtra por nacionalidad.
- `GET /api/authors/detail/{authorId}`: obtiene el detalle por id.
- Swagger UI: `http://localhost:3002/swagger-ui/index.html`.
- OpenAPI: `http://localhost:3002/v3/api-docs`.

## Ejecución y pruebas

Mac/Linux:

```bash
./mvnw spring-boot:run
./mvnw test
```

Windows:

```powershell
.\mvnw.cmd spring-boot:run
.\mvnw.cmd test
```
