import type { IconType } from "react-icons";
import type { User } from "./user";
/** Cuenta de un servicio del inmueble tal como se guarda en `services`. */
export type ServiceDetail = {
  company?: string;
  accountNumber?: number;
  pageCompany?: string;
  status: boolean;
};

/**
 * Servicios del inmueble indexados por clave (`energia`, `gas`, `aseo`…).
 * La clave es libre: cualquier servicio nuevo que llegue desde la base se
 * dibuja con su icono o con el icono genérico.
 */
export type ApartmentServices = Record<string, ServiceDetail>;

export type Apartment = {
  id: string;
  tower: string;
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
  services: string;
  fileTower: string;
};
export type AllApartments = Apartment[];

/**
 * Respuesta de la acción `Apartment`: el inmueble junto con su
 * arrendatario y su contrato.
 */
export type Tenant = User;

/** Registro de la tabla Contracts en Google Sheets. */
export type Contract = {
  id: number;
  user_id: number;
  date_initial: string;
  date_finish: string;
  canon: number;
  deposit: number;
  extension_month: boolean;
  extension: number;
  administration_fee: number;
  status: boolean;
  file: string;
};

export type ApartmentDetail = {
  // apartment: Omit<Apartment, "user_id" | "contract_id">;
  apartment: Apartment;
  tenant: Tenant;
  contract: Contract;
};

export type ServicePreset = {
  label: string;
  description: string;
  icon: IconType;
};
