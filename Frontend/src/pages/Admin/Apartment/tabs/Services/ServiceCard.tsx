import { useState } from "react";
import {
  LuCheck,
  LuCopy,
  LuCreditCard,
  LuExternalLink,
  LuHash,
  LuPlugZap,
} from "react-icons/lu";
import type {
  ServiceDetail,
  ServicePreset,
} from "../../../../../types/apartment";
import { formatNumber } from "../../../../../utils/format";

/**
 * Servicio ya resuelto por la pestaña: los datos guardados en la base más el
 * preset visual (etiqueta, descripción e icono). El color es siempre el
 * morado de la marca, independiente del servicio.
 */
type ServiceCardData = ServiceDetail & ServicePreset;

/** Copia al portapapeles con respaldo para navegadores sin Clipboard API. */
const copyToClipboard = async (value: string): Promise<boolean> => {
  try {
    await navigator.clipboard.writeText(value);
    return true;
  } catch {
    const field = document.createElement("textarea");
    field.value = value;
    field.setAttribute("readonly", "");
    field.style.position = "fixed";
    field.style.opacity = "0";
    document.body.appendChild(field);
    field.select();

    const copied = document.execCommand("copy");
    document.body.removeChild(field);
    return copied;
  }
};
const ServiceCard = ({ service }: { service: ServiceCardData }) => {
  const [copied, setCopied] = useState(false);
  const Icon = service.icon ?? LuPlugZap;
  const accountNumber = service.accountNumber;

  const handleCopy = async () => {
    if (!accountNumber) return;
    const success = await copyToClipboard(String(accountNumber));
    if (!success) return;

    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <article className="services-card d-flex flex-column h-100 rounded-4">
      <header className="services-card-header d-flex align-items-start justify-content-between gap-2">
        <span className="services-card-icon d-grid flex-shrink-0" aria-hidden>
          <Icon size={26} strokeWidth={2} />
        </span>
        <span className="services-card-chip rounded-pill">{service.label}</span>
      </header>

      <h3 className="services-card-company mt-3 mb-0">{service.company}</h3>
      <p className="services-card-description mt-1 mb-0">
        {service.description}
      </p>

      <hr className="services-card-divider" />

      <div className="services-card-account">
        <p className="services-card-label d-flex align-items-center m-0">
          <LuHash size={13} strokeWidth={2.5} aria-hidden />
          Número de cuenta
        </p>
        <p className="services-card-value m-0">
          {accountNumber ? formatNumber(accountNumber) : "Sin número"}
        </p>
      </div>

      <div className="services-card-actions d-flex flex-column">
        <div className="btn services-pay d-inline-flex align-items-center justify-content-center gap-2">
          <LuCreditCard size={18} strokeWidth={2} aria-hidden />
          Ver pagos
          <LuExternalLink size={15} strokeWidth={2.25} aria-hidden />
        </div>

        <button
          type="button"
          className={`btn services-copy d-inline-flex align-items-center justify-content-center gap-1${
            copied ? " is-copied" : ""
          }`}
          onClick={handleCopy}
          disabled={!accountNumber}
        >
          {copied ? (
            <LuCheck size={14} strokeWidth={2.5} aria-hidden />
          ) : (
            <LuCopy size={14} strokeWidth={2} aria-hidden />
          )}
          {copied ? "Número copiado" : "Copiar número"}
        </button>
      </div>
    </article>
  );
};

export default ServiceCard;
