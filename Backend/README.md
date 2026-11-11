# Backend — Domo360

Backend mínimo en **Google Apps Script** + **TypeScript**. Solo expone `doGet`, que sirve el frontend (`index.html`) del Web App.

## Estructura

```text
src/
  Index.ts          # doGet, punto de entrada del Web App
  types/globals.d.ts
server/
  appsscript.json   # configuración del proyecto de Apps Script
  code.js           # bundle generado por Webpack
```

## Comandos

```bash
npm install
npm run typecheck
npm run lint
npm run build   # genera server/code.js
npm run push    # compila y publica con clasp
```

## Requisito

`doGet` busca `index.html` en el proyecto de Apps Script (`server/`). El frontend (Vite) hoy compila en `../Server`, así que copia el `index.html` generado a `Backend/server/` o apunta el `outDir` de Vite a esta carpeta antes de desplegar.

`.clasp.json` y `.env` están en `.gitignore`.
