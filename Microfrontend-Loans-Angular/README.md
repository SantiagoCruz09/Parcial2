# Microfrontend Loans (Angular)

Microfrontend del catálogo de préstamos del proyecto **Microfrontends & Clean Architecture**.
Consume exclusivamente el microservicio **Loans (Node.js + Express)** mediante su API REST.

- Generado con Angular CLI 20.3.14.
- Module Federation (webpack) — módulo remoto `mf-loans`.
- Arquitectura Limpia (Clean Architecture) por capas.

## 🏗️ Arquitectura

```
src/app
├── domain          # modelos y contratos de repositorio (núcleo)
│   ├── models            # Loan
│   └── repositories      # LoanRepository (puerto)
├── application     # casos de uso
│   └── use-cases         # GetLoans, FilterLoansByStatus, SearchLoansByUser
├── infrastructure  # adaptadores
│   ├── config            # API_CONFIG (URLs de microservicios)
│   └── repositories      # HttpLoanRepository (adaptador HTTP)
└── presentation    # interfaz de usuario
    ├── components        # LoanCard
    └── pages/loans       # LoansPage (página principal)
```

## 🔌 Module Federation

| Propiedad | Valor |
| --- | --- |
| Nombre del módulo | `mf-loans` |
| Archivo remoto | `remoteEntry.js` |
| Módulo expuesto | `./LoansPage` |
| Puerto | `4203` |

El host (`Client-Host-Angular`) carga esta página con:

```ts
loadRemoteModule({
  type: 'module',
  remoteEntry: 'http://localhost:4203/remoteEntry.js',
  exposedModule: './LoansPage',
}).then((m) => m.LoansPage);
```

## 📡 API consumida

| Método | Endpoint | Descripción |
| --- | --- | --- |
| GET | `http://localhost:3003/api/loans/{count}` | Obtiene `count` préstamos |

> El microfrontend Loans **solo** consume el microservicio Loans (`:3003`).

## 🧠 Casos de uso

1. **GetLoansUseCase** — obtiene los préstamos desde el microservicio.
2. **FilterLoansByStatusUseCase** — filtra los préstamos por estado (`Activo`, `Devuelto`, `Vencido`).
3. **SearchLoansByUserUseCase** — busca préstamos por nombre de usuario.

## 🚀 Ejecución

```bash
npm install
npm run start   # http://localhost:4203
```

Verifica que el microservicio Loans esté en ejecución en `http://localhost:3003`.

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
