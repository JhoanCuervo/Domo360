import { useId } from "react";

import type { FieldProps } from "./Field.types";

/** Campo de texto reutilizable con etiqueta, icono opcional y mensaje de error. */
const Field = ({
  label,
  error,
  counter,
  icon,
  id,
  ...inputProps
}: FieldProps) => {
  const autoId = useId();
  const fieldId = id ?? `field-${autoId}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <div className="field-head d-flex align-items-baseline justify-content-between gap-3">
        <label
          htmlFor={fieldId}
          className="form-label field-label fw-semibold mb-0"
        >
          {label}
        </label>
        {counter && <span className="field-counter">{counter}</span>}
      </div>

      <div className="field-control position-relative">
        {icon && (
          <span
            className="field-icon position-absolute top-0 start-0 h-100 d-grid pe-none"
            aria-hidden
          >
            {icon}
          </span>
        )}
        <input
          id={fieldId}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={`form-control field-input${icon ? " field-input-icon" : ""}${
            error ? " field-input-error" : ""
          }`}
          {...inputProps}
        />
      </div>

      {error && (
        <p
          id={errorId}
          role="alert"
          className="field-error text-danger fw-medium mt-2 mb-0"
        >
          {error}
        </p>
      )}
    </div>
  );
};

export default Field;
