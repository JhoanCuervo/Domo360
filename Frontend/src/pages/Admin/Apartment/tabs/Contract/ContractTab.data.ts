import type { Contract } from "../../../../../types/apartment";
import { formatDate, formatMoney } from "../../ApartmentCard";

/** Fila de datos del contrato para la card. */
export type ContractRow = {
  label: string;
  value: string;
};

/** Un valor de la hoja existe cuando no es vacío. */
const hasValue = (value: unknown): boolean =>
  value !== null && value !== undefined && String(value).trim() !== "";

/** Estado del contrato en texto legible. */
const formatStatus = (status: string | boolean): string =>
  typeof status === "boolean" ? (status ? "Activo" : "Inactivo") : status;

/**
 * Datos del contrato, ya formateados y sin valores vacíos, listos
 * para renderizar en la card de la pestaña Contrato.
 */
export const getContractRows = (contract: Contract): ContractRow[] =>
  [
    {
      label: "Número de contrato",
      value: hasValue(contract.id) ? String(contract.id) : "",
    },
    { label: "Fecha de inicio", value: formatDate(contract.date_initial) },
    { label: "Fecha de fin", value: formatDate(contract.date_finish) },
    {
      label: "Canon de arrendamiento",
      value: hasValue(contract.canon) ? formatMoney(contract.canon) : "",
    },
    {
      label: "Depósito",
      value: hasValue(contract.price) ? formatMoney(contract.price) : "",
    },
    {
      label: "Meses de extensión",
      value: hasValue(contract.extension_month)
        ? String(contract.extension_month)
        : "",
    },
    {
      label: "Extensión",
      value: hasValue(contract.extension) ? String(contract.extension) : "",
    },
    {
      label: "Cuota de administración",
      value: hasValue(contract.administration_fee)
        ? formatMoney(contract.administration_fee)
        : "",
    },
    { label: "Estado", value: formatStatus(contract.status) },
  ].filter((row) => row.value !== "");
