import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import Domo360Logo from "../../components/Brand/Domo360Logo";
import Button from "../../components/Button/Button";
import Field from "../../components/Field/Field";
import api from "../../service/api";
import { useSessionStore } from "../../store/sessionStore";
import type { userResponse } from "../../types/session";
import "./Login.css";

const MIN_DIGITS = 6;
const MAX_DIGITS = 10;

/** Agrupa los dígitos de la cédula en miles: 1234567 -> 1.234.567 */
const formatCedula = (digits: string) =>
  digits.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const CedulaIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="20"
    height="20"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
    <path d="M2.5 10h19" />
  </svg>
);

const Login = () => {
  const navigate = useNavigate();
  const setUser = useSessionStore((state) => state.setUser);
  const [digits, setDigits] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [session, setSession] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setDigits(value.replace(/\D/g, "").slice(0, MAX_DIGITS));
    setError("");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!digits) {
      setError("Ingresa tu número de cédula.");
      return;
    }

    if (digits.length < MIN_DIGITS) {
      setError(
        `La cédula debe tener entre ${MIN_DIGITS} y ${MAX_DIGITS} dígitos.`,
      );
      return;
    }

    setSubmitting(true);

    const user = await api<userResponse>("Auth", { idAuth: digits });
    if (!user) {
      setError("Usuario no encontrado.");
      setSubmitting(false);
      return;
    }

    const userSave = { id: parseInt(digits), ...user };
    setUser(userSave);

    setSubmitting(false);

    if (user.rol === "Admin") {
      navigate("/admin");
    }
    if (user.rol === "User") {
      navigate("/user");
    }
  };

  return (
    <main className="login-screen">
      <div className="login-glow" aria-hidden />
      <div className="login-blob" aria-hidden />

      <section className="login-shell">
        <div className="login-logo">
          <Domo360Logo size={44} />
        </div>

        <div className="card login-card">
          {session ? (
            <div className="login-success">
              <div className="login-success-icon">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              </div>
              <h1 className="login-success-title">Ingreso exitoso</h1>
              <p className="login-success-text">
                Cédula <span className="login-success-cedula">{session}</span>
              </p>
              <Button
                variant="secondary"
                fullWidth
                className="mt-4"
                onClick={() => {
                  setSession(null);
                  setDigits("");
                }}
              >
                Salir
              </Button>
            </div>
          ) : (
            <>
              <header className="login-header">
                <h1 className="login-title">Bienvenido</h1>
                <p className="login-subtitle">
                  Ingresa con tu número de cédula
                </p>
              </header>

              <form onSubmit={handleSubmit} autoComplete="off" noValidate>
                <Field
                  label="Cédula"
                  name="cedula"
                  type="text"
                  inputMode="numeric"
                  autoFocus
                  placeholder="1.234.567.890"
                  icon={<CedulaIcon />}
                  counter={`${digits.length}/${MAX_DIGITS}`}
                  error={error}
                  value={formatCedula(digits)}
                  onChange={(event) => handleChange(event.target.value)}
                />

                <Button
                  type="submit"
                  loading={submitting}
                  fullWidth
                  className="login-submit"
                >
                  {submitting ? "Verificando…" : "Ingresar"}
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="login-footer">
          © {new Date().getFullYear()} Domo360. Todos los derechos reservados.
        </p>
      </section>
    </main>
  );
};

export default Login;
