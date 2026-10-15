# Microfrontend Books (Angular)

Microfrontend del catálogo de libros del proyecto **Microfrontends & Clean Architecture**.
Consume exclusivamente el microservicio **Books (Node.js)** mediante su API REST.

- Generado con Angular CLI 20.3.14.
- Module Federation (webpack) — módulo remoto `mf-books`.
- Arquitectura Limpia (Clean Architecture) por capas.

## 🏗️ Arquitectura

```
src/app
├── domain          # modelos y contratos de repositorio (núcleo)
│   ├── models            # Book, BookGenre
│   └── repositories      # BookRepository (puerto)
├── application     # casos de uso
│   └── use-cases         # GetBooks, FilterBooksByGenre, SearchBooksByTitle
├── infrastructure  # adaptadores
│   ├── config            # API_CONFIG (URLs de microservicios)
│   └── repositories      # HttpBookRepository (adaptador HTTP)
└── presentation    # interfaz de usuario
    ├── components        # BookCard
    └── pages/books       # BooksPage (página principal)
```

## 🔌 Module Federation

| Propiedad | Valor |
| --- | --- |
| Nombre del módulo | `mf-books` |
| Archivo remoto | `remoteEntry.js` |
| Módulo expuesto | `./BooksPage` |
| Puerto | `4201` |

El host (`Client-Host-Angular`) carga esta página con:

```ts
loadRemoteModule({
  type: 'module',
  remoteEntry: 'http://localhost:4201/remoteEntry.js',
  exposedModule: './BooksPage',
}).then((m) => m.BooksPage);
```

## 📡 API consumida

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `http://localhost:3001/api/books/{count}` | Obtiene `count` libros |

> El microfrontend Books **solo** consume el microservicio Books (`:3001`).

## 🧠 Casos de uso

1. **GetBooksUseCase** — obtiene libros desde el microservicio.
2. **FilterBooksByGenreUseCase** — filtra los libros por género.
3. **SearchBooksByTitleUseCase** — busca libros por título.

## 🚀 Ejecución

```bash
npm install
npm run start   # http://localhost:4201
```

Verifica que el microservicio Books esté en ejecución en `http://localhost:3001`.

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
