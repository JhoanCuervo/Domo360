import type { Apartment } from "./apartment";
import type { User } from "./user";

/** Respuesta de `Auth`: el usuario sin el id. */
export type userResponse = Omit<User, "id"> & { apartment?: Apartment };

export type SessionUser = User;
