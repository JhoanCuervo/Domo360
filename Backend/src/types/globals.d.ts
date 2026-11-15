import type { OrmnDatabase } from "./Database";

declare global {
  // `global` es inyectado por gas-webpack-plugin en el entorno de Apps Script.
  var global: typeof globalThis & {
    doGet: typeof import("../model/doGet").default;
    Auth: typeof import("../controller/Admin/Auth").Auth;
    Home: typeof import("../controller/Admin/Home").Home;
    Apartment: typeof import("../controller/Admin/Apartment").Apartment;
    fileBase64: typeof import("../utils/Drive").fileBase64;
  };

  // ORMN está disponible globalmente en el entorno de Apps Script.
  const ORMN: {
    openDb(id?: string): OrmnDatabase;
  };
}

export {};
