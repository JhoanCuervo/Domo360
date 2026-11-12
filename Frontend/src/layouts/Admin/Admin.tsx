import type { ReactNode } from "react";

import "./Admin.css";
import UserMenu from "./components/UserMenu/UserMenu";

type Props = {
  children: ReactNode;
};

/** Layout exclusivo del área de administración: menú lateral + contenido. */
const Admin = ({ children }: Props) => (
  <div className="admin-screen">
    <main className="admin-content">
      <div className="admin-content-top">
        <UserMenu />
      </div>

      <div>{children}</div>
    </main>
  </div>
);

export default Admin;
