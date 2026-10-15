# Microfrontend Authors (Angular)

Microfrontend del catálogo de autores del proyecto **Microfrontends & Clean Architecture**.
Consume exclusivamente el microservicio **Authors (Spring Boot)** mediante su API REST.

- Generado con Angular CLI 20.3.14.
- Module Federation (webpack) — módulo remoto `mf-authors`.
- Arquitectura Limpia (Clean Architecture) por capas.

## 🏗️ Arquitectura

```
src/app
├── domain          # modelos y contratos de repositorio (núcleo)
│   ├── models            # Author
│   └── repositories      # AuthorRepository (puerto)
├── application     # casos de uso
│   └── use-cases         # GetAuthors, FilterAuthorsByNationality, SearchAuthorsByName
├── infrastructure  # adaptadores
│   ├── config            # API_CONFIG (URLs de microservicios)
│   └── repositories      # HttpAuthorRepository (adaptador HTTP)
└── presentation    # interfaz de usuario
    ├── components        # AuthorCard
    └── pages/authors     # AuthorsPage (página principal)
```

## 🔌 Module Federation

| Propiedad | Valor |
| --- | --- |
| Nombre del módulo | `mf-authors` |
| Archivo remoto | `remoteEntry.js` |
| Módulo expuesto | `./AuthorsPage` |
| Puerto | `4202` |

El host (`Client-Host-Angular`) carga esta página con:

```ts
loadRemoteModule({
  type: 'module',
  remoteEntry: 'http://localhost:4202/remoteEntry.js',
  exposedModule: './AuthorsPage',
}).then((m) => m.AuthorsPage);
```

## 📡 API consumida

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `http://localhost:3002/api/authors/{count}` | Obtiene `count` autores |

> El microfrontend Authors **solo** consume el microservicio Authors (`:3002`).

## 🧠 Casos de uso

1. **GetAuthorsUseCase** — obtiene autores desde el microservicio.
2. **FilterAuthorsByNationalityUseCase** — filtra los autores por nacionalidad.
3. **SearchAuthorsByNameUseCase** — busca autores por nombre.

## 🚀 Ejecución

```bash
npm install
npm run start   # http://localhost:4202
```

Verifica que el microservicio Authors esté en ejecución en `http://localhost:3002`.

## 🧪 Pruebas

Pruebas unitarias con **Jest** (cobertura > 90%):

```bash
npm test               # ejecuta las pruebas
npm run test:coverage  # reporte de cobertura
```

## 🔨 Build

```bash
npm run build   # genera dist/ con remoteEntry.js
```

## 📚 Documentación técnica

```bash
npm run compodoc   # genera la documentación en ./documentation
```
