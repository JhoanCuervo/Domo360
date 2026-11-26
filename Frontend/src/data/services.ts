import type { IconType } from "react-icons";
import {
  LuDroplets,
  LuFlame,
  LuPlugZap,
  LuTrash2,
  LuZap,
} from "react-icons/lu";

export type Service = {
  key: string;
  label: string;
  description: string;
  icon: IconType;
  company?: string | null;
  accountNumber?: number | null;
  pageCompany?: string | null;
  status: boolean;
};

const PRESETS: Record<
  string,
  Pick<Service, "label" | "description" | "icon">
> = {
  energy: { label: "Energía", description: "Consumo eléctrico", icon: LuZap },
  gas: { label: "Gas", description: "Gas natural", icon: LuFlame },
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

const FALLBACK = { label: "Servicio", description: "", icon: LuPlugZap };

/** Convierte el JSON de `apartment.services` en una lista lista para pintar. */
export const getServices = (raw?: string | null): Service[] => {
  if (!raw) return [];

  try {
    return Object.entries(
      JSON.parse(raw) as Record<
        string,
        Omit<Service, "key" | "label" | "description" | "icon">
      >,
    )
      .filter(([, service]) => service.status)
      .map(([key, service]) => ({
        key,
        ...(PRESETS[key] ?? FALLBACK),
        ...service,
      }));
  } catch {
    return [];
  }
};
