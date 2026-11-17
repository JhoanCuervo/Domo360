import PdfViewer from "../../../../../components/PdfViewer/PdfViewer";
import type { Contract } from "../../../../../types/apartment";
import ContractSummary from "./ContractSummary";
import "./ContractTab.css";

/**
 * Contenido de la pestaña Contrato: resumen visual del contrato a la
 * izquierda y el visor del PDF a la derecha.
 */
const ContractTab = ({ contract }: { contract: Contract }) => (
  <div className="row g-4">
    <div className="col-12 col-xl-6 apartment-tabs-contract-summary order-2 order-md-1">
      <ContractSummary contract={contract} />
    </div>
    <div className="col-12 col-xl-6 apartment-tabs-contract-pdf order-1 order-md-2">
      <PdfViewer
        fileId={contract.file}
        fileName="contrato-de-arrendamiento.pdf"
      />
    </div>
  </div>
);

export default ContractTab;
