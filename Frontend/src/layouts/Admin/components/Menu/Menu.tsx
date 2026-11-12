import { NavLink } from "react-router";

import "./Menu.css";
import MENU_ITEMS from "./Menu.data";
import Lineicons from "@lineiconshq/react-lineicons";
import Domo360Logo from "../../../../components/Brand/Domo360Logo";

/** Menú lateral del área de administración. */
const Menu = () => (
  <aside className="admin-sidebar">
    <div className="admin-sidebar-brand">
      <Domo360Logo size={32} />
    </div>

    <p className="admin-nav-title">Menú</p>
    <nav className="admin-nav" aria-label="Menú de administración">
      {MENU_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end
          className={({ isActive }) =>
            isActive ? "admin-nav-link is-active" : "admin-nav-link"
          }
        >
          <span className="admin-nav-icon" aria-hidden>
            <Lineicons icon={item.icon} size={20} strokeWidth={2} />
          </span>
          <span className="admin-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  </aside>
);

export default Menu;
