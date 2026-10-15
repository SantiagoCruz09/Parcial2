# Client Host Angular

Host Angular en el puerto 4200. Muestra el navbar y carga las páginas federadas de Books,
Authors y Loans. Si un remoto no responde, muestra `RemoteFallbackComponent`.

## Arquitectura

- `src/app/app.ts`: componente raíz y navbar.
- `src/app/app.routes.ts`: rutas federadas y manejo de error de carga.
- `src/app/remote-fallback.component.ts`: vista de respaldo.

Las rutas son `/books`, `/authors` y `/loans`. Los remotos se cargan desde los puertos 4201,
4202 y 4203.

## Ejecución y pruebas

```bash
npm install
npm start
npm test -- --runInBand
npm run test:coverage
npm run build
npm run docs:coverage
```
