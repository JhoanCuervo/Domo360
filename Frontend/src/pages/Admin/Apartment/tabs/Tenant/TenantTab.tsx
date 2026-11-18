import { LuFingerprint, LuIdCard, LuMail, LuPhone } from "react-icons/lu";

import type { Tenant } from "../../../../../types/apartment";
import BtnAccions from "./BtnAccions";
import "./TenantTab.css";

const getInitials = (name: string): string =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("");

const TenantTab = ({ tenant }: { tenant: Tenant }) => {
  const initials = getInitials(tenant.name);

  return (
    <div className="row g-3">
      <div className="col-12 col-lg-4">
        <article className="tenant-profile d-flex flex-column h-100 rounded-4 p-4">
          <div className="d-flex align-items-start justify-content-between gap-2">
            <div
              className="tenant-avatars d-flex align-items-center"
              aria-hidden
            >
              <span className="tenant-avatar tenant-avatar-initials d-grid flex-shrink-0 rounded-circle fw-bold">
                {initials}
              </span>
            </div>
          </div>

          <h2 className="tenant-name mt-4 mb-0">{tenant.name}</h2>
          <p className="tenant-alias mt-1 mb-3">“{tenant.alias}”</p>

          <div className="tenant-roles d-flex flex-wrap gap-2">
            <span className={`tenant-role rounded-pill is-primary`}>
              Arrendatari@
            </span>
          </div>
          <BtnAccions phone={tenant.phone} />
        </article>
      </div>

      <div className="col-12 col-lg-8">
        <div className="row g-3">
          <div className="col-12">
            <article className="tenant-card h-100 rounded-4">
              <header className="tenant-card-header d-flex align-items-center">
                <span
                  className="tenant-card-icon d-grid flex-shrink-0"
                  aria-hidden
                >
                  <LuIdCard size={18} strokeWidth={2} />
                </span>
                <h3 className="tenant-card-title m-0">Identificación</h3>
              </header>

              <hr className="tenant-card-divider" />

              <p className="tenant-field-label d-flex align-items-center m-0">
                <LuFingerprint size={14} strokeWidth={2} aria-hidden />
                ID
              </p>
              <p className="tenant-field-value mt-1 mb-0">{tenant.id}</p>
            </article>
          </div>

          <div className="col-12">
            <article className="tenant-card h-100 rounded-4">
              <header className="tenant-card-header d-flex align-items-center">
                <h3 className="tenant-card-title m-0">
                  Información de Contacto
                </h3>
              </header>

              <hr className="tenant-card-divider" />

              <div className="tenant-contact-list d-flex flex-column">
                <div className="tenant-contact-row d-flex align-items-center">
                  <span
                    className="tenant-contact-icon d-grid flex-shrink-0"
                    aria-hidden
                  >
                    <LuMail size={16} strokeWidth={2} />
                  </span>
                  <div className="tenant-contact-copy">
                    <p className="tenant-contact-label m-0">
                      Correo electrónico
                    </p>
                    <p className="tenant-contact-value m-0">{tenant.email}</p>
                  </div>
                </div>

                <div className="tenant-contact-row d-flex flex-wrap align-items-center">
                  <span
                    className="tenant-contact-icon d-grid flex-shrink-0"
                    aria-hidden
                  >
                    <LuPhone size={16} strokeWidth={2} />
                  </span>
                  <div className="tenant-contact-copy">
                    <p className="tenant-contact-label m-0">Teléfono</p>
                    <p className="tenant-contact-value m-0">{tenant.phone}</p>
                  </div>
                  {/* <button
                    type="button"
                    className="btn tenant-whatsapp ms-auto d-inline-flex align-items-center gap-1"
                  >
                    <FaWhatsapp size={14} aria-hidden />
                    Iniciar chat de WhatsApp
                  </button> */}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantTab;
