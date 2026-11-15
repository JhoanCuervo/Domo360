import { useState } from "react";

import {
  LuBanknote,
  LuBath,
  LuBedDouble,
  LuBuilding2,
  LuCalendarDays,
  LuKeyRound,
  LuMapPin,
  LuRuler,
  LuWallet,
} from "react-icons/lu";

import type { ApartmentDetail } from "../../../types/apartment";
import { getImageUrl, isRented } from "../Home/Home.helpers";

/** La hoja puede devolver valores vacíos; solo se muestran si tienen contenido. */
const hasValue = (value: string | number | undefined) =>
  value !== undefined && value !== null && String(value).trim() !== "";

/** Formatea un valor monetario de la hoja como pesos colombianos. */
export const formatMoney = (value: number | string): string => {
  const amount =
    typeof value === "number"
      ? value
      : Number(String(value).replace(/[^\d.-]/g, ""));

  if (Number.isFinite(amount)) {
    return amount.toLocaleString("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 2,
    });
  }

  return String(value);
};

/** Formatea una fecha de la hoja; si no es válida, la muestra tal cual. */
export const formatDate = (value: string): string => {
  const text = String(value ?? "").trim();
  if (!text) return "";

  const date = new Date(text);
  if (Number.isNaN(date.getTime())) return text;

  return date.toLocaleDateString("es-CO", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/**
 * Ficha horizontal del inmueble: imagen a la izquierda, la información
 * del apartamento al centro y a la derecha los datos económicos del
 * contrato (canon, depósito y fechas de pago).
 */
const ApartmentCard = ({ detail }: { detail: ApartmentDetail }) => {
  const { apartment, contract } = detail;
  const [imageFailed, setImageFailed] = useState(false);
  const rented = isRented(apartment.status);

  const features = [
    hasValue(apartment.bedrooms) && (
      <li key="bedrooms" className="apartment-card-badge d-inline-flex align-items-center gap-2 rounded-pill">
        <LuBedDouble size={16} strokeWidth={2} aria-hidden />
        {apartment.bedrooms}{" "}
        {Number(apartment.bedrooms) === 1 ? "Habitación" : "Habitaciones"}
      </li>
    ),
    hasValue(apartment.bathrooms) && (
      <li key="bathrooms" className="apartment-card-badge d-inline-flex align-items-center gap-2 rounded-pill">
        <LuBath size={16} strokeWidth={2} aria-hidden />
        {apartment.bathrooms}{" "}
        {Number(apartment.bathrooms) === 1 ? "Baño" : "Baños"}
      </li>
    ),
    hasValue(apartment.area) && (
      <li key="area" className="apartment-card-badge d-inline-flex align-items-center gap-2 rounded-pill">
        <LuRuler size={16} strokeWidth={2} aria-hidden />
        {apartment.area} m²
      </li>
    ),
  ].filter(Boolean);

  const paymentDates = [contract.date_initial, contract.date_finish]
    .map(formatDate)
    .filter(Boolean);

  const sideRows = [
    hasValue(contract.canon) && (
      <div key="canon" className="apartment-card-side-row d-grid">
        <dt className="d-flex align-items-center">
          <LuBanknote size={12} strokeWidth={2} aria-hidden />
          Canon mensual
        </dt>
        <dd>{formatMoney(contract.canon)}</dd>
      </div>
    ),
    hasValue(contract.price) && (
      <div key="deposit" className="apartment-card-side-row d-grid">
        <dt className="d-flex align-items-center">
          <LuWallet size={12} strokeWidth={2} aria-hidden />
          Depósito
        </dt>
        <dd>{formatMoney(contract.price)}</dd>
      </div>
    ),
    paymentDates.length > 0 && (
      <div key="dates" className="apartment-card-side-row d-grid">
        <dt className="d-flex align-items-center">
          <LuCalendarDays size={12} strokeWidth={2} aria-hidden />
          Fechas de pago
        </dt>
        <dd>{paymentDates.join(" – ")}</dd>
      </div>
    ),
  ].filter(Boolean);

  return (
    <article className="apartment-card position-relative d-grid overflow-hidden border rounded-4 bg-white">
      <div className="apartment-card-media position-relative overflow-hidden">
        {imageFailed ? (
          <div
            className="apartment-card-media-fallback d-grid w-100 h-100"
            role="img"
            aria-label={`Sin imagen de ${apartment.type.toLowerCase()} ${apartment.number}`}
          >
            <LuBuilding2 size={48} strokeWidth={1.25} aria-hidden />
          </div>
        ) : (
          <img
            className="apartment-card-img d-block object-fit-cover"
            src={getImageUrl(apartment.id)}
            alt={`${apartment.type} ${apartment.number} de la torre ${apartment.torre}`}
            onError={() => setImageFailed(true)}
          />
        )}

        {rented && (
          <span className="status-chip position-absolute d-inline-flex align-items-center rounded-pill text-uppercase is-rented">
            <LuKeyRound size={13} strokeWidth={2} aria-hidden />
            Arrendado
          </span>
        )}
      </div>

      <div className="apartment-card-body d-flex flex-column justify-content-center">
        <h2 className="apartment-card-title m-0">
          {apartment.type} {apartment.number}
        </h2>

        <ul className="card-facts d-grid list-unstyled">
          <li className="card-fact d-flex align-items-start fw-semibold">
            <LuMapPin
              className="card-fact-icon flex-shrink-0"
              size={16}
              strokeWidth={1.75}
              aria-hidden
            />
            <span>
              {apartment.address}, {apartment.city}, {apartment.departament}
            </span>
          </li>
        </ul>

        {features.length > 0 && (
          <ul className="apartment-card-features d-flex flex-wrap gap-2 list-unstyled">
            {features}
          </ul>
        )}
      </div>

      {sideRows.length > 0 && (
        <aside
          className="apartment-card-side d-flex align-items-center"
          aria-label="Datos del contrato"
        >
          <dl className="apartment-card-side-list d-grid w-100 m-0">
            {sideRows}
          </dl>
        </aside>
      )}
    </article>
  );
};

export default ApartmentCard;
