import { Apartment, Contract, User } from "./tables";

/** Métodos que ORMN agrega a los registros guardados en una tabla. */
export type OrmnRecord<T> = T & {
  _rowIndex?: number;
  _save(): void;
  _delete(): void;
};

/** Operaciones disponibles para una tabla de ORMN. */
export interface OrmnTable<T> {
  _all(): { data: T[] };
  _find(id: string | number): OrmnRecord<T> | null | undefined;
  _findManyBy(
    field: string,
    value: unknown,
    options?: { caseInsensitive?: boolean },
  ): { data: T[] };
  _firstBy(
    field: string,
    value: unknown,
    options?: { caseInsensitive?: boolean },
  ): OrmnRecord<T> | null | undefined;
  _create(data: T): OrmnRecord<T>;
  _findManyByQuery(query: string): { data: T[] };
  _firstByQuery(query: string): OrmnRecord<T> | null | undefined;
}

/** Acceso a las tablas abiertas por ORMN. */

export interface OrmnDatabase {
  _getTables(): Record<string, OrmnTable<Record<string, unknown>>> & {
    apartments: OrmnTable<Apartment>;
    contracts: OrmnTable<Contract>;
    users: OrmnTable<User>;
  };
}
