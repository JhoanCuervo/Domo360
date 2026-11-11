import type { ReactNode } from "react";

import Menu from "./components/Menu/Menu";
import Topbar from "./components/Topbar/Topbar";
import "./Admin.css";

type Props = {
  children: ReactNode;
};

/** Layout exclusivo del área de administración: barra superior + menú lateral + contenido. */
const Admin = ({ children }: Props) => (
  <div className="admin-screen">
    <Topbar />

    <div className="admin-body">
      <Menu />

      <main className="admin-content">{children}</main>
    </div>
  </div>
);

export default Admin;
