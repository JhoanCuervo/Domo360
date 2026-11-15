import type { User } from "./user";

/** Respuesta de `Auth`: el usuario sin el id. */
export type userResponse = Omit<User, "id">;

export type SessionUser = User;
