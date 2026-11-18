/**
 * Utilidades de formato compartidas por toda la interfaz. Cualquier número
 * que se muestre con separadores de miles debe pasar por aquí para que el
 * formato sea el mismo en todas las pantallas.
 */

/** Número con separadores de miles ("1.309.917.106"). */
export const formatNumber = (value: number): string =>
  Number.isFinite(value) ? value.toLocaleString("es-CO") : "—";

type CurrencyOptions = {
  /** Decimales máximos; por defecto 0, como en las cifras del contrato. */
  decimals?: number;
  /** Texto que se devuelve cuando el valor no es un número. */
  fallback?: string;
};

/** Monto en pesos colombianos ("$ 500.000"). */
export const formatCurrency = (
  value: number,
  { decimals = 0, fallback = "—" }: CurrencyOptions = {},
): string => {
  if (!Number.isFinite(value)) return fallback;

  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: decimals,
  });
};
