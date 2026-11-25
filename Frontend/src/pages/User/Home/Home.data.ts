import type { IconType } from "react-icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import {
  LuFileSpreadsheet,
  LuFileText,
  LuScrollText,
  LuUser,
  LuWallet,
} from "react-icons/lu";

export type QuickAction = {
  id: string;
  label: string;
  icon: IconType;
};

export const QUICK_ACTIONS: QuickAction[] = [
  { id: "receipts", label: "Recibos", icon: LuFileText },
  { id: "canon", label: "Canon", icon: LuWallet },
  { id: "contract", label: "Contrato", icon: LuScrollText },
  { id: "reports", label: "Reportes", icon: LuFileSpreadsheet },
  { id: "maps", label: "Mapa", icon: FaMapMarkerAlt },
  { id: "profile", label: "Perfil", icon: LuUser },
];

export const getHeroImageUrl = (id: string) =>
  `https://drive.google.com/thumbnail?id=${id}&sz=w1600`;
