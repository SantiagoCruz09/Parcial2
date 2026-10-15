# Parcial II: Microfrontends y Clean Architecture

Monorepo con un host Angular, tres microfrontends federados y tres microservicios REST.
Cada microfrontend usa el microservicio que le corresponde y separa dominio, aplicación,
infraestructura y presentación.

## Estructura

- `Client-Host-Angular`: host y navegación.
- `Microfrontend-Books-Angular`, `Microfrontend-Authors-Angular`, `Microfrontend-Loans-Angular`: remotos Angular.
- `Microservice-Books-NodeJS`, `Microservice-Loans-NodeJS`: APIs Node.js.
- `Microservice-Authors-SpringBoot`: API Spring Boot.

## Requisitos

- Node.js 24 o superior y npm.
- Java 17 o superior.
- El microservicio Authors usa el Maven Wrapper incluido.

## Instalación

Ejecutar `npm install` dentro de cada una de estas seis carpetas:

```text
Client-Host-Angular
Microfrontend-Books-Angular
Microfrontend-Authors-Angular
Microfrontend-Loans-Angular
Microservice-Books-NodeJS
Microservice-Loans-NodeJS
```

En Windows se puede usar `npm install` desde PowerShell. En Mac/Linux se usa el mismo comando.

## Puertos

| Aplicación | Tecnología | Puerto |
| --- | --- | ---: |
| Client-Host-Angular | Angular | 4200 |
| Microfrontend-Books-Angular | Angular | 4201 |
| Microfrontend-Authors-Angular | Angular | 4202 |
| Microfrontend-Loans-Angular | Angular | 4203 |
| Microservice-Books-NodeJS | Node.js/Express | 3001 |
| Microservice-Authors-SpringBoot | Spring Boot | 3002 |
| Microservice-Loans-NodeJS | Node.js/Express | 3003 |

| Microfrontend | Microservicio consumido | Puerto |
| --- | --- | ---: |
| Books | Microservice-Books-NodeJS | 3001 |
| Authors | Microservice-Authors-SpringBoot | 3002 |
| Loans | Microservice-Loans-NodeJS | 3003 |

## Ejecución

El orden es: microservicios, microfrontends y host. Cada comando se ejecuta en una terminal
separada.

Mac/Linux:

```bash
cd Microservice-Books-NodeJS && npm start
cd Microservice-Authors-SpringBoot && ./mvnw spring-boot:run
cd Microservice-Loans-NodeJS && npm start
cd Microfrontend-Books-Angular && npm start
cd Microfrontend-Authors-Angular && npm start
cd Microfrontend-Loans-Angular && npm start
cd Client-Host-Angular && npm start
```

Windows PowerShell usa `npm start` para Node/Angular y este comando para Authors:

```powershell
cd Microservice-Authors-SpringBoot
.\mvnw.cmd spring-boot:run
```

El host queda en `http://localhost:4200`. Los remotos exponen `remoteEntry.js` en sus
respectivos puertos.

## APIs y Swagger

- Books: `http://localhost:3001/api/docs`
- Authors: `http://localhost:3002/swagger-ui/index.html`
- Loans: `http://localhost:3003/api/docs`

Endpoints principales:

- Books: `GET /api/books/{countBooks}`, `GET /api/books/genre/{genre}/{countBooks}`,
  `GET /api/books/detail/{id}`.
- Authors: `GET /api/authors/{countAuthors}`,
  `GET /api/authors/nationality/{nationality}/{countAuthors}`,
  `GET /api/authors/detail/{authorId}`.
- Loans: `GET /api/loans/{countLoans}`,
  `GET /api/loans/status/{status}/{countLoans}`, `GET /api/loans/detail/{id}`.

## Pruebas, build y documentación

En cada proyecto Angular:

```bash
npm test -- --runInBand
npm run test:coverage
npm run build
npm run docs:coverage
```

En Books y Loans:

```bash
npm test
npm run build
npm run typecheck
```

En Authors:

```bash
./mvnw test
```

Para generar la documentación Compodoc sin validar el porcentaje se usa `npm run docs`.
La salida se escribe en `documentation/` y no se versiona.
