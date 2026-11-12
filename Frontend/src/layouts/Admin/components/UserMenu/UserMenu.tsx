import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

import { useSessionStore, useSessionUser } from "../../../../store/sessionStore";
import "./UserMenu.css";

/** Menú de usuario situado arriba a la derecha: alias + cierre de sesión. */
const UserMenu = () => {
  const user = useSessionUser();
  const clearUser = useSessionStore((state) => state.clearUser);
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  const name = user?.alias || user?.name || "Admin";
  const initial = name.charAt(0).toUpperCase();

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  return (
    <div className="admin-user-menu" ref={rootRef}>
      <button
        type="button"
        className="admin-user-trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="admin-user-avatar" aria-hidden>
          {initial}
        </span>
        <span className="admin-user-alias">{name}</span>
        <svg
          className={open ? "admin-user-caret is-open" : "admin-user-caret"}
          viewBox="0 0 16 16"
          width="14"
          height="14"
          aria-hidden
        >
          <path
            d="M4 6l4 4 4-4"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div className="admin-user-dropdown" role="menu">
          <div className="admin-user-summary">
            <span className="admin-user-summary-alias">{name}</span>
            {user?.name && (
              <span className="admin-user-summary-name">{user.name}</span>
            )}
            {user?.rol && (
              <span className="admin-user-summary-role">{user.rol}</span>
            )}
          </div>

          <NavLink
            to="/login"
            role="menuitem"
            className="admin-user-action"
            onClick={() => {
              setOpen(false);
              clearUser();
            }}
          >
            Cerrar sesión
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
