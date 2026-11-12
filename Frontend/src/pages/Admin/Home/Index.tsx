import { useEffect, useState } from "react";

import api from "../../../service/api";
import type { AllApartments } from "../../../types/apartment";
import HomeFeedback from "./HomeFeedback";
import PropertyCard from "./PropertyCard";
import PropertySkeleton from "./PropertySkeleton";
import "./Home.css";

/** Mensaje amigable mostrado cuando falla la carga; el detalle técnico va a consola. */
const ERROR_MESSAGE =
  "Revisa tu conexión e inténtalo de nuevo; si el problema persiste, vuelve a intentarlo más tarde.";

/** Carga los inmuebles y expone el estado de la petición con opción de reintento. */
const useApartments = () => {
  const [apartments, setApartments] = useState<AllApartments>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let active = true;

    const loadApartments = async () => {
      setLoading(true);
      setError("");

      try {
        const result = await api<AllApartments | false>("Home");
        if (!active) return;

        setApartments(Array.isArray(result) ? result : []);
      } catch (requestError) {
        if (!active) return;

        setApartments([]);
        console.error("Error al cargar los inmuebles:", requestError);
        setError(ERROR_MESSAGE);
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadApartments();

    return () => {
      active = false;
    };
  }, [reloadKey]);

  const reload = () => setReloadKey((value) => value + 1);

  return { apartments, loading, error, reload };
};

/** Pantalla de inicio del área de administración. */
const Home = () => {
  const { apartments, loading, error, reload } = useApartments();

  const total = apartments.length;

  return (
    <section className="home-section" aria-busy={loading}>
      {loading ? (
        <div className="row g-4">
          {Array.from({ length: 3 }, (_, index) => (
            <PropertySkeleton key={index} />
          ))}
        </div>
      ) : error ? (
        <HomeFeedback variant="error" message={error} onRetry={reload} />
      ) : total === 0 ? (
        <HomeFeedback variant="empty" />
      ) : (
        <div className="row g-4">
          {apartments.map((apartment) => (
            <PropertyCard key={apartment.id} apartment={apartment} />
          ))}
        </div>
      )}
    </section>
  );
};

export default Home;
