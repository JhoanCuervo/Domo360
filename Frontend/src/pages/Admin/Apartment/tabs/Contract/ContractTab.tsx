import PdfViewer from "../../../../../components/PdfViewer/PdfViewer";
import type { Contract } from "../../../../../types/apartment";
import "./ContractTab.css";
import { getContractRows } from "./ContractTab.data";

/**
 * Contenido de la pestaña Contrato: los datos del contrato activo
 * y el visor del PDF a la derecha.
 */
const ContractTab = ({ contract }: { contract: Contract }) => {
  const rows = getContractRows(contract);

  return (
    <div className="row g-4">
      <dl className="col-12 col-xl-6 apartment-tabs-contract-data d-grid border rounded-2 bg-body shadow-sm mb-0 order-2 order-md-1">
        {rows.map((row) => (
          <div key={row.label} className="apartment-tabs-row d-grid">
            <dt>{row.label}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="col-12 col-xl-6 apartment-tabs-contract-pdf order-1 order-md-2">
        <PdfViewer
          fileId="1NdXrVLfrFKQbfEAJw3-8g_KSj21_zk4Z"
          fileName="contrato-de-arrendamiento.pdf"
        />
      </div>
    </div>
  );
};

export default ContractTab;
