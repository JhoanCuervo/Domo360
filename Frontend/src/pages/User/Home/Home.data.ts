import type { IconType } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  LuArrowLeft,
  LuCloudUpload,
  LuFileSpreadsheet,
  LuFileText,
  LuReceipt,
  LuScrollText,
  LuUser,
  LuWallet,
} from "react-icons/lu";

export type PanelId = "main" | "receipts";

export type QuickAction = {
  id: string;
  label: string;
  icon: IconType;
  /** Panel al que navega la acción dentro de la botonera, si aplica. */
  to?: PanelId;
  /** Ruta del router a la que navega la acción, si aplica. */
  route?: string;
};

export type HomePanel = {
  /** Nombre accesible de la botonera del panel. */
  label: string;
  actions: QuickAction[];
};

/**
 * Paneles de la botonera del inicio. Para agregar una opción nueva basta con
 * añadir su panel aquí y poner `to` en la acción que lo abre. Las acciones
 * "back" apuntan con `to` al panel padre.
 */
export const PANELS: Record<PanelId, HomePanel> = {
  main: {
    label: "Accesos rápidos",
    actions: [
      { id: "receipts", label: "Recibos", icon: LuFileText, to: "receipts" },
      { id: "canon", label: "Canon", icon: LuWallet },
      { id: "contract", label: "Contrato", icon: LuScrollText },
      { id: "reports", label: "Reportes", icon: LuFileSpreadsheet },
      { id: "maps", label: "Mapa", icon: FaMapMarkerAlt },
      { id: "profile", label: "Perfil", icon: LuUser },
    ],
  },
  receipts: {
    label: "Opciones de recibos",
    actions: [
      {
        id: "upload-receipt",
        label: "Subir recibo pago",
        icon: LuCloudUpload,
        route: "/user/receipts/upload",
      },
      {
        id: "view-receipts",
        label: "Ver recibos",
        icon: LuReceipt,
        route: "/user/receipts/view",
      },
      { id: "back", label: "Atrás", icon: LuArrowLeft, to: "main" },
    ],
  },
};

export const getHeroImageUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
