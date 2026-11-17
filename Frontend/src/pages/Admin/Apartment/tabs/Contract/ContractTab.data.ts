import type { Contract } from "../../../../../types/apartment";

/** Meses abreviados usados en las fechas del contrato. */
const MONTHS = [
  "ene.",
  "feb.",
  "mar.",
  "abr.",
  "may.",
  "jun.",
  "jul.",
  "ago.",
  "sept.",
  "oct.",
  "nov.",
  "dic.",
];

/** Convierte una fecha de la hoja en `Date` sin desfase de zona horaria. */
const parseDate = (value: string): Date | null => {
  const dateOnly = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!dateOnly) return null;

  const date = new Date(
    Number(dateOnly[1]),
    Number(dateOnly[2]) - 1,
    Number(dateOnly[3]),
  );
  return date;
};

/** Fecha con el formato de la card: "01 ago. 2026". */

export const formatContractDate = (value: string): string => {
  const pad = (value: number): string => String(value).padStart(2, "0");
  const date = parseDate(value);
  if (!date) return String(value ?? "").trim();

  return `${pad(date.getDate())} ${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
};

/** Rango de vigencia: "01 ago. 2026 – 01 feb. 2027". */
export const getContractDateRange = (contract: Contract): string =>
  [contract.date_initial, contract.date_finish]
    .map(formatContractDate)
    .filter(Boolean)
    .join(" – ");

/** Monto en pesos sin decimales, como en el diseño ("$ 500.000"). */
export const formatContractMoney = (value: number): string => {
  if (!value) return "—";

  if (!Number.isFinite(value)) return "—";

  return value.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0,
  });
};
