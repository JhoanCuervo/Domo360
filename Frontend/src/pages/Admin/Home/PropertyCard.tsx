import { useState } from "react";

import {
  LuBath,
  LuBedDouble,
  LuBuilding2,
  LuKeyRound,
  LuLockOpen,
  LuMapPin,
  LuRuler,
} from "react-icons/lu";

import { useNavigate } from "react-router";
import type { Apartment } from "../../../types/apartment";
import { getImageUrl, isRented } from "./Home.helpers";

/** La hoja puede devolver valores vacíos; solo se muestran si tienen contenido. */
const hasValue = (value: string | number | undefined) =>
  value !== undefined && value !== null && String(value).trim() !== "";

/** Tarjeta con la foto, ubicación y estado de arriendo de un inmueble. */
const PropertyCard = ({ apartment }: { apartment: Apartment }) => {
  const navigate = useNavigate();
  const [imageFailed, setImageFailed] = useState(false);
  const rented = isRented(apartment.status);

  const features = [
    hasValue(apartment.bedrooms) && (
      <li key="bedrooms" className="property-card-feature d-inline-flex align-items-center fw-semibold">
        <LuBedDouble size={22} strokeWidth={1.75} aria-hidden />
        {apartment.bedrooms}{" "}
        {Number(apartment.bedrooms) === 1 ? "Habitación" : "Habitaciones"}
      </li>
    ),
    hasValue(apartment.bathrooms) && (
      <li key="bathrooms" className="property-card-feature d-inline-flex align-items-center fw-semibold">
        <LuBath size={22} strokeWidth={1.75} aria-hidden />
        {apartment.bathrooms}{" "}
        {Number(apartment.bathrooms) === 1 ? "Baño" : "Baños"}
      </li>
    ),
    hasValue(apartment.area) && (
      <li key="area" className="property-card-feature d-inline-flex align-items-center fw-semibold">
        <LuRuler size={22} strokeWidth={1.75} aria-hidden />
        {apartment.area} m²
      </li>
    ),
  ].filter(Boolean);

  return (
    <div className="col-12 col-md-6 col-xl-4">
      <article
        className="property-card rounded-4 bg-white overflow-hidden h-100"
        onClick={() => {
          navigate(`/admin/apartment/${apartment.id}`);
        }}
      >
        <div className="property-card-media position-relative overflow-hidden">
          {imageFailed ? (
            <div
              className="property-card-media-fallback d-grid w-100 h-100"
              role="img"
              aria-label={`Sin imagen de ${apartment.type.toLowerCase()} ${apartment.number}`}
            >
              <LuBuilding2 size={48} strokeWidth={1.25} aria-hidden />
            </div>
          ) : (
            <img
              className="property-card-img d-block w-100 h-100 object-fit-cover"
              src={getImageUrl(apartment.id)}
              alt={`${apartment.type} ${apartment.number} de la torre ${apartment.torre}`}
              loading="lazy"
              onError={() => setImageFailed(true)}
            />
          )}

          <span
            className={`status-chip position-absolute d-inline-flex align-items-center rounded-pill text-uppercase ${
              rented ? "is-rented" : "is-vacant"
            }`}
          >
            {rented ? (
              <LuKeyRound size={13} strokeWidth={2} aria-hidden />
            ) : (
              <LuLockOpen size={13} strokeWidth={2} aria-hidden />
            )}
            {rented ? "Arrendado" : "Desocupado"}
          </span>
        </div>

        <div className="property-card-body position-relative d-flex flex-column">
          <h2 className="property-card-title m-0 text-truncate">
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
            <ul className="property-card-features list-unstyled">
              {features}
            </ul>
          )}
        </div>
      </article>
    </div>
  );
};

export default PropertyCard;
