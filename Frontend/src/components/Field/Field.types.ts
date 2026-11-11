import type { InputHTMLAttributes, ReactNode } from "react";

export type FieldProps = {
  /** Etiqueta visible del campo. */
  label: string;
  /** Mensaje de error; si existe, el campo se marca como inválido. */
  error?: string;
  /** Texto auxiliar a la derecha de la etiqueta (ej. "4/10"). */
  counter?: string;
  /** Icono decorativo que se muestra dentro del campo. */
  icon?: ReactNode;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "aria-invalid">;
