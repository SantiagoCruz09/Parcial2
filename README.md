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
| Host (Client-Host-Angular) | Angular | 4200 | ⏳ Pendiente migrar a los nuevos dominios |
| Microfrontend Books | Angular | 4201 | ⏳ Pendiente |
| Microfrontend Authors | Angular | 4202 | ⏳ Pendiente |
| Microfrontend Loans | Angular | 4203 | ⏳ Pendiente |

> Nota: el host ya tiene configuradas las rutas `/books`, `/authors` y `/loans`
> apuntando a los remotos `4201`, `4202` y `4203`; funcionarán cuando se creen
> los microfrontends correspondientes.

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
