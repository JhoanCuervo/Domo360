import type { ButtonProps, ButtonVariant } from "./Button.types";

/** Base de Bootstrap + modificador de color de la marca. */
const BASE_CLASS = "btn btn-domo";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "btn-domo-primary",
  secondary: "btn-domo-outline",
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
    className={`${BASE_CLASS} ${VARIANTS[variant]}${fullWidth ? " w-100" : ""}${
      className ? ` ${className}` : ""
    }`}
    {...buttonProps}
  >
    {loading && (
      <span className="spinner-border spinner-border-sm" aria-hidden />
    )}
    {children}
  </button>
);

export default Button;
