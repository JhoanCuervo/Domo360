import type { ReactNode } from "react";
import {
  LuCalendarDays,
  LuCheck,
  LuClock,
  LuFileText,
  LuFlag,
  LuHouse,
  LuLayers,
  LuPlay,
  LuRefreshCw,
  LuSettings,
  LuShieldCheck,
  LuWallet,
  LuX,
} from "react-icons/lu";

import type { Contract } from "../../../../../types/apartment";
import {
  formatContractDate,
  formatContractMoney,
  getContractDateRange,
} from "./ContractTab.data";

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: string;
  tag: string;
};

/** Card de canon/depósito: icono, etiqueta, monto y distintivo. */
const StatCard = ({ icon, label, value, tag }: StatCardProps) => (
  <article className="contract-stat d-flex flex-column h-100 rounded-4">
    <span className="contract-stat-icon d-grid rounded-circle" aria-hidden>
      {icon}
    </span>
    <p className="contract-stat-label mt-2 mb-0">{label}</p>
    <p className="contract-stat-value m-0">{value}</p>
    <span className="contract-tag align-self-start mt-1 rounded-pill">
      {tag}
    </span>
  </article>
);

type InfoRow = {
  key: string;
  icon: ReactNode;
  label: string;
  value: ReactNode;
};

type InfoCardProps = {
  icon: ReactNode;
  title: string;
  rows: InfoRow[];
};

/** Card de vigencia/condiciones: título con icono y filas etiqueta/valor. */
const InfoCard = ({ icon, title, rows }: InfoCardProps) => (
  <article className="contract-info h-100 rounded-4">
    <header className="contract-info-header d-flex align-items-center">
      <span className="contract-info-heading flex-shrink-0" aria-hidden>
        {icon}
      </span>
      <h3 className="contract-info-title m-0">{title}</h3>
    </header>

    <hr className="contract-info-divider" />

    <dl className="contract-info-list d-grid m-0">
      {rows.map((row) => (
        <div
          key={row.key}
          className="contract-info-row d-flex align-items-center justify-content-between"
        >
          <dt className="d-flex align-items-center">
            <span className="contract-info-row-icon" aria-hidden>
              {row.icon}
            </span>
            {row.label}
          </dt>
          <dd className="m-0">{row.value}</dd>
        </div>
      ))}
    </dl>
  </article>
);

/**
 * Resumen visual del contrato: hero con número, vigencia y estado; luego
 * canon/depósito y las cards de vigencia y condiciones.
 */
const ContractSummary = ({ contract }: { contract: Contract }) => {
  console.log("🚀 ~ ContractSummary ~ contract:", contract);
  const dateRange = getContractDateRange(contract);

  return (
    <div className="d-flex flex-column gap-3">
      <article className="contract-hero position-relative overflow-hidden rounded-4">
        <LuHouse
          className="contract-hero-watermark"
          strokeWidth={0.3}
          aria-hidden
        />

        <div className="contract-hero-content position-relative d-flex align-items-start gap-3">
          <span
            className="contract-hero-icon d-grid flex-shrink-0 rounded-circle"
            aria-hidden
          >
            <LuFileText />
          </span>

          <div className="contract-hero-copy flex-grow-1">
            <p className="contract-hero-kicker text-uppercase m-0">
              Contrato de arrendamiento
            </p>
            <h2 className="contract-hero-title m-0">Contrato #{contract.id}</h2>
            {dateRange && (
              <p className="contract-hero-dates d-flex align-items-center mt-2 mb-0">
                <LuCalendarDays size={17} strokeWidth={2} aria-hidden />
                {dateRange}
              </p>
            )}
          </div>

          <span
            className={`contract-status d-inline-flex align-items-center flex-shrink-0 rounded-pill fw-bold${
              contract.status ? " is-active" : " is-inactive"
            }`}
          >
            <span
              className="contract-status-icon d-grid rounded-circle"
              aria-hidden
            >
              {contract.status ? (
                <LuCheck size={11} strokeWidth={3} />
              ) : (
                <LuX size={11} strokeWidth={3} />
              )}
            </span>
            {contract.status ? "Activo" : "Inactivo"}
          </span>
        </div>
      </article>

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <StatCard
            icon={<LuWallet size={24} strokeWidth={1.75} />}
            label="Canon"
            value={formatContractMoney(contract.canon)}
            tag="Mensual"
          />
        </div>
        <div className="col-12 col-sm-6">
          <StatCard
            icon={<LuShieldCheck size={24} strokeWidth={1.75} />}
            label="Depósito"
            value={formatContractMoney(contract.deposit)}
            tag="Garantía"
          />
        </div>
      </div>

      <div className="row g-3">
        <div className="col-12 col-sm-6">
          <InfoCard
            icon={<LuCalendarDays size={22} strokeWidth={1.75} />}
            title="Vigencia"
            rows={[
              {
                key: "start",
                icon: <LuPlay size={16} strokeWidth={2} />,
                label: "Fecha de inicio",
                value: formatContractDate(contract.date_initial) || "—",
              },
              {
                key: "finish",
                icon: <LuFlag size={16} strokeWidth={2} />,
                label: "Fecha de fin",
                value: formatContractDate(contract.date_finish) || "—",
              },
            ]}
          />
        </div>
        <div className="col-12 col-sm-6">
          <InfoCard
            icon={<LuSettings size={22} strokeWidth={1.75} />}
            title="Condiciones"
            rows={[
              {
                key: "renewal",
                icon: <LuRefreshCw size={16} strokeWidth={2} />,
                label: "Prórroga automática",
                value: (
                  <span
                    className={`contract-tag rounded-pill${contract.extension_month ? " is-success" : " is-neutral"}`}
                  >
                    {contract.extension_month ? "Si" : "No"}
                  </span>
                ),
              },
              {
                key: "extension",
                icon: <LuClock size={16} strokeWidth={2} />,
                label: "Extensión",
                value: `${contract.extension} ${contract.extension === 1 ? "mes" : "meses"}`,
              },
              {
                key: "fee",
                icon: <LuLayers size={16} strokeWidth={2} />,
                label: "Cuota de administración",
                value: formatContractMoney(contract.administration_fee),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default ContractSummary;
