import { LuHouse } from "react-icons/lu";

import { useSessionStore } from "../../../store/sessionStore";
import { getHeroImageUrl } from "./Home.data";

/** Encabezado visual del inicio con imagen del inmueble, marca y saludo. */
const UserHero = () => {
  const { apartment, user } = useSessionStore();
  if (!user || !apartment) {
    return null;
  }
  return (
    <section className="user-home-hero flex-grow-1 position-relative d-flex flex-column justify-content-between overflow-hidden">
      <img
        src={getHeroImageUrl(apartment.fileTower)}
        alt={apartment.tower}
        className="user-home-hero-img position-absolute top-0 start-0 w-100 h-100 object-fit-cover"
      />
      <div
        className="user-home-hero-overlay position-absolute top-0 start-0 w-100 h-100"
        aria-hidden
      />

      <div className="container-lg position-relative pt-3 pt-md-4 px-3 px-md-4">
        <div className="text-center text-white pt-1 pb-3">
          <LuHouse size={44} strokeWidth={2} className="mb-1" aria-hidden />
          <h1 className="user-home-brand-title fw-bold mb-0">Domo360</h1>
        </div>
      </div>

      <div className="container-lg position-relative px-3 px-md-4 pb-5">
        <div className="text-white">
          <div className="user-home-greeting fw-bold lh-sm mb-1">
            Hola, {user.alias} 👋
          </div>
          <span className="user-home-apt-pill d-inline-flex align-items-center gap-2 rounded-pill px-3 py-1 fw-semibold text-white">
            <LuHouse size={14} aria-hidden />
            {apartment.type} {apartment.number}
          </span>
        </div>
      </div>
    </section>
  );
};

export default UserHero;
