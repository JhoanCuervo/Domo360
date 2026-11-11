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
      <svg viewBox="0 0 24 24" className="btn-spinner" fill="none" aria-hidden>
        <circle
          cx="12"
          cy="12"
          r="9"
          stroke="currentColor"
          strokeWidth="3"
          strokeOpacity="0.3"
        />
        <path
          d="M21 12a9 9 0 0 0-9-9"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>
    )}
    {children}
  </button>
);

export default Button;
