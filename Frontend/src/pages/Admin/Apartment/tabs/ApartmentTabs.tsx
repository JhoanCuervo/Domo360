import { useState, type ReactNode } from "react";

import type {
  Apartment,
  ApartmentDetail,
  ApartmentServices,
} from "../../../../types/apartment";
import { TABS } from "./ApartmentTabs.data";
import type { TabKey } from "./ApartmentTabs.types";
import ContractTab from "./Contract/ContractTab";
import ServicesTab from "./Services/ServicesTab";
import TenantTab from "./Tenant/TenantTab";

const parseServices = (apartment: Apartment): ApartmentServices | null => {
  try {
    const { services } = apartment;
    const servicesJson = JSON.parse(services);
    return servicesJson;
  } catch {
    return null;
  }
};

/** Menú de pestañas con los datos del arrendatario y del contrato. */
const ApartmentTabs = ({ detail }: { detail: ApartmentDetail }) => {
  const { contract, tenant, apartment } = detail;
  const [activeTab, setActiveTab] = useState<TabKey>("tenant");

  const services = parseServices(apartment);
  const panels: Record<TabKey, ReactNode> = {
    tenant: <TenantTab tenant={tenant} />,
    contract: <ContractTab contract={contract} />,
    services: <ServicesTab services={services} />,
  };

  return (
    <section className="apartment-tabs border rounded-4 bg-white overflow-hidden">
      <div
        className="apartment-tabs-bar d-flex gap-1 p-2 border-bottom bg-body"
        role="tablist"
        aria-label="Información del inmueble"
      >
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            id={`apartment-tab-${tab.key}`}
            aria-selected={activeTab === tab.key}
            aria-controls={`apartment-panel-${tab.key}`}
            className={`apartment-tabs-button d-inline-flex align-items-center gap-2 px-3 py-2 border-0 rounded-3 fw-bold${
              activeTab === tab.key ? " is-active" : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.icon}
            {tab.title}
          </button>
        ))}
      </div>

      <div
        className="apartment-tabs-panel"
        role="tabpanel"
        id={`apartment-panel-${activeTab}`}
        aria-labelledby={`apartment-tab-${activeTab}`}
      >
        {panels[activeTab]}
      </div>
    </section>
  );
};

export default ApartmentTabs;
