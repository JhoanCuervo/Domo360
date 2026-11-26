import { useState, type FormEvent } from "react";
import {
  LuBanknote,
  LuCalendarDays,
  LuCloudUpload,
  LuReceiptText,
} from "react-icons/lu";

import Button from "../../../../components/Button/Button";
import Field from "../../../../components/Field/Field";
import PhotoSourceCards from "../../../../components/PhotoSourceCards/PhotoSourceCards";
import { getServices } from "../../../../data/services";
import { useSessionStore } from "../../../../store/sessionStore";
import ServicePicker from "./ServicePicker";
import "./UploadReceipt.css";

/** Fecha de hoy en formato YYYY-MM-DD, usando la zona horaria local. */
const getTodayInputValue = (): string => {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${today.getFullYear()}-${month}-${day}`;
};

/** Pantalla para subir un recibo de pago (formulario provisional). */
function Index() {
  const [serviceKey, setServiceKey] = useState<string | null>(null);
  const [receiptFile, setReceiptFile] = useState<File | null>(null);
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState(getTodayInputValue);

  const apartment = useSessionStore((state) => state.apartment);
  const services = getServices(apartment?.services);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: conectar con el controlador de recibos cuando exista en el backend.
  };

  return (
    <div className="row justify-content-center">
      <div className="col-12 col-md-8 col-lg-6">
        <header className="d-flex align-items-center gap-3 mb-4">
          <span
            className="upload-receipt-header-icon d-grid flex-shrink-0 rounded-4"
            aria-hidden
          >
            <LuReceiptText size={24} strokeWidth={1.9} />
          </span>
          <div>
            <h1 className="upload-receipt-title m-0">Subir recibo de pago</h1>
            <p className="upload-receipt-subtitle m-0">
              Adjunta la foto del comprobante y registra los datos del pago.
            </p>
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          noValidate
          className="d-flex flex-column gap-3 border rounded-4 bg-white p-3 p-md-4 shadow-sm"
        >
          <div className="row g-3">
            <div className="col-12">
              <ServicePicker
                services={services}
                value={serviceKey}
                onChange={setServiceKey}
              />
            </div>
            <div className="col-sm-6">
              <Field
                label="Valor pagado"
                name="amount"
                type="text"
                inputMode="decimal"
                placeholder="0"
                icon={<LuBanknote size={20} />}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>
            <div className="col-sm-6">
              <Field
                label="Fecha de pago"
                name="paymentDate"
                type="date"
                icon={<LuCalendarDays size={20} />}
                value={paymentDate}
                onChange={(event) => setPaymentDate(event.target.value)}
              />
            </div>
            <div className="col-12">
              <PhotoSourceCards
                label="Comprobante"
                value={receiptFile}
                onChange={setReceiptFile}
              />
            </div>
          </div>

          <div className="d-flex flex-column gap-2 mt-2">
            <Button type="submit" fullWidth>
              <LuCloudUpload size={18} aria-hidden />
              Guardar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Index;
