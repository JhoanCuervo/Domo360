import type { ReactNode } from "react";

import "./Admin.css";
import UserMenu from "./components/UserMenu/UserMenu";

type Props = {
  children: ReactNode;
};

/** Layout exclusivo del área de administración: menú lateral + contenido. */
const Admin = ({ children }: Props) => (
  <div className="admin-screen d-flex min-vh-100">
    <main className="admin-content d-flex flex-grow-1 flex-column w-100 mx-auto">
      <div className="d-flex justify-content-end mb-3">
        <UserMenu />
      </div>

      <div className="admin-content-panel flex-grow-1 p-3 p-md-4 border rounded-2 bg-white shadow-sm">
        {children}
      </div>
    </main>
  </div>
);

export default Admin;
