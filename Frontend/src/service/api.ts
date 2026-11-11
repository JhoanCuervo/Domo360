/**
 * Cliente de la API en Apps Script.
 *
 *   await api("ping");
 *   const { rows } = await api("records.list", { sheet: "Productos" });
 *   await api("records.insert", { sheet: "Productos", values: { Nombre: "Café" } });
 */

export type ApiParams = Record<string, unknown>;

type Runner = {
  withSuccessHandler(callback: (result: unknown) => void): Runner;
  withFailureHandler(callback: (error: unknown) => void): Runner;
  api(action: string, params: ApiParams): void;
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

/** Ejecuta `api(action, params)` en Apps Script. */
export const api = <T = unknown>(
  action: string,
  params: ApiParams = {}
): Promise<T> =>
  new Promise((resolve, reject) => {
    getRunner()
      .withSuccessHandler((result) => resolve(result as T))
      .withFailureHandler((error) =>
        reject(new Error(error instanceof Error ? error.message : String(error)))
      )
      .api(action, params);
  });

export default api;
