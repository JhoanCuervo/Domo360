import type { Apartment } from "../../../types/apartment";

/** Google Sheets puede devolver `status` como booleano o como texto. */
export const isRented = (status: Apartment["status"]) =>
  status === true || String(status).trim().toLowerCase() === "true";

/** Miniatura pública del archivo de Drive asociado al inmueble. */
export const getImageUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w600`;

