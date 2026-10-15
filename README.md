# 🧪 Taller: Microfrontends y Microservices en Angular y NodeJS

- Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) 20.3.14.
- El objetivo es practicar una arquitectura distribuida de microfrontends (Angular + Module Federation)
  integrada con microservicios (Node.js / Spring Boot) aplicando **Arquitectura Limpia (Clean Architecture)**.

## 🏗️ Arquitectura

```
Host (Client-Host-Angular)
  ├── MF1 Books   ──► MS1 Books   (Node.js)        :3001
  ├── MF2 Authors ──► MS2 Authors (Spring Boot)    :3002
  └── MF3 Loans   ──► MS3 Loans   (Node.js)        :3003
```

Cada microfrontend consume **exclusivamente** su microservicio asignado mediante API REST.
Todos los componentes aplican separación por capas (dominio, aplicación, infraestructura, presentación).

## 📋 Requisitos Previos

- Node.js
- npm
- Angular CLI
- Java 17 (para el microservicio Spring Boot)
- Git
- Visual Studio Code

## 🧩 Estado del proyecto

| Componente | Tecnología | Puerto | Estado |
| --- | --- | --- | --- |
| Microservice Books | Node.js + Express | 3001 | ✅ Estructura creada |
| Microservice Authors | Spring Boot | 3002 | ✅ Estructura creada |
| Microservice Loans | Node.js + Express | 3003 | ✅ Estructura creada |
| Host (Client-Host-Angular) | Angular | 4200 | ✅ Rutas y navbar configurados |
| Microfrontend Books | Angular | 4201 | ✅ Implementado (consume MS Books :3001) |
| Microfrontend Authors | Angular | 4202 | ✅ Implementado (consume MS Authors :3002) |
| Microfrontend Loans | Angular | 4203 | ✅ Implementado (consume MS Loans :3003) |

> Nota: el host tiene configuradas las rutas `/books`, `/authors` y `/loans`
> apuntando a los remotos `4201`, `4202` y `4203`. Los tres microfrontends
> están implementados con Module Federation y Clean Architecture.

## 🔌 API de cada microservicio

### Microservice-Books-NodeJS (Node.js)
- Servicio: `http://localhost:3001`
- Swagger: `http://localhost:3001/api/docs`
- Endpoint: `GET http://localhost:3001/api/books/{countBooks}`

### Microservice-Authors-SpringBoot (Spring Boot)
- Servicio: `http://localhost:3002`
- Swagger UI: `http://localhost:3002/api/docs`
- OpenAPI JSON: `http://localhost:3002/v3/api-docs`
- Endpoint: `GET http://localhost:3002/api/authors/{countAuthors}`

### Microservice-Loans-NodeJS (Node.js)
- Servicio: `http://localhost:3003`
- Swagger: `http://localhost:3003/api/docs`
- Endpoint: `GET http://localhost:3003/api/loans/{countLoans}`

## 🚀 Ejecución

### Instalar dependencias

```bash
# Microservicio Books
cd Microservice-Books-NodeJS
npm i

# Microservicio Loans
cd ../Microservice-Loans-NodeJS
npm i
```

El microservicio Spring Boot usa el Maven Wrapper incluido (no requiere Maven instalado).

### Ejecutar los microservicios

```bash
# Books  -> http://localhost:3001
cd Microservice-Books-NodeJS
npm run start

# Loans  -> http://localhost:3003
cd Microservice-Loans-NodeJS
npm run start
```

```bash
# Authors (Spring Boot) -> http://localhost:3002
cd Microservice-Authors-SpringBoot
./mvnw spring-boot:run
```

### Ejecutar los microfrontends

Cada microfrontend se ejecuta de forma independiente y expone su `remoteEntry.js`
para que el host lo consuma vía Module Federation.

```bash
# Microfrontend Books -> http://localhost:4201  (remoteEntry: /remoteEntry.js)
cd Microfrontend-Books-Angular
npm install
npm run start
```

```bash
# Microfrontend Authors -> http://localhost:4202  (remoteEntry: /remoteEntry.js)
cd Microfrontend-Authors-Angular
npm install
npm run start
```

```bash
# Microfrontend Loans -> http://localhost:4203  (remoteEntry: /remoteEntry.js)
cd Microfrontend-Loans-Angular
npm install
npm run start
```

Pruebas unitarias (Jest) de los microfrontends:

```bash
cd Microfrontend-Books-Angular
npm test              # ejecuta las pruebas con cobertura
npm run test:coverage # reporte de cobertura
```

## 🗂️ Estructura Clean Architecture (microservicios)

```
src
├── config          # variables de entorno, Swagger
├── domain          # modelos, interfaces, errores (núcleo)
│   ├── erros
│   └── interfaces
└── presentation    # servidor, rutas y módulos (controladores/servicios)
```

En Spring Boot:

```
src/main/java/com/uceva/authors
├── domain          # modelo y contratos de repositorio
├── application     # casos de uso y servicios
├── infrastructure  # repositorios y configuración (CORS)
└── presentation    # controladores REST
```

### Microfrontend Books (Angular + Module Federation)

```
src/app
├── domain          # modelos y contratos de repositorio (núcleo)
│   ├── models
│   └── repositories
├── application     # casos de uso
│   └── use-cases   # GetBooks, FilterBooksByGenre, SearchBooksByTitle
├── infrastructure  # adaptadores HTTP y configuración
│   ├── config
│   └── repositories
└── presentation    # componentes y páginas
    ├── components
    └── pages
```

- **Módulo federado:** `mf-books`
- **Módulo expuesto:** `./BooksPage` (`src/app/presentation/pages/books/books.page.ts`)
- **Microservicio consumido:** `http://localhost:3001` (`GET /api/books/{count}`)

### Microfrontend Authors (Angular + Module Federation)

```
src/app
├── domain          # modelos y contratos de repositorio (núcleo)
│   ├── models
│   └── repositories
├── application     # casos de uso
│   └── use-cases   # GetAuthors, FilterAuthorsByNationality, SearchAuthorsByName
├── infrastructure  # adaptadores HTTP y configuración
│   ├── config
│   └── repositories
└── presentation    # componentes y páginas
    ├── components
    └── pages
```

- **Módulo federado:** `mf-authors`
- **Módulo expuesto:** `./AuthorsPage` (`src/app/presentation/pages/authors/authors.page.ts`)
- **Microservicio consumido:** `http://localhost:3002` (`GET /api/authors/{count}`)

### Microfrontend Loans (Angular + Module Federation)

```
src/app
├── domain          # modelos y contratos de repositorio (núcleo)
│   ├── models
│   └── repositories
├── application     # casos de uso
│   └── use-cases   # GetLoans, FilterLoansByStatus, SearchLoansByUser
├── infrastructure  # adaptadores HTTP y configuración
│   ├── config
│   └── repositories
└── presentation    # componentes y páginas
    ├── components
    └── pages
```

- **Módulo federado:** `mf-loans`
- **Módulo expuesto:** `./LoansPage` (`src/app/presentation/pages/loans/loans.page.ts`)
- **Microservicio consumido:** `http://localhost:3003` (`GET /api/loans/{count}`)


