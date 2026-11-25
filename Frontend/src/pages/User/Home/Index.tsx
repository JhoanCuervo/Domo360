import "./Home.css";
import { QUICK_ACTIONS } from "./Home.data";
import QuickActions from "./QuickActions";
import UserHero from "./UserHero";

/** Pantalla de inicio para el usuario arrendatario (móvil y web responsivo). */
function Index() {
  return (
    <main className="user-home-page d-flex flex-column min-vh-100">
      <UserHero />
      <QuickActions actions={QUICK_ACTIONS} />
    </main>
  );
}

export default Index;
