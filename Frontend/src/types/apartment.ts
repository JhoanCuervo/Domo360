export type Apartment = {
  id: string;
  torre: string;
  number: string;
  address: string;
  city: string;
  departament: string;
  type: string;
  /** Google Sheets puede devolverlo como booleano o como texto ("TRUE"/"FALSE"). */
  status: boolean | string;
  /** La hoja puede devolver estos valores como número o texto, y a veces vacíos. */
  bedrooms?: string | number;
  bathrooms?: string | number;
  area?: string | number;
};
export type AllApartments = Apartment[];
