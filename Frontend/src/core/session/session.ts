import type { SessionUser } from "../../types/session";

const sessionName = "userAuth";

/** Guarda el usuario en `localStorage`. */
export const saveSession = (user: SessionUser) => {
  localStorage.setItem(sessionName, JSON.stringify(user));
};

/** Lee el usuario de `localStorage` (o `null` si no hay sesión). */
export const getSession = (): SessionUser | null => {
  const user = localStorage.getItem(sessionName);
  if (!user) return null;

  try {
    return JSON.parse(user) as SessionUser;
  } catch {
    return null;
  }
};

/** Elimina la sesión de `localStorage`. */
export const clearSession = () => {
  localStorage.removeItem(sessionName);
};
