/**
 * Cliente de la API en Apps Script.
 *
 *   await api("ping");
 *   const { rows } = await api("recordsList", { sheet: "Productos" });
 *   await api("recordsInsert", { sheet: "Productos", values: { Nombre: "Café" } });
 *
 * El nombre de la acción debe coincidir con una función global expuesta
 * por el backend (p. ej. global.Auth en Backend/src/Index.ts).
 *
 * El backend devuelve todo con JSON.stringify para evitar que
 * google.script.run pierda valores (fechas, métodos de ORMN, etc.);
 * aquí se revierte ese paso antes de entregar el resultado al caller.
 */

export type ApiParams = Record<string, unknown>;

type ServerFunction = (params?: unknown) => void;

type Runner = {
  withSuccessHandler(callback: (result: unknown) => void): Runner;
  withFailureHandler(callback: (error: unknown) => void): Runner;
} & Record<string, ServerFunction | undefined>;

/** Si el servidor respondió un JSON serializado, lo convierte de vuelta. */
const parseResult = (result: unknown): unknown => {
  if (typeof result !== "string") return result;

  try {
    return JSON.parse(result) as unknown;
  } catch {
    return result;
  }
};

const getRunner = (): Runner => {
  const runner = (window as unknown as { google?: { script?: { run?: Runner } } })
    .google?.script?.run;

  if (!runner) {
    throw new Error(
      "google.script.run no está disponible: abre la app desde Apps Script."
    );
  }

  return runner;
};

/** Ejecuta `action(params)` en Apps Script: api("Auth", { idAuth }) → google.script.run.Auth({ idAuth }). */
export const api = <T = unknown>(
  action: string,
  params: ApiParams = {}
): Promise<T> =>
  new Promise((resolve, reject) => {
    const call = getRunner()
      .withSuccessHandler((result) => resolve(parseResult(result) as T))
      .withFailureHandler((error) =>
        reject(new Error(error instanceof Error ? error.message : String(error)))
      );

    const fn = call[action];

    if (typeof fn !== "function") {
      reject(new Error(`La acción "${action}" no existe en el servidor.`));
      return;
    }

    fn(params);
  });

export default api;
