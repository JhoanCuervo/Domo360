import { useEffect, useState } from "react";
import { LuArrowLeft, LuCircleX, LuRefreshCw, LuSearchX } from "react-icons/lu";
import { Link, useParams } from "react-router";

import Button from "../../../components/Button/Button";
import api from "../../../service/api";
import type { ApartmentDetail } from "../../../types/apartment";
import "./Apartment.css";
import ApartmentCard from "./ApartmentCard";
import ApartmentTabs from "./tabs/ApartmentTabs";

/** Mensaje amigable mostrado cuando falla la carga; el detalle técnico va a consola. */
const ERROR_MESSAGE =
  "Revisa tu conexión e inténtalo de nuevo; si el problema persiste, vuelve a intentarlo más tarde.";

/** El servidor responde el detalle o un objeto con `error` cuando falta algún registro. */
type ApartmentResponse = ApartmentDetail | { error: string } | false | undefined;

/** Pantalla de detalle del apartamento dentro del área de administración. */
const Contracts = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState<ApartmentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const loadApartment = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await api<ApartmentResponse>("Apartment", { id });
        if (!active) return;

        // Log temporal para diagnosticar qué devuelve el servidor.
        console.log("Respuesta de Apartment:", result);

        if (!result) {
          setDetail(null);
        } else if ("error" in result) {
          setDetail(null);
          setError(result.error);
        } else {
          setDetail(result);
        }
      } catch (requestError) {
        if (!active) return;

        setDetail(null);
        console.error("Error al cargar el inmueble:", requestError);
        setError(ERROR_MESSAGE);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadApartment();

    return () => {
      active = false;
    };
  }, [id, reloadKey]);

  const reload = () => setReloadKey((value) => value + 1);

  return (
    <section>
      <header className="mb-4">
        <Link
          to="/admin"
          className="apartment-back d-inline-flex align-items-center gap-3 fw-semibold text-decoration-none"
        >
          <span className="apartment-back-icon d-grid rounded-circle" aria-hidden>
            <LuArrowLeft size={18} />
          </span>
          Volver a mis apartamentos
        </Link>
      </header>

      {loading ? (
        <div
          className="apartment-card-skeleton d-grid overflow-hidden border rounded-4 bg-white shadow-sm pe-none"
          aria-hidden="true"
        >
          <div className="skeleton-block apartment-skeleton-media" />
          <div className="apartment-skeleton-body d-flex flex-column justify-content-center gap-3">
            <span className="skeleton-line rounded-3 apartment-skeleton-line-title" />
            <span className="skeleton-line rounded-3 apartment-skeleton-line-text" />
            <span className="skeleton-line rounded-3 apartment-skeleton-line-short" />
          </div>
        </div>
      ) : error ? (
        <div className="feedback-box d-grid text-center is-error" role="alert">
          <span className="feedback-icon d-grid rounded-4" aria-hidden>
            <LuCircleX size={28} strokeWidth={1.75} />
          </span>
          <h2 className="feedback-title m-0">
            No pudimos cargar el inmueble
          </h2>
          <p className="feedback-text m-0">{error}</p>
          <Button variant="secondary" onClick={reload}>
            <LuRefreshCw size={16} strokeWidth={2} aria-hidden />
            Reintentar
          </Button>
        </div>
      ) : detail ? (
        <>
          <ApartmentCard detail={detail} />
          <ApartmentTabs detail={detail} />
        </>
      ) : (
        <div className="feedback-box d-grid text-center">
          <span className="feedback-icon d-grid rounded-4" aria-hidden>
            <LuSearchX size={28} strokeWidth={1.75} />
          </span>
          <h2 className="feedback-title m-0">
            Apartamento no encontrado
          </h2>
          <p className="feedback-text m-0">
            El inmueble que buscas no existe o ya no está disponible.
          </p>
        </div>
      )}
    </section>
  );
};

export default Contracts;
