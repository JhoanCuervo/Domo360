import { LuLoaderCircle } from "react-icons/lu";

import type { ButtonProps, ButtonVariant } from "./Button.types";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn-brand",
  secondary: "btn-brand-outline",
};

/** Botón reutilizable con variantes y estado de carga. */
const Button = ({
  variant = "primary",
  loading = false,
  fullWidth = false,
  disabled,
  children,
  className = "",
  type = "button",
  ...buttonProps
}: ButtonProps) => (
  <button
    type={type}
    disabled={disabled || loading}
    aria-busy={loading}
    className={`${VARIANTS[variant]}${fullWidth ? " w-100" : ""}${
      className ? ` ${className}` : ""
    }`}
    {...buttonProps}
  >
    {loading && (
      <LuLoaderCircle size={16} className="btn-spinner" aria-hidden />
    )}
    {children}
  </button>
);

export default Button;
