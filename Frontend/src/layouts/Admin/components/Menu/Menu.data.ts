import { LuFiles, LuHouse } from "react-icons/lu";
import type { MenuItem } from "./Meny.types";

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Inicio",
    to: "/admin",
    icon: LuHouse,
  },
  {
    label: "Contratos",
    to: "/admin/contracts",
    icon: LuFiles,
  },
];

export default MENU_ITEMS;
