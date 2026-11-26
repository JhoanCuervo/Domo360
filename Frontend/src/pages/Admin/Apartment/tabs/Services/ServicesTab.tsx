import type { Service } from "../../../../../data/services";
import ServiceCard from "./ServiceCard";
import "./ServicesTab.css";

/**
 * Contenido de la pestaña Servicios: dibuja los servicios activos que llegan
 * resueltos desde `getServices`, en el orden del JSON.
 */
const ServicesTab = ({ services }: { services: Service[] }) => (
  <div className="row g-3">
    {services.map((service) => (
      <div key={service.key} className="col-12 col-md-6 col-xl-4">
        <ServiceCard service={service} />
      </div>
    ))}
  </div>
);

export default ServicesTab;
