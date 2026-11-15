import { LuFileText, LuUserRound } from "react-icons/lu";
import type { TabKey } from "./ApartmentTabs.types";

export const TABS: { key: TabKey; title: string; icon: React.ReactNode }[] = [
  {
    key: "tenant",
    title: "Arrendatario",
    icon: <LuUserRound size={16} strokeWidth={2} aria-hidden />,
  },
  {
    key: "contract",
    title: "Contrato",
    icon: <LuFileText size={16} strokeWidth={2} aria-hidden />,
  },
];
