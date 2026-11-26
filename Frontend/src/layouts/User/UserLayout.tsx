import type { ReactNode } from "react";
import { LuArrowLeft } from "react-icons/lu";
import { Link } from "react-router";

import Domo360Logo from "../../components/Brand/Domo360Logo";

import "./UserLayout.css";

type Props = {
  children: ReactNode;
};

/** Layout de las ventanas del arrendatario fuera de la botonera de inicio. */
const UserLayout = ({ children }: Props) => (
  <main className="user-layout-page d-flex flex-column min-vh-100">
    <header className="bg-white border-bottom w-100">
      <div className="container-lg d-flex align-items-center gap-3 px-3 px-md-4 py-2 py-md-3">
        <Link
          to="/user"
          className="btn btn-domo btn-domo-outline"
          aria-label="Volver al inicio"
        >
          <LuArrowLeft size={18} aria-hidden />
          Atrás
        </Link>
        <div className="ms-auto">
          <Domo360Logo size={36} />
        </div>
      </div>
    </header>

    <div className="container-lg flex-grow-1 d-flex flex-column px-3 px-md-4 py-3 py-md-4">
      {children}
    </div>
  </main>
);

export default UserLayout;
