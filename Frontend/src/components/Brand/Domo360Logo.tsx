import type { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & { size?: number };

/** Marca gráfica de Domo360: cúpula sobre base con punto de origen. */
const Domo360Mark = ({ size = 48, ...props }: Props) => (
  <svg
    viewBox="0 0 48 48"
    width={size}
    height={size}
    role="img"
    aria-label="Domo360"
    {...props}
  >
    <defs>
      <linearGradient id="domo360-gradient" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#4f46e5" />
        <stop offset="100%" stopColor="#8b5cf6" />
      </linearGradient>
    </defs>
    <rect width="48" height="48" rx="14" fill="url(#domo360-gradient)" />
    <path
      d="M11 33a13 13 0 0 1 26 0"
      fill="none"
      stroke="#ffffff"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <path
      d="M17 33h14"
      stroke="#ffffff"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <circle cx="24" cy="18.5" r="2.75" fill="#ffffff" />
  </svg>
);

/** Logotipo completo (símbolo + wordmark). */
const Domo360Logo = ({ size = 48 }: { size?: number }) => (
  <span className="brand">
    <Domo360Mark size={size} />
    <span className="brand-wordmark" style={{ fontSize: size * 0.52 }}>
      domo<span className="brand-wordmark-accent">360</span>
    </span>
  </span>
);

export { Domo360Logo, Domo360Mark };
export default Domo360Logo;
