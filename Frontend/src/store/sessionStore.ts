import { create } from "zustand";

import { clearSession, getSession, saveSession } from "../core/session/session";
import type { Apartment } from "../types/apartment";
import type { SessionUser } from "../types/session";

type SessionStore = {
  user: SessionUser | null;
  apartment: Apartment | null;
  setUser: (user: SessionUser) => void;
  clearUser: () => void;
  setApartment: (apartment: Apartment | null) => void;
};

/**
 * Usuario de la sesión, disponible de forma global.
 *
 * El estado vive en Zustand y se respalda en `localStorage` mediante los
 * helpers de `core/session/session.ts`.
 */
export const useSessionStore = create<SessionStore>()((set) => ({
  user: getSession(),
  apartment: null,
  setUser: (user) => {
    saveSession(user);
    set({ user });
  },
  clearUser: () => {
    clearSession();
    set({ user: null });
  },
  setApartment: (apartment) => {
    set({ apartment });
  },
}));

/** Usuario actual, reactivo. */
export const useSessionUser = () => useSessionStore((state) => state.user);
