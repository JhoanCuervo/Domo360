import { FileMultipleStroke, Home2Stroke } from "@lineiconshq/free-icons";
import type { MenuItem } from "./Meny.types";

const MENU_ITEMS: MenuItem[] = [
  {
    label: "Inicio",
    to: "/admin",
    icon: Home2Stroke,
  },
  {
    label: "Contratos",
    to: "/admin/contracts",
    icon: FileMultipleStroke,
  },
];

export default MENU_ITEMS;
