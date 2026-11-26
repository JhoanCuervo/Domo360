import { useId } from "react";

import type { Service } from "../../../../data/services";

type Props = {
  services: Service[];
  value: string | null;
  onChange: (key: string) => void;
};

/** Selector del servicio al que corresponde el recibo de pago. */
const ServicePicker = ({ services, value, onChange }: Props) => {
  const autoId = useId();
  const labelId = `service-picker-label-${autoId}`;
  const groupName = `service-picker-${autoId}`;

  return (
    <div>
      <span id={labelId} className="form-label field-label fw-semibold mb-0">
        Servicio
      </span>

      <div
        className="service-picker-options mt-2"
        role="radiogroup"
        aria-labelledby={labelId}
      >
        {services.map(({ key, label, icon: Icon }) => (
          <label
            key={key}
            className={`service-option${value === key ? " is-selected" : ""}`}
          >
            <input
              type="radio"
              name={groupName}
              value={key}
              checked={value === key}
              onChange={() => onChange(key)}
              className="visually-hidden"
            />
            <span className="service-option-icon" aria-hidden>
              <Icon size={18} strokeWidth={2} />
            </span>
            <span className="service-option-label">{label}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

export default ServicePicker;
