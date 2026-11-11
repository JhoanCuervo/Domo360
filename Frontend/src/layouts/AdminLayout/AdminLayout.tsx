import type { ReactNode } from "react";
import { NavLink } from "react-router";

import Domo360Logo from "../../components/Brand/Domo360Logo";
import { useSessionUser } from "../../store/sessionStore";
import "./AdminLayout.css";

type Props = {
  children: ReactNode;
};

/** Layout exclusivo del área de administración: barra superior + contenido. */
const AdminLayout = ({ children }: Props) => {
  const user = useSessionUser();
  const name = user?.alias || user?.name || "Admin";

  return (
    <div className="admin-screen">
      <header className="admin-topbar">
        <div className="admin-brand">
          <Domo360Logo size={36} />
        </div>

        <div className="admin-topbar-actions">
          <div className="admin-user">
            <span className="admin-user-info">
              <span className="admin-badge">{name}</span>
            </span>
          </div>
          <NavLink to="/login" className="admin-logout">
            Cerrar sesión
          </NavLink>
        </div>
      </header>
      <main className="admin-content">{children}</main>
    </div>
  );
};

export default AdminLayout;
