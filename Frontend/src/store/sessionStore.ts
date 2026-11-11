import { create } from "zustand";

import {
  clearSession,
  getSession,
  saveSession,
} from "../core/session/session";
import type { SessionUser } from "../types/session";

type SessionStore = {
  user: SessionUser | null;
  setUser: (user: SessionUser) => void;
  clearUser: () => void;
};

/**
 * Usuario de la sesión, disponible de forma global.
 *
 * El estado vive en Zustand y se respalda en `localStorage` mediante los
 * helpers de `core/session/session.ts`.
 */
export const useSessionStore = create<SessionStore>()((set) => ({
  user: getSession(),
  setUser: (user) => {
    saveSession(user);
    set({ user });
  },
  clearUser: () => {
    clearSession();
    set({ user: null });
  },
}));

/** Usuario actual, reactivo. */
export const useSessionUser = () => useSessionStore((state) => state.user);
