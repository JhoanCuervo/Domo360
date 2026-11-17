import { useState } from "react";

import type { ApartmentDetail } from "../../../../types/apartment";
import { TABS } from "./ApartmentTabs.data";
import type { TabKey } from "./ApartmentTabs.types";
import ContractTab from "./Contract/ContractTab";
import TenantTab from "./Tenant/TenantTab";

/** Menú de pestañas con los datos del arrendatario y del contrato. */
const ApartmentTabs = ({ detail }: { detail: ApartmentDetail }) => {
  const { contract, tenant } = detail;
  const [activeTab, setActiveTab] = useState<TabKey>("tenant");

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
        {activeTab === "tenant" ? (
          <TenantTab tenant={tenant} />
        ) : (
          <ContractTab contract={contract} />
        )}
      </div>
    </section>
  );
};

export default ApartmentTabs;
