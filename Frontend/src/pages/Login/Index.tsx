import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

import { LuCheck, LuUserRound } from "react-icons/lu";

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

const Login = () => {
  const navigate = useNavigate();
  const setUser = useSessionStore((state) => state.setUser);
  const setApartment = useSessionStore((state) => state.setApartment);
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
    const { apartment, ...dataUser } = user;
    const userSave = { id: parseInt(digits), ...dataUser };
    setUser(userSave);
    setApartment(apartment ? apartment : null);

    setSubmitting(false);

    if (user.rol === "Admin") {
      navigate("/admin");
    }
    if (user.rol === "User") {
      navigate("/user");
    }
  };

  return (
    <main className="login-screen position-relative d-grid min-vh-100 overflow-hidden">
      <div
        className="login-glow position-absolute top-0 start-0 w-100 h-100 pe-none"
        aria-hidden
      />
      <div
        className="login-blob position-absolute start-50 translate-middle-x rounded-circle pe-none"
        aria-hidden
      />

      <section className="login-shell position-relative w-100">
        <div className="login-logo d-flex justify-content-center">
          <Domo360Logo size={44} />
        </div>

        <div className="card login-card">
          {session ? (
            <div className="text-center">
              <div className="login-success-icon d-grid rounded-circle mx-auto mb-3">
                <LuCheck size={24} strokeWidth={2.5} aria-hidden />
              </div>
              <h1 className="login-success-title fs-5 fw-bold mb-0">
                Ingreso exitoso
              </h1>
              <p className="login-success-text mt-2 mb-0">
                Cédula{" "}
                <span className="login-success-cedula fw-semibold">
                  {session}
                </span>
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
              <header className="mb-4 text-center">
                <h1 className="login-title fs-4 fw-bold mb-0">Bienvenido</h1>
                <p className="login-subtitle mt-2 mb-0">
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
                  icon={<LuUserRound size={20} />}
                  counter={`${digits.length}/${MAX_DIGITS}`}
                  error={error}
                  value={formatCedula(digits)}
                  onChange={(event) => handleChange(event.target.value)}
                />

                <Button
                  type="submit"
                  loading={submitting}
                  fullWidth
                  className="mt-4"
                >
                  {submitting ? "Verificando…" : "Ingresar"}
                </Button>
              </form>
            </>
          )}
        </div>

        <p className="login-footer mt-4 mb-0 text-center">
          © {new Date().getFullYear()} Domo360. Todos los derechos reservados.
        </p>
      </section>
    </main>
  );
};

export default Login;
