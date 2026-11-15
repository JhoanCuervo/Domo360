import type { Tenant } from "../../../../../types/apartment";
import "./TenantTab.css";

/** Etiquetas legibles para las columnas del arrendatario. */
// const TENANT_LABELS: Record<string, string> = {
//   id: "Cédula",
//   name: "Nombre",
//   email: "Correo",
//   phone: "Teléfono",
// };

/** Contenido de la pestaña Arrendatario. */
const TenantTab = ({ tenant }: { tenant: Tenant }) => {
  return <div>Arrendatario</div>;
};

export default TenantTab;
