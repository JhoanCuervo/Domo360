import type { OrmnDatabase } from "./Database";

declare global {
  // `global` es inyectado por gas-webpack-plugin en el entorno de Apps Script.
  var global: typeof globalThis & {
    doGet: typeof import("../model/doGet").default;
    Auth: typeof import("../controller/Auth").Auth;
  };

  // ORMN está disponible globalmente en el entorno de Apps Script.
  const ORMN: {
    openDb(id?: string): OrmnDatabase;
  };
}

export {};
