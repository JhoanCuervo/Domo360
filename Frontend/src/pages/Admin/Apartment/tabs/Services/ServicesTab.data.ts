import { LuDroplets, LuFlame, LuTrash2, LuZap } from "react-icons/lu";
import type { ServicePreset } from "../../../../../types/apartment";

/**
 * Valores por defecto de los servicios conocidos. Solo son un respaldo:
 * si la base envía `label`, `description` o `icon`, mandan esos. El color no
 * se define por servicio: todas las cards usan el morado de la marca.
 */
export const KEY_PRESETS: Record<string, ServicePreset> = {
  energy: {
    label: "Energía",
    description: "Consumo eléctrico del inmueble",
    icon: LuZap,
  },
  gas: {
    label: "Gas",
    description: "Suministro de gas natural",
    icon: LuFlame,
  },
  sanitation: {
    label: "Aseo",
    description: "Recolección de residuos",
    icon: LuTrash2,
  },
  water: {
    label: "Agua",
    description: "Acueducto y alcantarillado",
    icon: LuDroplets,
  },
};
