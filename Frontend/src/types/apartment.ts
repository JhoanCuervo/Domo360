import type { User } from "./user";

export type Apartment = {
  id: string;
  torre: string;
  number: string;
  address: string;
  city: string;
  departament: string;
  type: string;
  status: boolean;
  bedrooms: number;
  bathrooms: number;
  area: number;
  built_area: number;
  parking_spaces: boolean;
  has_balcony: boolean;
  has_laundry_room: boolean;
  user_id: number;
  contract_id: string;
};
export type AllApartments = Apartment[];

/**
 * Respuesta de la acción `Apartment`: el inmueble junto con su
 * arrendatario y su contrato.
 */
export type Tenant = Omit<User, "alias" | "rol">;

/** Registro de la tabla Contracts en Google Sheets. */
export type Contract = {
  id: string | number;
  user_id: number;
  date_initial: string;
  date_finish: string;
  canon: number | string;
  price: number | string;
  extension_month: number | string;
  extension: number | string | boolean;
  administration_fee: number | string;
  status: string | boolean;
};

export type ApartmentDetail = {
  apartment: Omit<Apartment, "user_id" | "contract_id">;
  tenant: Tenant;
  contract: Contract;
};
