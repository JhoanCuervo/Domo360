import { useEffect, useRef, useState } from "react";
import { LuChevronDown } from "react-icons/lu";
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
    <div
      className="admin-user-menu position-relative d-flex justify-content-end"
      ref={rootRef}
    >
      <button
        type="button"
        className="admin-user-trigger d-inline-flex align-items-center rounded-pill bg-white"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span
          className="admin-user-avatar d-grid rounded-circle flex-shrink-0"
          aria-hidden
        >
          {initial}
        </span>
        <span className="admin-user-alias d-none d-md-block text-truncate">
          {name}
        </span>
        <LuChevronDown
          size={14}
          strokeWidth={2}
          className={open ? "admin-user-caret is-open" : "admin-user-caret"}
          aria-hidden
        />
      </button>

      {open && (
        <div
          className="admin-user-dropdown position-absolute end-0 z-3 border rounded-2 bg-white"
          role="menu"
        >
          <div className="admin-user-summary d-grid border-bottom">
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
            className="admin-user-action d-flex align-items-center rounded-3 text-decoration-none"
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
