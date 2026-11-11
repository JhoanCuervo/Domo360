import { NavLink } from "react-router";

import Domo360Logo from "../../../../components/Brand/Domo360Logo";
import { useSessionUser } from "../../../../store/sessionStore";
import "./Topbar.css";

/** Barra superior del área de administración. */
const Topbar = () => {
  const user = useSessionUser();
  const name = user?.alias || user?.name || "Admin";

  return (
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
  );
};

export default Topbar;
