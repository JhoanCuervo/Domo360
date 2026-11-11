import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";

export type ButtonProps = {
  variant?: ButtonVariant;
  /** Muestra el spinner y bloquea el botón mientras se envía. */
  loading?: boolean;
  /** Ocupa todo el ancho disponible del contenedor. */
  fullWidth?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;
