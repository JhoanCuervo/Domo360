import { useEffect, useState } from "react";
import api from "../../../service/api";
import type { AllApartments } from "../../../types/apartment";
import "./Home.css";

/** Pantalla de inicio del área de administración. */
const Home = () => {
  const [dataApartaments, setDataApartaments] = useState<AllApartments>([]);

  useEffect(() => {
    const apiAllApartaments = async () => {
      const apartaments = await api<AllApartments>("Home");
      console.log("🚀 ~ apiAllApartaments ~ user:", apartaments);
      setDataApartaments(apartaments);
    };
    apiAllApartaments();
  }, []);

  return (
    <div className="row g-4">
      {dataApartaments &&
        dataApartaments.map((apartament) => (
          <div key={apartament.id} className="col-12 col-md-6 col-lg-4">
            <article className="card property-card h-100">
              <img
                src={`https://lh3.googleusercontent.com/d/${apartament.id}`}
                alt={`${apartament.torre}-${apartament.number}`}
              />

              <div className="card-body property-card-body">
                <h2 className="property-card-title">
                  Apartamento {apartament.number}
                </h2>
                <p className="property-card-address">{apartament.address}</p>
              </div>
            </article>
          </div>
        ))}
    </div>
  );
};

export default Home;
