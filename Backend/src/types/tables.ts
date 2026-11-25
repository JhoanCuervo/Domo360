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

export type Contract = {
  id: string;
  user_id: number;
  date_initial: Date | string;
  date_finish: Date | string;
  canon: number | string;
  price: number | string;
  extension_month: number | string;
  extension: number | string | boolean;
  administration_fee: number | string;
  status: string | boolean;
  apartment_id: string;
};

export type User = {
  id: number;
  name: string;
  alias: string;
  rol: string;
  email: string;
  phone: string;
};
