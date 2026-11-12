import type { ReactNode } from "react";

import "./Admin.css";
import Menu from "./components/Menu/Menu";
import UserMenu from "./components/UserMenu/UserMenu";

type Props = {
  children: ReactNode;
};

/** Layout exclusivo del área de administración: menú lateral + contenido. */
const Admin = ({ children }: Props) => (
  <div className="admin-screen">
    <Menu />

    <main className="admin-content">
      <div className="admin-content-top">
        <UserMenu />
      </div>

      <div>{children}</div>
    </main>
  </div>
);

export default Admin;
