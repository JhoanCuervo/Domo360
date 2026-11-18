import { useMemo } from "react";
import type { ApartmentServices } from "../../../../../types/apartment";
import ServiceCard from "./ServiceCard";
import "./ServicesTab.css";
import { KEY_PRESETS } from "./ServicesTab.data";

/**
 * Contenido de la pestaña Servicios: dibuja los servicios activos que lleguen
 * en `apartment.services`, en el orden del JSON. Las etiquetas y los iconos
 * salen del propio servicio con el respaldo de `KEY_PRESETS`; el color es
 * siempre el morado de la marca.
 */
const ServicesTab = ({ services }: { services?: ApartmentServices | null }) => {
  const entries = useMemo(() => {
    if (!services) return [];

    return Object.entries(services)
      .filter(([, service]) => service?.status !== false)
      .map(([key, service]) => ({
        key,
        service: { ...KEY_PRESETS[key], ...service },
      }));
  }, [services]);

  return (
    <div className="row g-3">
      {entries.map(({ key, service }) => (
        <div key={key} className="col-12 col-md-6 col-xl-4">
          <ServiceCard service={service} />
        </div>
      ))}
    </div>
  );
};

export default ServicesTab;
